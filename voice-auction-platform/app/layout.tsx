import type React from "react";
import type { Metadata } from "next";
import { Space_Grotesk, Sora } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "VoiceAuction - Voice-Enabled Real-Time Auction Platform",
  description:
    "Modern auction platform with voice commands and real-time bidding",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(spaceGrotesk.variable, sora.variable, "antialiased")}>
        {children}
        {/* <script
          id="omnidimension-web-widget"
          async
          src="https://backend.omnidim.io/web_widget.js?secret_key=f8cbcaf78b286d8ef7cea7c1cc6b521d"
        ></script> */}

        <script
          id="omnidimension-web-widget"
          async
          src="https://backend.omnidim.io/web_widget.js?secret_key=234914084843ed47ae0d8dea6bde15ce"
        ></script>
      </body>
    </html>
  );
}
