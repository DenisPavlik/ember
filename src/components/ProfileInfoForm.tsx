"use client";

import { saveProfile } from "@/actions/profileInfoActions";
import UploadButton from "./UploadButton";
import { useState } from "react";
import { ProfileInfo } from "@/models/ProfileInfo";
import Image from "next/image";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faSave } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "next-auth/react";

type Props = {
  profileInfo: ProfileInfo | null;
};

export default function ProfileInfoForm({ profileInfo }: Props) {
  const [coverUrl, setCoverUrl] = useState(profileInfo?.coverUrl || "");
  const [avatarUrl, setAvatarUrl] = useState(profileInfo?.avatarUrl || "");

  async function handleFormAction(formData: FormData) {
    try {
      await saveProfile(formData);
      toast.success("Profile saved!");
    } catch (error: any) {
      toast.error(error.message || 'Failed to save profile.')
    }
  }

  return (
    <form action={handleFormAction}>
      <div className="bg-gray-100 h-48 rounded-lg relative mb-4">
        <Image
          priority
          src={coverUrl || '/images/bgCover.jpg'}
          alt="coverUrl"
          width={1024}
          height={1024}
          className="w-fill h-48 object-cover object-center rounded-lg"
        />
        <div className="absolute z-10 -bottom-4 left-4 bg-gray-200 rounded-lg size-24">
          <div className="rounded-lg size-24 overflow-hidden">
            <Image src={avatarUrl || '/images/avatar.png'} alt="avatar" width={120} height={120} />
          </div>
          <div className="absolute -bottom-2 -right-2">
            <UploadButton onUploadComplete={setAvatarUrl} />
          </div>
          <input
            type="hidden"
            name="avatarUrl"
            value={avatarUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
          />
        </div>
        <div className="absolute bottom-2 right-2">
          <UploadButton onUploadComplete={setCoverUrl} />
          <input
            type="hidden"
            name="coverUrl"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="input-label" htmlFor="usernameIn">
            Username
          </label>
          <input
            id="usernameIn"
            name="username"
            defaultValue={profileInfo?.username}
            type="text"
            placeholder="alex"
          />
        </div>
        <div>
          <label className="input-label" htmlFor="displaynameIn">
            Display name
          </label>
          <input
            id="displaynameIn"
            name="displayName"
            defaultValue={profileInfo?.displayName}
            type="text"
            placeholder="Alex"
          />
        </div>
      </div>
      <div>
        <label className="input-label" htmlFor="bioIn">
          Bio
        </label>
        <textarea
          id="bioIn"
          name="bio"
          defaultValue={profileInfo?.bio}
          placeholder="Hi, my name is Alex and I am..."
        ></textarea>
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-yellow-300 rounded-lg py-2 px-4 mt-4 flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faSave} />
          Save profile
        </button>
        <button
          type="button"
          className="bg-gray-200 border border-gray-300 rounded-lg 
          py-2 px-4 mt-4 flex items-center gap-2"
          onClick={()=>signOut()}
        >
          Logout
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </div>
    </form>
  );
}
