import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LSMX",
  description: "LSMX's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
