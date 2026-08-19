import type { Metadata } from "next";
import { Be_Vietnam_Pro, Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ResidentChat } from "@/components/ResidentChat";
import { CartProvider } from "@/components/CartProvider";
import "./globals.css";
import "./resident-chat.css";
import "./christmas.css";
import "./admin.css";
import "./stock-intake.css";
import "./cart.css";

const heading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap"
});

const body = Be_Vietnam_Pro({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "Mhenching Online",
    template: "%s · Mhenching Online"
  },
  description: "Useful little finds, local craft, and everyday essentials from Sta. Magdalena, Sorsogon.",
  metadataBase: new URL("https://mhenching.example")
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <ResidentChat />
        </CartProvider>
      </body>
    </html>
  );
}
