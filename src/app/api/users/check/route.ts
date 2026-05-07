import { authOptions } from "@/lib/authOptions";
import { validateUsernameFormat } from "@/lib/usernameRules";
import { ProfileInfoModel } from "@/models/ProfileInfo";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const username = (req.nextUrl.searchParams.get("username") || "")
    .trim()
    .toLowerCase();

  const formatError = validateUsernameFormat(username);
  if (formatError) {
    return NextResponse.json({ available: false, reason: formatError });
  }

  await mongoose.connect(process.env.MONGODB_URI as string);
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  const existing = await ProfileInfoModel.findOne({
    username,
    ...(email ? { email: { $ne: email } } : {}),
  })
    .select({ _id: 1 })
    .lean();

  if (existing) {
    return NextResponse.json({ available: false, reason: "taken" });
  }
  return NextResponse.json({ available: true });
}
