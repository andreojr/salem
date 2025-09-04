import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Salem Coven | Halloween Party",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '700'],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased bg-[#160D18]`}>
        {children}
      </body>
    </html>
  );
}
