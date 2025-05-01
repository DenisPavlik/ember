import { DonationModel } from "@/models/Donation";
import md5 from "md5";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await mongoose.connect(process.env.MONGODB_URI as string);

  const body = await req.json();
  const apiKey = process.env.CRYPTOMUS_PAYMENT_API_KEY as string;
  const receivedSign = req.headers.get("sign");

  const base64 = Buffer.from(JSON.stringify(body)).toString("base64");
  const expectedSign = md5(base64 + apiKey);

  console.log("SIGN:", expectedSign);

  if (receivedSign !== expectedSign) {
    console.warn("Invalid signature received from webhook");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const { order_id, status } = body;

  if (status === "paid") {
    await DonationModel.findByIdAndUpdate(order_id, { paid: true });
    console.log("Donation marked as paid:", order_id);
  }

  return NextResponse.json({ success: true });
}
