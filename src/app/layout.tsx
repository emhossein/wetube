"use client";

import Header from "@/components/Guide/Header";
import "./globals.css";
import { Inter, Roboto } from "next/font/google";
import Drawer from "@/components/Guide/Drawer";
import { Providers } from "@/redux/Provider";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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