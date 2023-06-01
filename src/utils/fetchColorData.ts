import { ColorData } from "@/types/colorDataTypes";

export async function fetchColorData(url: string): Promise<ColorData> {
  const response = await fetch(
    `https://jukify-back.vercel.app/api/colors?url=${encodeURIComponent(url)}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch color data");
  }
  const data = await response.json();
  return data as ColorData;
}
