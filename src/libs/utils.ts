import { twMerge } from 'tailwind-merge'
import { type ClassValue, clsx } from "clsx";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }