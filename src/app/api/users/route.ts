import { USERS_PER_PAGE } from "@/lib/config";
import { ProfileInfoModel } from "@/models/ProfileInfo";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1") || 1);
    const limit = Math.min(
      USERS_PER_PAGE,
      Math.max(1, parseInt(searchParams.get("limit") || String(USERS_PER_PAGE)) || USERS_PER_PAGE)
    );
    const skip = (page - 1) * limit;

    const profiles = await ProfileInfoModel.find(
      { username: { $exists: true, $ne: "" } },
      "username displayName avatarUrl"
    )
      .skip(skip)
      .limit(limit);

    return NextResponse.json(profiles);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
