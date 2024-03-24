import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function splitTags(str: string) {
  const delimiters = /[\s,\/\-\_\(\):]+/;

  let tags = str.split(delimiters);
  tags = tags.filter((tag) => tag.trim() !== "").map((tag) => tag.trim());
  return tags;
}
