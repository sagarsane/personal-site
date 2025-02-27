"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const Navigation = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Experience", href: "/experience" },
    { name: "Blog", href: "/blog" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 dark:text-white"
            >
              SS
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:ring-2 ring-gray-300 transition-all"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {mounted && (
              <>
                {theme === "dark" ? (
                  <SunIcon className="h-5 w-5 text-gray-200" />
                ) : (
                  <MoonIcon className="h-5 w-5 text-gray-800" />
                )}
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
