import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Limo Sweden — Private Chauffeur Service Stockholm",
    template: "%s | Limo Sweden",
  },
  description:
    "Premium private chauffeur service in Stockholm. Luxury fleet including Rolls Royce, Bentley, Mercedes-Maybach. Airport transfers, corporate & VIP transportation.",
  metadataBase: new URL("https://limoswe.se"),
  openGraph: {
    siteName: "Limo Sweden",
    locale: "en_SE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable}`}
    >
      <body className="bg-limo-black text-limo-white antialiased">
        {children}
      </body>
    </html>
  );
}
