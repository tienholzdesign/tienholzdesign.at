import { Inter as Sans, Karla as Serif } from "next/font/google";
import localFont from "next/font/local";

export const sans = Sans({
  weight: "variable",
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const serif = Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

export const local = localFont({
  src: "../public/fonts/albert-sans_normal_400.ttf",
  style: "normal",
  variable: "--font-local",
});
