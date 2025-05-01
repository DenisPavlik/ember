"use server";
import DonationForm from "@/components/DonationForm";
import DonationStatus from "@/components/DonationStatus";
import { Donation, DonationModel } from "@/models/Donation";
import { ProfileInfo, ProfileInfoModel } from "@/models/ProfileInfo";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import Image from "next/image";

type Props = {
  params: {
    username: string;
  };
};

export default async function SingleProfilePage({ params }: Props) {
  const username = params.username;
  await mongoose.connect(process.env.MONGODB_URI as string);
  const profileInfoDoc: ProfileInfo | null = await ProfileInfoModel.findOne({
    username,
  });

  if (!profileInfoDoc) {
    return <div>404 - Profile not found</div>;
  }

  const donations: Donation[] = await DonationModel.find({
    paid: true,
    email: profileInfoDoc.email,
  });

  return (
    <div>
      <DonationStatus />
      <div className="w-full h-48">
        <Image
          priority
          src={profileInfoDoc.coverUrl || '/images/bgCover.jpg'}
          alt="coverUrl"
          width={2024}
          height={2024}
          className="h-48 w-full object-cover object-center"
        />
      </div>
      <div className="max-w-2xl mx-auto px-2 relative -mt-16">
        <div className="flex items-end gap-3">
          <div className="size-36 overflow-hidden rounded-xl border-2 border-white">
            <Image
              src={profileInfoDoc.avatarUrl || '/images/avatar.png'}
              alt="coverUrl"
              width={256}
              height={256}
              className="size-36 object-cover object-center"
            />
          </div>
          <div className="mb-1">
            <h1 className="text-4xl font-semibold">
              {profileInfoDoc.displayName}
            </h1>
            <div className="flex gap-1 items-center">
              <FontAwesomeIcon icon={faCoffee} />
              <span>/</span>
              <span>{profileInfoDoc.username}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white rounded-xl p-4 shadow-sm  max-h-96 overflow-auto">
            <h3 className="font-semibold">About {profileInfoDoc.username}</h3>
            {profileInfoDoc.bio}
            <hr className="my-4" />
            <h3 className="font-semibold mt-6">Recent supporters:</h3>
            {donations.length === 0 && (
              <>
                <p className="text-sm text-gray-500 mt-4 w-full">No recent donations</p>
              </>
            )}
            {donations.length > 0 && (
              <div className="mt-2">
                {donations.map((donation) => (
                  <div key={donation.name} className="py-2">
                    <h3>
                      <span className="font-semibold">{donation.name}</span>{" "}
                      <span className="text-gray-400">
                        bought you{" "}
                        {donation.amount > 1
                          ? `${donation.amount} coffee(s)`
                          : "a coffee"}
                      </span>
                    </h3>
                    <p className="bg-gray-100 rounded-md p-2 mt-1">
                      {donation.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm mb-4 md:mb-0">
            <DonationForm email={profileInfoDoc.email} />
          </div>
        </div>
      </div>
    </div>
  );
}
