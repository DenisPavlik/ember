import DonationList from "@/components/DonationList";
import NotLoggedin from "@/components/NotLoggedin";
import PayoutButton from "@/components/PayoutButton";
import ProfileInfoForm from "@/components/ProfileInfoForm";
import ProfileLinkCard from "@/components/ProfileLinkCard";
import { authOptions } from "@/lib/authOptions";
import { COFFEE_PRICE } from "@/lib/config";
import { Donation, DonationModel } from "@/models/Donation";
import { ProfileInfoModel } from "@/models/ProfileInfo";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import Link from "next/link";

const RECENT_SUPPORTERS_LIMIT = 5;

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return (
      <NotLoggedin />
    );
  }

  const email = session.user.email;

  await mongoose.connect(process.env.MONGODB_URI as string);
  const profileInfoDoc = JSON.parse(
    JSON.stringify(await ProfileInfoModel.findOne({ email }))
  );

  const [allDonations, recentDonations] = await Promise.all([
    DonationModel.find({ paid: true, email }),
    DonationModel.find({ paid: true, email })
      .sort({ createdAt: -1 })
      .limit(RECENT_SUPPORTERS_LIMIT),
  ]);
  const totalCoffees = allDonations.reduce((sum, d) => sum + d.amount, 0);
  const total = totalCoffees * COFFEE_PRICE;
  const donationsCount = allDonations.length;

  return (
    <section className="max-w-2xl mx-auto px-4 mt-4">
      <ProfileInfoForm profileInfo={profileInfoDoc} />
      {profileInfoDoc?.username && (
        <ProfileLinkCard username={profileInfoDoc.username} />
      )}
      <div className="bg-yellow-300/20 border-2 border-yellow-300 p-4 rounded-xl my-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-xs uppercase tracking-wide text-gray-600">
              Total earned
            </div>
            <div className="text-2xl font-semibold">${total}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-gray-600">
              Coffees
            </div>
            <div className="text-2xl font-semibold">{totalCoffees}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-gray-600">
              Donations
            </div>
            <div className="text-2xl font-semibold">{donationsCount}</div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <PayoutButton />
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-4 my-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">
            Recent supporters
            {allDonations.length > 0 && (
              <span className="text-gray-400 font-normal ml-1">
                ({allDonations.length})
              </span>
            )}
          </h3>
          {profileInfoDoc?.username && allDonations.length > RECENT_SUPPORTERS_LIMIT && (
            <Link
              href={`/${profileInfoDoc.username}`}
              className="text-sm text-gray-500 hover:underline"
            >
              See all
            </Link>
          )}
        </div>
        <DonationList donations={JSON.parse(JSON.stringify(recentDonations)) as Donation[]} />
      </div>
    </section>
  );
}
