import type { Metadata } from "next";
import "./globals.css";
import AppProvider from "@/components/AppProvider";

export const metadata: Metadata = {
  title: "Disaster Help Coordination Platform",
  description: "Resilient coordination platform for disaster relief",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
