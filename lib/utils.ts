import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollTo(id: string) {
  document
    .getElementById(id.toLowerCase())
    ?.scrollIntoView({ behavior: "smooth" });
}

export function numbersToArabic(input: number | string): string {
  const arabicNumbers = ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩"];

  return input
    .toString()
    .replace(/\d/g, (digit) => arabicNumbers[Number(digit)]);
}