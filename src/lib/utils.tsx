// import { clsx, type ClassValue } from "clsx";
// import { twMerge } from "tailwind-merge";

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

// export function createQueryString(name: string, value: string) {
//   if (!value) return "";
//   const params = new URLSearchParams();
//   if (params.size > 1) {
//     params.append(name, value);
//   } else {
//     params.set(name, value);
//   }
//   return params.toString();
// }

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
