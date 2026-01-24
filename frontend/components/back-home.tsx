import Link from "next/link";
import { images, navigationContent } from "@/lib/content";

export default function BackHome() {
  return (
    <Link
      href={navigationContent.backHome.href}
      className="underline text-blue-700 fixed p-4"
    >
      <img
        width="30"
        height="30"
        className="text-primary opacity-60 hover:opacity-70"
        src={images.external.backIcon}
        alt={navigationContent.backHome.iconAlt}
      />
    </Link>
  );
}
