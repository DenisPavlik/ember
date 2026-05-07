import { describe, it, expect } from "vitest";
import { donationSchema, profileSchema } from "./schemas";

describe("donationSchema", () => {
  const validInput = {
    amount: "5",
    name: "Alice",
    message: "Keep going!",
    crypto: "btc",
    email: "alice@example.com",
  };

  it("accepts a valid donation payload", () => {
    const result = donationSchema.safeParse(validInput);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.amount).toBe(5);
    }
  });

  it("coerces string amounts to numbers", () => {
    const result = donationSchema.safeParse({ ...validInput, amount: "42" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.amount).toBe(42);
  });

  it("rejects amount below 1", () => {
    const result = donationSchema.safeParse({ ...validInput, amount: "0" });
    expect(result.success).toBe(false);
  });

  it("rejects amount above 1000", () => {
    const result = donationSchema.safeParse({ ...validInput, amount: "1001" });
    expect(result.success).toBe(false);
  });

  it("rejects non-integer amounts", () => {
    const result = donationSchema.safeParse({ ...validInput, amount: "5.5" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = donationSchema.safeParse({ ...validInput, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects unsupported crypto", () => {
    const result = donationSchema.safeParse({ ...validInput, crypto: "doge" });
    expect(result.success).toBe(false);
  });

  it("rejects empty name", () => {
    const result = donationSchema.safeParse({ ...validInput, name: "" });
    expect(result.success).toBe(false);
  });

  it("rejects messages longer than 500 chars", () => {
    const result = donationSchema.safeParse({ ...validInput, message: "x".repeat(501) });
    expect(result.success).toBe(false);
  });

  it("allows missing message", () => {
    const { message: _ignore, ...withoutMessage } = validInput;
    const result = donationSchema.safeParse(withoutMessage);
    expect(result.success).toBe(true);
  });
});

describe("profileSchema", () => {
  it("accepts a valid profile", () => {
    const result = profileSchema.safeParse({
      username: "alice_99",
      displayName: "Alice",
      bio: "Hi there",
      coverUrl: "https://example.com/c.jpg",
      avatarUrl: "https://example.com/a.jpg",
    });
    expect(result.success).toBe(true);
  });

  it("rejects username with uppercase letters", () => {
    const result = profileSchema.safeParse({ username: "AliceX" });
    expect(result.success).toBe(false);
  });

  it("rejects username with special characters", () => {
    const result = profileSchema.safeParse({ username: "alice!" });
    expect(result.success).toBe(false);
  });

  it("rejects username shorter than 3 chars", () => {
    const result = profileSchema.safeParse({ username: "ab" });
    expect(result.success).toBe(false);
  });

  it("rejects username longer than 30 chars", () => {
    const result = profileSchema.safeParse({ username: "a".repeat(31) });
    expect(result.success).toBe(false);
  });

  it("allows empty username (optional)", () => {
    const result = profileSchema.safeParse({ username: "" });
    expect(result.success).toBe(true);
  });

  it("allows empty avatar/cover URLs", () => {
    const result = profileSchema.safeParse({ coverUrl: "", avatarUrl: "" });
    expect(result.success).toBe(true);
  });

  it("rejects invalid avatar URL", () => {
    const result = profileSchema.safeParse({ avatarUrl: "not a url" });
    expect(result.success).toBe(false);
  });

  it("rejects bio longer than 500 chars", () => {
    const result = profileSchema.safeParse({ bio: "x".repeat(501) });
    expect(result.success).toBe(false);
  });
});
