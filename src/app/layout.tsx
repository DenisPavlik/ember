import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces, Special_Elite } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Toaster } from "react-hot-toast";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-typewriter",
});

export const metadata: Metadata = {
  title: "Ember",
  description:
    `Ember makes supporting creators fun and easy. In just a couple of taps,
    your fans can send a donation and leave a message.`,
  icons: {
    icon: "/images/logo.png"
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${fraunces.variable} ${specialElite.variable}`}
    >
      <body className="font-sans">
        <Toaster />
        <Header session={session} />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
