import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import {Navbar} from "./components/Navbar";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "VillaVibe",
  description: "VillaVibe connects travelers with unique homes and stays around the world. Discover cozy stays, verified hosts, and memorable travel experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className}`}
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
