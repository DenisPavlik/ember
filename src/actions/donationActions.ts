"use server";

import { DonationModel } from "@/models/Donation";
import { ProfileInfoModel } from "@/models/ProfileInfo";
import { donationSchema } from "@/lib/schemas";
import mongoose from "mongoose";

export default async function createDonation(
  formData: FormData
): Promise<string | false> {
  const raw = Object.fromEntries(formData);
  const parsed = donationSchema.safeParse(raw);
  if (!parsed.success) return false;

  const { amount, name, message, crypto, email } = parsed.data;

  await mongoose.connect(process.env.MONGODB_URI as string);

  await DonationModel.create({ amount, name, message, crypto, email, paid: true });

  const profileInfoDoc = await ProfileInfoModel.findOne({ email });
  if (!profileInfoDoc) return false;

  return `${process.env.NEXTAUTH_URL}/${profileInfoDoc.username}?success=1`;
}
