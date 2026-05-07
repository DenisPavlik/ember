"use server";

import { authOptions } from "@/lib/authOptions";
import { profileSchema } from "@/lib/schemas";
import { RESERVED_USERNAMES } from "@/lib/usernameRules";
import { ProfileInfoModel } from "@/models/ProfileInfo";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function saveProfile(formData: FormData) {
  await mongoose.connect(process.env.MONGODB_URI as string);

  const session = await getServerSession(authOptions);
  if (!session) throw new Error("You need to be logged in");
  const email = session.user?.email;

  const raw = Object.fromEntries(formData);
  const parsed = profileSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Invalid profile data");
  }

  const { username, displayName, bio, coverUrl, avatarUrl } = parsed.data;

  if (username) {
    if (RESERVED_USERNAMES.has(username)) {
      throw new Error("This username is reserved. Please choose another one.");
    }
    const existingUser = await ProfileInfoModel.findOne({
      username,
      email: { $ne: email },
    });
    if (existingUser) {
      throw new Error("Username already taken. Please choose another one.");
    }
  }

  const profileInfoDoc = await ProfileInfoModel.findOne({ email });
  if (profileInfoDoc) {
    profileInfoDoc.set({ username, displayName, bio, coverUrl, avatarUrl });
    await profileInfoDoc.save();
  } else {
    await ProfileInfoModel.create({
      username,
      displayName,
      bio,
      email,
      coverUrl,
      avatarUrl,
    });
  }

  return true;
}
