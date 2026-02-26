import { NextRequest, NextResponse } from "next/server";
import { addLead } from "@/lib/store";
import { sendAuditEmail } from "@/lib/auditProposalEmails";

type Check = {
  name: string;
  message: string;
  passed: boolean;
  points: number;
};

type AuditResult = {
  score: number;
  businessName: string;
  website: string;
  checks: Check[];
  issues: string[];
};

async function analyzeWebsite(url: string): Promise<{ checks: Check[]; issues: string[] }> {
  const checks: Check[] = [];
  const issues: string[] = [];

  try {
    // Normalize URL
    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith("http://") && !normalizedUrl.startsWith("https://")) {
      normalizedUrl = "https://" + normalizedUrl;
    }

    const urlObj = new URL(normalizedUrl);
    
    // 1. HTTPS Check
    const hasHttps = urlObj.protocol === "https:";
    checks.push({
      name: "HTTPS Security",
      message: hasHttps ? "Your site uses secure HTTPS" : "Your site doesn't use HTTPS — this hurts trust and SEO",
      passed: hasHttps,
      points: hasHttps ? 10 : 0,
    });
    if (!hasHttps) issues.push("No HTTPS — visitors see 'Not Secure' warning");

    // 2. Fetch the page
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    let response: Response;
    let html = "";
    
    try {
      response = await fetch(normalizedUrl, {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; PlainsightGrader/1.0)",
        },
      });
      clearTimeout(timeout);
      html = await response.text();
    } catch (fetchError) {
      clearTimeout(timeout);
      checks.push({
        name: "Website Accessible",
        message: "Could not access your website — it may be down or blocked",
        passed: false,
        points: 0,
      });
      issues.push("Website couldn't be reached");
      return { checks, issues };
    }

    // 3. Website loads successfully
    const loadsSuccessfully = response.ok;
    checks.push({
      name: "Website Loads",
      message: loadsSuccessfully ? "Your website loads successfully" : "Your website returned an error",
      passed: loadsSuccessfully,
      points: loadsSuccessfully ? 15 : 0,
    });
    if (!loadsSuccessfully) issues.push(`Website returned HTTP ${response.status}`);

    if (!loadsSuccessfully) return { checks, issues };

    const htmlLower = html.toLowerCase();

    // 4. Mobile-responsive check (basic)
    const hasViewport = htmlLower.includes("viewport");
    checks.push({
      name: "Mobile Optimized",
      message: hasViewport ? "Your site has mobile viewport settings" : "Missing mobile viewport meta tag — may not display well on phones",
      passed: hasViewport,
      points: hasViewport ? 15 : 0,
    });
    if (!hasViewport) issues.push("Not optimized for mobile devices");

    // 5. Has clear CTA (look for common CTA patterns)
    const ctaPatterns = [
      "contact us",
      "get started",
      "book now",
      "call now",
      "schedule",
      "free consultation",
      "request quote",
      "hire us",
      "learn more",
      "sign up",
      "subscribe",
      "buy now",
      "order now",
      "whatsapp",
      "call:",
      "tel:",
    ];
    const hasCta = ctaPatterns.some((p) => htmlLower.includes(p));
    checks.push({
      name: "Clear Call-to-Action",
      message: hasCta ? "Your site has action buttons/links" : "No clear call-to-action found — visitors may not know what to do next",
      passed: hasCta,
      points: hasCta ? 15 : 0,
    });
    if (!hasCta) issues.push("No clear call-to-action for visitors");

    // 6. Contact information
    const hasEmail = htmlLower.includes("@") || htmlLower.includes("mailto:");
    const hasPhone = htmlLower.includes("tel:") || /\+?\d{3}[\s\-]?\d{3}[\s\-]?\d{3,6}/.test(html);
    const hasContact = hasEmail || hasPhone;
    checks.push({
      name: "Contact Information",
      message: hasContact ? "Your site displays contact info" : "No visible contact information — visitors can't reach you",
      passed: hasContact,
      points: hasContact ? 10 : 0,
    });
    if (!hasContact) issues.push("No visible contact information");

    // 7. Page title
    const hasTitle = /<title[^>]*>[^<]+<\/title>/i.test(html);
    checks.push({
      name: "Page Title",
      message: hasTitle ? "Your site has a page title" : "Missing page title — bad for SEO and browser tabs",
      passed: hasTitle,
      points: hasTitle ? 5 : 0,
    });
    if (!hasTitle) issues.push("Missing page title (bad for SEO)");

    // 8. Meta description
    const hasMetaDesc = /<meta[^>]*name=["']description["']/i.test(html);
    checks.push({
      name: "Meta Description",
      message: hasMetaDesc ? "Your site has a meta description" : "Missing meta description — missed opportunity in search results",
      passed: hasMetaDesc,
      points: hasMetaDesc ? 5 : 0,
    });
    if (!hasMetaDesc) issues.push("Missing meta description (reduces search click-through)");

    // 9. Performance heuristic (page size)
    const pageSizeKB = Math.round(html.length / 1024);
    const isLightweight = pageSizeKB < 500;
    checks.push({
      name: "Page Size",
      message: isLightweight ? `Page size is reasonable (${pageSizeKB}KB)` : `Page is large (${pageSizeKB}KB) — may load slowly`,
      passed: isLightweight,
      points: isLightweight ? 10 : 5,
    });
    if (!isLightweight) issues.push(`Large page size (${pageSizeKB}KB) may slow loading`);

    // 10. Has favicon
    const hasFavicon = htmlLower.includes("favicon") || htmlLower.includes("icon");
    checks.push({
      name: "Favicon",
      message: hasFavicon ? "Your site has a favicon" : "Missing favicon — less professional in browser tabs",
      passed: hasFavicon,
      points: hasFavicon ? 5 : 0,
    });

  } catch (error) {
    console.error("Website analysis error:", error);
    issues.push("Could not fully analyze website");
  }

  return { checks, issues };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = (formData.get("name") as string)?.trim() || "";
    const email = (formData.get("email") as string)?.trim().toLowerCase() || "";
    const businessName = (formData.get("businessName") as string)?.trim() || "";
    const website = (formData.get("website") as string)?.trim() || "";
    const phone = (formData.get("phone") as string)?.trim() || "";

    // Validation
    if (!name || !email || !businessName) {
      return NextResponse.json({ error: "Name, email, and business name are required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Detect niche from business name (basic)
    const nameLower = businessName.toLowerCase();
    let niche: "dental" | "law" | "real-estate" | "other" = "other";
    if (nameLower.includes("advocate") || nameLower.includes("law") || nameLower.includes("legal") || nameLower.includes("attorney")) {
      niche = "law";
    } else if (nameLower.includes("dental") || nameLower.includes("clinic") || nameLower.includes("hospital") || nameLower.includes("medical") || nameLower.includes("health")) {
      niche = "dental";
    } else if (nameLower.includes("realty") || nameLower.includes("properties") || nameLower.includes("real estate")) {
      niche = "real-estate";
    }

    // Run analysis
    let checks: Check[] = [];
    let issues: string[] = [];

    if (website) {
      const analysis = await analyzeWebsite(website);
      checks = analysis.checks;
      issues = analysis.issues;
    } else {
      // No website - these are quick wins
      checks = [
        { name: "Website Exists", message: "No website found — you're invisible to online searches", passed: false, points: 0 },
        { name: "Online Visibility", message: "Relying on directories/word-of-mouth only", passed: false, points: 0 },
      ];
      issues = [
        "No website — you're missing 100% of online searches",
        "No owned digital presence — directories control your visibility",
        "Competitors with websites are capturing your potential customers",
      ];
    }

    // Calculate score
    const totalPoints = checks.reduce((sum, c) => sum + c.points, 0);
    const maxPoints = 100; // Based on our point system
    const score = Math.min(100, Math.round((totalPoints / maxPoints) * 100));

    // Save as lead
    const lead = await addLead({
      name,
      email,
      businessName,
      website: website || undefined,
      phone: phone || undefined,
      niche,
      budget: "50k-100k", // Default assumption
      painPoint: `Website grader lead. Score: ${score}/100. Issues: ${issues.slice(0, 3).join("; ")}`,
      source: "website-grader",
    });

    // Send audit email
    if (issues.length > 0) {
      await sendAuditEmail({
        to: email,
        name,
        businessName,
        auditPoints: issues.slice(0, 5),
        nextStep: "These issues are costing you customers every day. Let's fix them.",
        calLink: "https://cal.com/plainsightdigital/30min",
      });
    }

    const result: AuditResult = {
      score,
      businessName,
      website,
      checks,
      issues,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Audit API error:", error);
    return NextResponse.json({ error: "Failed to analyze website" }, { status: 500 });
  }
}
