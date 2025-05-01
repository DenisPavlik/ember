"use server";

import { DonationModel } from "@/models/Donation";
import { ProfileInfoModel } from "@/models/ProfileInfo";
import md5 from "md5";
import mongoose from "mongoose";
import axios from "axios";

export default async function createDonation(
  formData: FormData
): Promise<string | false> {
  const { amount, name, message, crypto, email } = Object.fromEntries(formData);
  await mongoose.connect(process.env.MONGODB_URI as string);
  const donationDoc = await DonationModel.create({
    amount,
    name,
    message,
    crypto,
    email,
    // paid: false,
    paid: true
  });
  const profileInfoDoc = await ProfileInfoModel.findOne({ email });
  if (!profileInfoDoc) {
    return false;
  }

  const fakeSuccessUrl = `${process.env.NEXTAUTH_URL}/${profileInfoDoc.username}?success=1`;

  // console.log("FAKE PAYMENT REDIRECT:", fakeSuccessUrl);

  return fakeSuccessUrl;

  // creation a cryptomus invoise and return the url
  // const endPoint = "https://api.cryptomus.com/v1/payment";
  // const apiKey = process.env.CRYPTOMUS_PAYMENT_API_KEY as string;
  // const merchant = process.env.CRYPTOMUS_MERCHANT_ID as string;
  // const data = {
  //   amount: (parseInt(amount as string) * 5).toString() + ".00",
  //   currency: "USD",
  //   order_id: donationDoc._id.toString(),
  //   to_currency: (crypto as string).toUpperCase(),
  //   use_callback: "https://localhost:3000",
  //   url_return: process.env.NEXTAUTH_URL + profileInfoDoc.username,
  //   url_success:
  //     process.env.NEXTAUTH_URL + profileInfoDoc.username + "?success=1",
  // };
  // const sign = md5(btoa(JSON.stringify(data)) + apiKey);
  // try {
  //   const response = await axios.post(endPoint, data, {
  //     headers: {
  //       merchant,
  //       sign,
  //     },
  //   });
  //   return response.data.result.url;
  //   // return 'https://localhost:3000/denys?success=1'
  // } catch (e) {
  //   if (axios.isAxiosError(e) && e.response) {
  //     console.log(e.response.status);
  //     console.log(e.response.data);
  //   }
  // }
  // return false;
}
