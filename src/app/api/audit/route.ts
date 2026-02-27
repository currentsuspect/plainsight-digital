import { NextRequest, NextResponse } from "next/server";
import { addLead } from "@/lib/store";
import { sendAuditEmail } from "@/lib/auditProposalEmails";

type Check = {
  name: string;
  message: string;
  passed: boolean;
  points: number;
  severity?: "critical" | "warning" | "good";
};

type AuditResult = {
  score: number;
  businessName: string;
  website: string;
  checks: Check[];
  issues: string[];
  recommendations: string[];
  categoryScores: {
    security: number;
    performance: number;
    seo: number;
    conversion: number;
    accessibility: number;
  };
};

async function analyzeWebsite(url: string): Promise<{ 
  checks: Check[]; 
  issues: string[]; 
  recommendations: string[];
  categoryScores: AuditResult["categoryScores"];
}> {
  const checks: Check[] = [];
  const issues: string[] = [];
  const recommendations: string[] = [];
  
  const categoryScores = {
    security: 0,
    performance: 0,
    seo: 0,
    conversion: 0,
    accessibility: 0,
  };

  try {
    // Normalize URL
    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith("http://") && !normalizedUrl.startsWith("https://")) {
      normalizedUrl = "https://" + normalizedUrl;
    }

    const urlObj = new URL(normalizedUrl);
    const domain = urlObj.hostname;
    
    // 1. HTTPS Security
    const hasHttps = urlObj.protocol === "https:";
    checks.push({
      name: "HTTPS Security",
      message: hasHttps ? "Site uses secure HTTPS encryption" : "No HTTPS — browsers show 'Not Secure' warning",
      passed: hasHttps,
      points: hasHttps ? 10 : 0,
      severity: hasHttps ? "good" : "critical",
    });
    if (!hasHttps) {
      issues.push("No HTTPS security — visitors see 'Not Secure' warning and leave");
      recommendations.push("Install SSL certificate immediately (free with Let's Encrypt)");
    } else {
      categoryScores.security += 10;
    }

    // Fetch the page
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    let response: Response;
    let html = "";
    let headers: Headers;
    
    try {
      response = await fetch(normalizedUrl, {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (compatible; PlainsightGrader/2.0)",
        },
      });
      clearTimeout(timeout);
      headers = response.headers;
      html = await response.text();
    } catch (fetchError) {
      clearTimeout(timeout);
      checks.push({
        name: "Website Accessible",
        message: "Website is down or blocking access",
        passed: false,
        points: 0,
        severity: "critical",
      });
      issues.push("Website is unreachable — you're losing 100% of online traffic");
      recommendations.push("Check hosting status and DNS configuration");
      return { checks, issues, recommendations, categoryScores };
    }

    const htmlLower = html.toLowerCase();
    const loadTime = Date.now(); // Simplified - we'd measure actual load time

    // 2. Website Loads Successfully
    const loadsSuccessfully = response.ok;
    checks.push({
      name: "Server Response",
      message: loadsSuccessfully ? "Server responds correctly (HTTP 200)" : `Server error (HTTP ${response.status})`,
      passed: loadsSuccessfully,
      points: loadsSuccessfully ? 10 : 0,
      severity: loadsSuccessfully ? "good" : "critical",
    });
    if (!loadsSuccessfully) {
      issues.push(`Server returning HTTP ${response.status} — visitors can't access your site`);
      return { checks, issues, recommendations, categoryScores };
    }
    categoryScores.performance += 5;

    // 3. Mobile Responsiveness
    const hasViewport = htmlLower.includes("viewport") && htmlLower.includes("width=device-width");
    checks.push({
      name: "Mobile Responsive",
      message: hasViewport ? "Properly configured for mobile devices" : "Not optimized for mobile — 70% of traffic is mobile",
      passed: hasViewport,
      points: hasViewport ? 15 : 0,
      severity: hasViewport ? "good" : "critical",
    });
    if (!hasViewport) {
      issues.push("Not mobile-responsive — 70%+ of Kenyan traffic is mobile");
      recommendations.push("Add viewport meta tag and implement responsive design");
    } else {
      categoryScores.accessibility += 15;
    }

    // 4. Page Speed (size-based heuristic)
    const pageSizeKB = Math.round(html.length / 1024);
    const isLightweight = pageSizeKB < 300;
    const isMedium = pageSizeKB < 800;
    checks.push({
      name: "Page Size",
      message: isLightweight ? `Fast: ${pageSizeKB}KB page size` : isMedium ? `Moderate: ${pageSizeKB}KB` : `Slow: ${pageSizeKB}KB — will load slowly on 3G`,
      passed: isMedium,
      points: isLightweight ? 10 : isMedium ? 7 : 3,
      severity: isLightweight ? "good" : isMedium ? "warning" : "critical",
    });
    if (!isMedium) {
      issues.push(`Heavy page (${pageSizeKB}KB) — slow loading kills conversions`);
      recommendations.push("Optimize images, minify CSS/JS, enable compression");
    }
    categoryScores.performance += isLightweight ? 10 : isMedium ? 5 : 2;

    // 5. Title Tag
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const hasTitle = !!titleMatch;
    const titleText = titleMatch?.[1]?.trim() || "";
    const titleLength = titleText.length;
    const hasGoodTitle = hasTitle && titleLength >= 20 && titleLength <= 70;
    checks.push({
      name: "Page Title",
      message: hasGoodTitle ? `Good title (${titleLength} chars)` : hasTitle ? `Title too short/long (${titleLength} chars)` : "Missing title — search engines won't rank you",
      passed: hasGoodTitle,
      points: hasGoodTitle ? 8 : hasTitle ? 4 : 0,
      severity: hasGoodTitle ? "good" : hasTitle ? "warning" : "critical",
    });
    if (!hasTitle) {
      issues.push("No page title — invisible to Google searches");
      recommendations.push("Add descriptive title tag (50-60 characters)");
    } else if (!hasGoodTitle) {
      recommendations.push("Optimize title length to 50-60 characters");
    }
    categoryScores.seo += hasGoodTitle ? 8 : hasTitle ? 4 : 0;

    // 6. Meta Description
    const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
                          html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i);
    const hasMetaDesc = !!metaDescMatch;
    const descLength = metaDescMatch?.[1]?.length || 0;
    const hasGoodDesc = hasMetaDesc && descLength >= 120 && descLength <= 160;
    checks.push({
      name: "Meta Description",
      message: hasGoodDesc ? `Good description (${descLength} chars)` : hasMetaDesc ? `Description ${descLength < 120 ? 'too short' : 'too long'}` : "Missing — search results look generic",
      passed: hasGoodDesc,
      points: hasGoodDesc ? 7 : hasMetaDesc ? 3 : 0,
      severity: hasGoodDesc ? "good" : hasMetaDesc ? "warning" : "warning",
    });
    if (!hasMetaDesc) {
      issues.push("No meta description — lower click-through from Google");
      recommendations.push("Write compelling meta description (150-160 characters)");
    }
    categoryScores.seo += hasGoodDesc ? 7 : hasMetaDesc ? 3 : 0;

    // 7. Heading Structure (H1)
    const h1Matches = html.match(/<h1[^>]*>/gi);
    const h1Count = h1Matches?.length || 0;
    const hasH1 = h1Count === 1;
    checks.push({
      name: "Main Heading (H1)",
      message: hasH1 ? "Single clear H1 heading" : h1Count === 0 ? "No H1 — search engines confused" : `Multiple H1s (${h1Count}) — confuses SEO`,
      passed: hasH1,
      points: hasH1 ? 7 : 0,
      severity: hasH1 ? "good" : "warning",
    });
    if (!hasH1) {
      issues.push(h1Count === 0 ? "No H1 heading — Google doesn't know your main topic" : "Multiple H1s — dilutes SEO value");
      recommendations.push("Use exactly one H1 tag per page with your main keyword");
    }
    categoryScores.seo += hasH1 ? 7 : 0;

    // 8. Open Graph Tags (Social sharing)
    const hasOgTitle = htmlLower.includes('property="og:title"') || htmlLower.includes("property='og:title'");
    const hasOgDesc = htmlLower.includes('property="og:description"') || htmlLower.includes("property='og:description'");
    const hasOgImage = htmlLower.includes('property="og:image"') || htmlLower.includes("property='og:image'");
    const ogScore = [hasOgTitle, hasOgDesc, hasOgImage].filter(Boolean).length;
    checks.push({
      name: "Social Sharing (Open Graph)",
      message: ogScore === 3 ? "Fully optimized for social media" : ogScore > 0 ? `${ogScore}/3 tags present` : "No social preview — links look bad when shared",
      passed: ogScore >= 2,
      points: ogScore === 3 ? 5 : ogScore * 1.5,
      severity: ogScore >= 2 ? "good" : "warning",
    });
    if (ogScore < 2) {
      issues.push("Poor social sharing — links look terrible on WhatsApp/Facebook");
      recommendations.push("Add Open Graph tags for better social previews");
    }
    categoryScores.seo += ogScore >= 2 ? 5 : 2;

    // 9. Clear Call-to-Action
    const ctaPatterns = [
      "contact us", "get started", "book now", "call now", "schedule",
      "free consultation", "request quote", "hire us", "learn more",
      "sign up", "subscribe", "buy now", "order now", "whatsapp", "get in touch"
    ];
    const hasCta = ctaPatterns.some((p) => htmlLower.includes(p));
    const hasButton = htmlLower.includes("<button") || htmlLower.includes('role="button"');
    const hasGoodCta = hasCta || hasButton;
    checks.push({
      name: "Call-to-Action",
      message: hasGoodCta ? "Clear CTAs guide visitors" : "No clear CTA — visitors don't know what to do",
      passed: hasGoodCta,
      points: hasGoodCta ? 12 : 0,
      severity: hasGoodCta ? "good" : "critical",
    });
    if (!hasGoodCta) {
      issues.push("No clear call-to-action — visitors leave without converting");
      recommendations.push("Add prominent 'Contact Us' or 'Book Now' buttons");
    } else {
      categoryScores.conversion += 12;
    }

    // 10. Contact Information
    const hasEmail = htmlLower.includes("@") || htmlLower.includes("mailto:");
    const hasPhone = htmlLower.includes("tel:") || /\+?\d{3}[\s\-]?\d{3}[\s\-]?\d{3,6}/.test(html);
    const hasAddress = htmlLower.includes("address") || htmlLower.includes("nairobi") || htmlLower.includes("kenya");
    const contactScore = [hasEmail, hasPhone, hasAddress].filter(Boolean).length;
    checks.push({
      name: "Contact Information",
      message: contactScore >= 2 ? "Multiple contact methods available" : contactScore === 1 ? "Limited contact info" : "No way to contact you",
      passed: contactScore >= 2,
      points: contactScore >= 2 ? 8 : contactScore * 3,
      severity: contactScore >= 2 ? "good" : contactScore === 1 ? "warning" : "critical",
    });
    if (contactScore < 2) {
      issues.push("Hard to contact — missing phone, email, or address");
      recommendations.push("Display phone number, email, and physical address prominently");
    }
    categoryScores.conversion += contactScore >= 2 ? 8 : contactScore * 3;

    // 11. Favicon
    const hasFavicon = htmlLower.includes("favicon") || htmlLower.includes('rel="icon"') || htmlLower.includes('rel="shortcut icon"');
    checks.push({
      name: "Favicon",
      message: hasFavicon ? "Professional favicon present" : "Missing favicon — looks unprofessional in bookmarks",
      passed: hasFavicon,
      points: hasFavicon ? 4 : 0,
      severity: hasFavicon ? "good" : "warning",
    });
    if (!hasFavicon) {
      recommendations.push("Add favicon for professional appearance");
    }
    categoryScores.seo += hasFavicon ? 4 : 0;

    // 12. Analytics Detection
    const hasAnalytics = htmlLower.includes("googletagmanager") || 
                        htmlLower.includes("google-analytics") || 
                        htmlLower.includes("gtag") ||
                        htmlLower.includes("mixpanel") ||
                        htmlLower.includes("plausible");
    checks.push({
      name: "Analytics Tracking",
      message: hasAnalytics ? "Visitor tracking installed" : "No analytics — flying blind on performance",
      passed: hasAnalytics,
      points: hasAnalytics ? 5 : 0,
      severity: hasAnalytics ? "good" : "warning",
    });
    if (!hasAnalytics) {
      issues.push("No analytics — can't measure what's working");
      recommendations.push("Install Google Analytics 4 to track visitor behavior");
    }
    categoryScores.performance += hasAnalytics ? 5 : 0;

    // 13. Image Optimization Check
    const imgMatches = html.match(/<img[^>]*>/gi) || [];
    const imgCount = imgMatches.length;
    const imgsWithAlt = imgMatches.filter(img => img.toLowerCase().includes("alt=")).length;
    const altRatio = imgCount > 0 ? imgsWithAlt / imgCount : 1;
    checks.push({
      name: "Image Accessibility",
      message: altRatio >= 0.8 ? `${imgsWithAlt}/${imgCount} images have alt text` : `${imgCount - imgsWithAlt} images missing alt text`,
      passed: altRatio >= 0.8,
      points: altRatio >= 0.8 ? 5 : Math.round(altRatio * 5),
      severity: altRatio >= 0.8 ? "good" : "warning",
    });
    if (altRatio < 0.8 && imgCount > 0) {
      recommendations.push("Add alt text to all images for accessibility and SEO");
    }
    categoryScores.accessibility += altRatio >= 0.8 ? 5 : Math.round(altRatio * 5);

    // 14. Schema/Structured Data
    const hasSchema = htmlLower.includes("application/ld+json") || htmlLower.includes('itemtype="http://schema.org');
    checks.push({
      name: "Structured Data",
      message: hasSchema ? "Schema markup present — helps Google understand" : "No structured data — missing rich snippets",
      passed: hasSchema,
      points: hasSchema ? 5 : 0,
      severity: hasSchema ? "good" : "warning",
    });
    if (!hasSchema) {
      recommendations.push("Add JSON-LD schema for LocalBusiness");
    }
    categoryScores.seo += hasSchema ? 5 : 0;

    // 15. SSL Certificate Details (via headers if available)
    const securityHeaders = headers.get("strict-transport-security");
    const hasHsts = !!securityHeaders;
    if (hasHttps && hasHsts) {
      categoryScores.security += 5;
    }

    // Generate category-specific recommendations
    if (categoryScores.seo < 20) {
      recommendations.push("Priority: Fix SEO basics — titles, descriptions, headings");
    }
    if (categoryScores.conversion < 10) {
      recommendations.push("Priority: Add clear CTAs and contact information");
    }
    if (categoryScores.performance < 10) {
      recommendations.push("Priority: Optimize page speed — compress images, minify code");
    }

  } catch (error) {
    console.error("Website analysis error:", error);
    issues.push("Analysis encountered an error — manual review recommended");
  }

  return { checks, issues, recommendations, categoryScores };
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

    // Detect niche
    const nameLower = businessName.toLowerCase();
    let niche: "clinic" | "law" | "school" | "hotel" | "logistics" = "logistics";
    if (nameLower.includes("advocate") || nameLower.includes("law") || nameLower.includes("legal") || nameLower.includes("attorney")) {
      niche = "law";
    } else if (nameLower.includes("dental") || nameLower.includes("clinic") || nameLower.includes("hospital") || nameLower.includes("medical") || nameLower.includes("health")) {
      niche = "clinic";
    } else if (nameLower.includes("school") || nameLower.includes("academy") || nameLower.includes("education") || nameLower.includes("college")) {
      niche = "school";
    } else if (nameLower.includes("hotel") || nameLower.includes("resort") || nameLower.includes("lodging") || nameLower.includes("bnb")) {
      niche = "hotel";
    }

    // Run enhanced analysis
    let checks: Check[] = [];
    let issues: string[] = [];
    let recommendations: string[] = [];
    let categoryScores = { security: 0, performance: 0, seo: 0, conversion: 0, accessibility: 0 };

    if (website) {
      const analysis = await analyzeWebsite(website);
      checks = analysis.checks;
      issues = analysis.issues;
      recommendations = analysis.recommendations;
      categoryScores = analysis.categoryScores;
    } else {
      // No website scenario
      checks = [
        { name: "Website Exists", message: "No website found", passed: false, points: 0, severity: "critical" },
        { name: "Online Visibility", message: "Invisible to Google searches", passed: false, points: 0, severity: "critical" },
      ];
      issues = [
        "No website — you're missing 100% of online searches",
        "No owned digital presence — competitors capture your market",
        "Can't be found on Google Maps or local searches",
      ];
      recommendations = [
        "Priority: Build a professional website immediately",
        "Claim Google Business Profile for local visibility",
        "Set up basic landing page with contact info",
      ];
    }

    // Calculate weighted score
    const totalPoints = checks.reduce((sum, c) => sum + c.points, 0);
    const maxPoints = 100;
    const score = Math.min(100, Math.round((totalPoints / maxPoints) * 100));

    // Determine grade
    let grade = "F";
    if (score >= 90) grade = "A";
    else if (score >= 80) grade = "B+";
    else if (score >= 70) grade = "B";
    else if (score >= 60) grade = "C";
    else if (score >= 50) grade = "D";

    // Save as lead
    const lead = await addLead({
      name,
      email,
      businessName,
      website: website || undefined,
      phone: phone || undefined,
      niche,
      budget: "50k-100k",
      painPoint: `Website grader: Score ${score}/100 (${grade}). Top issues: ${issues.slice(0, 3).join("; ")}`,
      source: "website-grader-v2",
    });

    // Send enhanced audit email
    await sendAuditEmail({
      to: email,
      name,
      businessName,
      auditPoints: issues.slice(0, 5),
      recommendations: recommendations.slice(0, 4),
      score,
      grade,
      nextStep: `Your website scored ${score}/100 (${grade}). These issues are costing you customers every day. Let's fix them.`,
      calLink: "https://cal.com/plainsightdigital/30min",
    });

    const result: AuditResult = {
      score,
      businessName,
      website,
      checks,
      issues,
      recommendations,
      categoryScores,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Audit API error:", error);
    return NextResponse.json({ error: "Failed to analyze website" }, { status: 500 });
  }
}
