"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <Image src={"/logo.svg"} width={160} height={100} alt="logo" />
      <ul className="hidden md:flex gap-6">
        <Link href={"/dashboard"}>
          <li
            className={`hover:text-primary hover:font-bold transition-all
            cursor-pointer
            ${path == "/dashboard" && "text-primary font-bold"}
            `}
          >
            Dashboard
          </li>
        </Link>
        <Link href={"/questions"}>
          <li
            className={`hover:text-primary hover:font-bold transition-all
            cursor-pointer
            ${path == "/questions" && "text-primary font-bold"}
            `}
          >
            Questions
          </li>
        </Link>
        <Link href={"/upgrade"}>
          <li
            className={`hover:text-primary hover:font-bold transition-all
            cursor-pointer
            ${path == "/upgrade" && "text-primary font-bold"}
            `}
          >
            Upgrade
          </li>
        </Link>
        <Link href={"/how-it-works"}>
          <li
            className={`hover:text-primary hover:font-bold transition-all
            cursor-pointer
            ${path == "/how-it-works" && "text-primary font-bold"}
            `}
          >
            How it Works?
          </li>
        </Link>

        <li>
          <UserButton />
        </li>
      </ul>
    </div>
  );
}
