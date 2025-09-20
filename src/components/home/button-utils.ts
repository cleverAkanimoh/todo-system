import Brand2 from "@/assets/nav_12_image.svg";
import Brand1 from "@/assets/nav_1_image.svg";
import Brand3 from "@/assets/nav_2_image.svg";
import Brand4 from "@/assets/nav_3_image.svg";

interface TButtonArray {
  label: string;
  color?: string;
}

export const lastButtonArray: TButtonArray[] = [
  { label: "Melding maken", color: "#41245F" },
  { label: "VIM" },
  { label: "LMS" },
  { label: "BHV" },
  { label: "DataLek" },
];

export const buttonImagesArray = [Brand1, Brand2, Brand3, Brand4];
