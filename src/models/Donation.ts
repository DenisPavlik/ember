import { Schema, model, models } from "mongoose";

export type Donation = {
  _id: string;
  amount: number;
  name: string;
  message: string;
  crypto: "btc" | "eth" | "ltc";
  paid: boolean;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const donationSchema = new Schema(
  {
    amount: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String },
    crypto: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          return ["btc", "eth", "ltc"].includes(v);
        },
      },
    },
    paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

donationSchema.index({ email: 1, createdAt: -1 });

export const DonationModel =
  models?.Donation || model<Donation>("Donation", donationSchema);
