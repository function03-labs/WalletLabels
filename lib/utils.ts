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

export function getChainEnv(chainSlug: string) {
  switch (chainSlug) {
    case "arbitrum":
      return process.env.CLC_NAME_WLBLS_ARBITRUM;
    case "avax":
      return process.env.CLC_NAME_WLBLS_AVAX;
    case "solana":
      return process.env.CLC_NAME_WLBLS_SOLANA;
    case "bsc":
      return process.env.CLC_NAME_WLBLS_BSC;
    case "ftm":
      return process.env.CLC_NAME_WLBLS_FTM;
    case "optimism":
      return process.env.CLC_NAME_WLBLS_OPTIMISM;
    case "polygon":
      return process.env.CLC_NAME_WLBLS_POLYGON;
    case "solo-stakers":
      return process.env.CLC_NAME_WLBLS_SOLOSTAKERS;
    case "mev":
      return process.env.CLC_NAME_WLBLS_MEV;
    default:
      return process.env.CLC_NAME_WLBLS!;
  }
}

export function normalizeLabels(labels: any[]): any[] {
  const normalizedLabels: any[] = [];

  for (const label of labels) {
    const normalizedLabel = {
      _id: label._id,
      address: label.address || label.ADDRESS,
      address_name: label.address_name || label.ADDRESS_NAME,
      label_type: label.label_type || label.LABEL_TYPE,
      label_subtype: label.label_subtype || label.LABEL_SUBTYPE,
      label: label.label || label.LABEL,
    };

    normalizedLabels.push(normalizedLabel);
  }

  return normalizedLabels;
}
