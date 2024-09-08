import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-1 py-1 shadow-sm sm:px-6 bg-[#ffc107]">
      <Link href="#" className="flex items-center gap-2" prefetch={false}>
        <span className="text-lg font-medium">UI Helper</span>
      </Link>
      <Link
        href="https://github.com/ui-helper/ui-chart-helper"
        target="_blank"
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
