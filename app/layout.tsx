import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Daily Scoop — A Field Manual for Supplements, Health & Meal Planning",
  description:
    "An evidence-based, interactive broadsheet on protein quality, bioavailability, cost, and personalized planning. Verified with Trustified lab-tested products.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
