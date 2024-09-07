import { Github, UserIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-background px-1 py-1 shadow-sm sm:px-6 bg-[#ffc107]">
      <Link href="#" className="flex items-center gap-2" prefetch={false}>
        <Image
          src="/images/ui-helper-logo.png"
          alt="UI Helper Logo"
          width={50}
          height={50}
        />
        <span className="text-lg font-medium">UI Helper</span>
      </Link>
      <Link
        href="#"
        className="text-muted-foreground hover:text-foreground"
        prefetch={false}
      >
        <Github className="h-6 w-6" />
        <span className="sr-only">GitHub</span>
      </Link>
    </header>
  );
};

export default Header;
