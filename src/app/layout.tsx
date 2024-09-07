import "./globals.css";
import { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "UI Chart Helper",
  description: "We want to solve your problems with an easy UI.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
