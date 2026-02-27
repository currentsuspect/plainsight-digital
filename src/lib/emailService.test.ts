import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendEmail, sendColdEmail, sendTransactional } from "./emailService";

// Mock config
vi.mock("./config", () => ({
  config: {
    get resendApiKey() { return "test-api-key"; },
    get fromEmail() { return "test@example.com"; },
    replyToEmail: "reply@example.com",
  },
}));

describe("emailService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: async () => ({ id: "email-123" }),
    });
  });

  describe("sendEmail", () => {
    it("sends email via Resend API", async () => {
      const result = await sendEmail({
        to: "recipient@example.com",
        subject: "Test Subject",
        text: "Test body",
      });

      expect(result.sent).toBe(true);
      expect(result.id).toBe("email-123");
      expect(fetch).toHaveBeenCalledWith(
        "https://api.resend.com/emails",
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            Authorization: "Bearer test-api-key",
          }),
        })
      );
    });

    it("includes HTML when provided", async () => {
      await sendEmail({
        to: "recipient@example.com",
        subject: "Test",
        text: "Plain text",
        html: "<p>HTML</p>",
      });

      const callArgs = (fetch as ReturnType<typeof vi.fn>).mock.calls[0];
      const body = JSON.parse(callArgs[1].body);
      expect(body.html).toBe("<p>HTML</p>");
    });

    it("handles API errors gracefully", async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
        ok: false,
        text: async () => "Invalid API key",
      });

      const result = await sendEmail({
        to: "recipient@example.com",
        subject: "Test",
        text: "Body",
      });

      expect(result.sent).toBe(false);
      expect(result.reason).toContain("resend_error");
    });

    it("handles network errors", async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValue(
        new Error("Network error")
      );

      const result = await sendEmail({
        to: "recipient@example.com",
        subject: "Test",
        text: "Body",
      });

      expect(result.sent).toBe(false);
      expect(result.reason).toContain("exception");
    });
  });

  describe("sendColdEmail", () => {
    it("sends plain text cold emails", async () => {
      await sendColdEmail({
        to: "prospect@company.com",
        subject: "Quick question",
        body: "Hi there...",
      });

      const callArgs = (fetch as ReturnType<typeof vi.fn>).mock.calls[0];
      const body = JSON.parse(callArgs[1].body);
      expect(body.text).toBe("Hi there...");
      expect(body.html).toBeUndefined();
    });
  });

  describe("sendTransactional", () => {
    it("supports HTML transactional emails", async () => {
      await sendTransactional({
        to: "user@example.com",
        subject: "Welcome",
        text: "Welcome text",
        html: "<h1>Welcome!</h1>",
      });

      const callArgs = (fetch as ReturnType<typeof vi.fn>).mock.calls[0];
      const body = JSON.parse(callArgs[1].body);
      expect(body.html).toBe("<h1>Welcome!</h1>");
    });
  });
});
