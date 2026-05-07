import { DonationModel } from "@/models/Donation";
import crypto from "crypto";
import md5 from "md5";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { z } from "zod";

const webhookSchema = z.object({
  order_id: z.string().min(1),
  status: z.string(),
});

function safeEqual(a: string, b: string): boolean {
  const bufA = new Uint8Array(Buffer.from(a));
  const bufB = new Uint8Array(Buffer.from(b));
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export async function POST(req: Request) {
  const apiKey = process.env.CRYPTOMUS_PAYMENT_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const receivedSign = req.headers.get("sign");
  if (!receivedSign) {
    return NextResponse.json({ error: "Missing signature" }, { status: 401 });
  }

  const body = await req.json();

  // Cryptomus signs with md5(base64(jsonBody) + apiKey).
  // md5 is required by their protocol — keep it, but compare in constant time.
  const expectedSign = md5(
    Buffer.from(JSON.stringify(body)).toString("base64") + apiKey
  );

  if (!safeEqual(receivedSign, expectedSign)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const parsed = webhookSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { order_id, status } = parsed.data;

  if (status === "paid") {
    await mongoose.connect(process.env.MONGODB_URI as string);
    await DonationModel.findByIdAndUpdate(order_id, { paid: true });
  }

  return NextResponse.json({ success: true });
}
