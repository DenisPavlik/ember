import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Toaster } from "react-hot-toast";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pacifico",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Buy Me a Coffee",
  description:
    `Buy Me a Coffee makes supporting fun and easy. In just a couple of taps,
    your fans can make the payment (buy you a coffee) and leave a message.`,
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
    <html lang="en" className={`${pacifico.variable}`}>
      <body className={inter.className}>
        <Toaster />
        <Header session={session} />
        {children}
      </body>
    </html>
  );
}
