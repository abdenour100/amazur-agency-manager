import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amazur | Espace client",
  description: "Espace privé de suivi des contenus et services Amazur.",
  applicationName: "Amazur",
};

export const viewport: Viewport = {
  themeColor: "#101b2b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}