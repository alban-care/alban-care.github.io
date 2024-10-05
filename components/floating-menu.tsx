"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { appMenuLinks } from "@/lib/config";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function FloatingMenu() {
  const [isShown, setIsShown] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsShown(true);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <motion.div
          className="fixed bottom-6 right-4 p-2 rounded-full shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: isShown ? 1 : 0 }}
          transition={{ ease: "easeOut", duration: 2 }}
        >
          <Button className="p-2 rounded-full shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="m-4">
        {appMenuLinks.map((link) => (
          <DropdownMenuItem key={link.href}>
            <Link href={link.href} onClick={() => setIsOpen(!isOpen)}>
              {link.text}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
