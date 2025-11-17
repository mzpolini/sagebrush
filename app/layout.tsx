import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Outfit, Source_Sans_3, Geist_Mono } from "next/font/google";
import Header from "./_components/Header";
import "./globals.css";
import Footer from "./_components/Footer";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sagebrush",
  description: "Cannabis license intelligence platform",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Sagebrush",
    description: "Cannabis license intelligence platform",
    url: "https://sagebrush.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: "#000000" },
      }}
      afterSignInUrl="/profile"
      afterSignUpUrl="/profile"
    >
      <html
        lang="en"
        className={`${sourceSans.variable} ${outfit.variable} ${geistMono.variable} antialiased`}
      >
        <body>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
