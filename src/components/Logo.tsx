import AppLogo from "@/assets/Logo.svg";
import { Image } from "@chakra-ui/react";
import NextImage from "next/image";

export default function Logo() {
  return <Image as={NextImage} src={AppLogo} alt="MKV" />;
}
