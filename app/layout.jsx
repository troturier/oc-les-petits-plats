import { Anton, Manrope } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata = {
  title: "Les Petits Plats",
  description: "Découvrez nos recettes du quotidien, simples et délicieuses.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${anton.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="bg-brand-background text-brand-black flex min-h-full flex-col font-sans">
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
