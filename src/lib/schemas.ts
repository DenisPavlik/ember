import { z } from "zod";

export const donationSchema = z.object({
  amount: z.coerce.number().int().min(1).max(1000),
  name: z.string().min(1).max(100),
  message: z.string().max(500).optional(),
  crypto: z.enum(["btc", "eth", "ltc"]),
  email: z.string().email(),
});

export const profileSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-z0-9_]+$/, "Username can only contain lowercase letters, numbers and underscores")
    .optional()
    .or(z.literal("")),
  displayName: z.string().max(50).optional(),
  bio: z.string().max(500).optional(),
  coverUrl: z.string().url().optional().or(z.literal("")),
  avatarUrl: z.string().url().optional().or(z.literal("")),
});
