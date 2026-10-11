
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "D/S Studio",
    template: "%s | D/S Studio",
  },

  description:
    "D/S Studio is a creative and technology studio combining graphic design, audiovisual storytelling, software development, and artificial intelligence.",

  applicationName: "D/S Studio",

  icons: {
    icon: [
      {
        url: "/images/hero/logo.png",
        type: "image/png",
        sizes: "any",
      },
    ],
    shortcut: "/images/hero/logo.png",
    apple: "/images/hero/logo.png",
  },

  openGraph: {
    title: "D/S Studio | Creative & Technology",
    description:
      "Creative design meets software development and artificial intelligence.",
    type: "website",
    images: ["/images/hero/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
