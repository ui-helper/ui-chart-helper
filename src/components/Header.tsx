import { GitlabIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-background px-4 py-3 shadow-sm sm:px-6">
      <Link href="#" className="flex items-center gap-2" prefetch={false}>
        <UserIcon className="h-6 w-6" />
        <span className="text-lg font-medium">UI Helper</span>
      </Link>
      <Link
        href="#"
        className="text-muted-foreground hover:text-foreground"
        prefetch={false}
      >
        <GitlabIcon className="h-6 w-6" />
        <span className="sr-only">GitHub</span>
      </Link>
    </header>
  );
};

export default Header;
