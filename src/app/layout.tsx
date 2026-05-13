import type { Metadata } from "next";
import { Be_Vietnam_Pro, Fraunces } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { SplashIntro } from "@/components/SplashIntro";
import { ArtisanEffects } from "@/components/ArtisanEffects";

const sans = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MXH Resource Hub - Kho tài nguyên boutique cho creator",
  description:
    "Không gian chia sẻ source code, template, reels, nhiệm vụ và cộng đồng creator được thiết kế như một studio số cao cấp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${sans.variable} ${display.variable} min-h-screen flex flex-col antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SplashIntro />
          <ArtisanEffects />
          <Sidebar />
          <Navbar />
          <main className="flex-1 mt-16 flex flex-col lg:pl-20">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
