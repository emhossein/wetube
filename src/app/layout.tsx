"use client";

import Header from "@/components/Guide/Header";
import "./globals.css";
import { Roboto } from "next/font/google";
import Drawer from "@/components/Guide/Drawer";
import { Providers } from "@/redux/Provider";
import Head from "next/head";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>VisionTube</title>
        <meta property="og:title" content="VisionTube" key="title" />
        <meta
          name="description"
          content="Discover and stream a vast collection of high-quality videos on our online video watching platform. Explore diverse genres, including movies, TV shows, documentaries, and more. Enjoy an immersive viewing experience with our user-friendly interface and seamless playback. Watch your favorite videos anytime, anywhere, on any device. Join our community of avid viewers and embark on a captivating entertainment journey today!"
        />
      </Head>
      <body className={`${roboto.className} | overflow-x-hidden bg-black`}>
        <Providers>
          <Header />
          <div className="flex">
            <Drawer />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
