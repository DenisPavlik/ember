import DonationForm from "@/components/DonationForm";
import DonationList from "@/components/DonationList";
import DonationStatus from "@/components/DonationStatus";
import Pagination from "@/components/Pagination";
import { DONATIONS_PER_PAGE } from "@/lib/config";
import { Donation, DonationModel } from "@/models/Donation";
import { ProfileInfo, ProfileInfoModel } from "@/models/ProfileInfo";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params: { username: string };
  searchParams: { page?: string };
};

export default async function SingleProfilePage({ params, searchParams }: Props) {
  const username = params.username;
  await mongoose.connect(process.env.MONGODB_URI as string);
  const profileInfoDoc: ProfileInfo | null = await ProfileInfoModel.findOne({ username });

  if (!profileInfoDoc) {
    notFound();
  }

  const totalDonations = await DonationModel.countDocuments({
    paid: true,
    email: profileInfoDoc.email,
  });
  const totalPages = Math.max(1, Math.ceil(totalDonations / DONATIONS_PER_PAGE));
  const requestedPage = parseInt(searchParams.page || "1") || 1;
  const currentPage = Math.min(Math.max(1, requestedPage), totalPages);
  const skip = (currentPage - 1) * DONATIONS_PER_PAGE;

  const donations: Donation[] = await DonationModel.find({
    paid: true,
    email: profileInfoDoc.email,
  })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(DONATIONS_PER_PAGE);

  return (
    <div>
      <DonationStatus />
      <div className="w-full h-48">
        <Image
          priority
          src={profileInfoDoc.coverUrl || '/images/bgCover.jpg'}
          alt={`${profileInfoDoc.displayName || profileInfoDoc.username} cover`}
          width={1200}
          height={192}
          sizes="100vw"
          className="h-48 w-full object-cover object-center"
        />
      </div>
      <div className="max-w-2xl mx-auto px-2 relative -mt-16">
        <div className="flex items-end gap-3">
          <div className="size-36 overflow-hidden rounded-xl border-2 border-white">
            <Image
              src={profileInfoDoc.avatarUrl || '/images/avatar.png'}
              alt={`${profileInfoDoc.displayName || profileInfoDoc.username} avatar`}
              width={256}
              height={256}
              className="size-36 object-cover object-center"
            />
          </div>
          <div className="mb-1">
            <h1 className="font-display text-4xl font-semibold tracking-tight">{profileInfoDoc.displayName}</h1>
            <div className="flex gap-1 items-center">
              <FontAwesomeIcon icon={faMugHot} />
              <span>/</span>
              <span>{profileInfoDoc.username}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white rounded-xl p-4 shadow-sm max-h-[32rem] overflow-auto">
            <h3 className="font-semibold">About {profileInfoDoc.username}</h3>
            <p className="mt-1 text-sm text-gray-700">
              {profileInfoDoc.bio || "This creator hasn't added a bio yet."}
            </p>
            <hr className="my-4" />
            <h3 className="font-semibold mt-6">
              Recent supporters
              {totalDonations > 0 && (
                <span className="text-gray-400 font-normal ml-1">({totalDonations})</span>
              )}
            </h3>
            <DonationList donations={donations} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath={`/${profileInfoDoc.username}`}
            />
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm mb-4 md:mb-0">
            <DonationForm email={profileInfoDoc.email} />
          </div>
        </div>
      </div>
    </div>
  );
}
