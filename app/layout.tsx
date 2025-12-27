import type { Metadata } from "next";
import { ToastProvider } from './context/ToastContext';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import './globals.css';
import 'leaflet/dist/leaflet.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scholar Grid- Home EDu-OS",
  description: "A hackjam 2025 product",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <ToastProvider>
        {children}
        </ToastProvider>
      </body>
    </html>
  );
}
