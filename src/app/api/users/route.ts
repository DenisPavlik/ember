import { ProfileInfoModel } from "@/models/ProfileInfo";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    const profiles = await ProfileInfoModel.find(
      { username: { $exists: true, $ne: "" } },
      "username displayName avatarUrl"
    );

    // const shuffled = profiles.sort(() => 0.5 - Math.random())
    // const randomUsers = shuffled.slice(0, 10)

    return NextResponse.json(profiles);
  } catch (error) {
    console.error("Failed to fetch random users:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
