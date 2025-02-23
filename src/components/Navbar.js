"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitcher from "./ThemeSwitcher";
import { motion, useAnimation } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const controls = useAnimation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={controls}
      className={`fixed top-0 left-0 w-full z-50 p-4 transition-all duration-300 ${
        scrolled
          ? "bg-white dark:bg-gray-800 shadow-lg"
          : "bg-transparent dark:bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Judul */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={controls}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-blue-700 dark:text-purple-300"
        >
          XI RPL 4
        </motion.h1>

        {/* Menu untuk Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {["Home", "About", "Gallery", "Contact"].map((item, index) => {
            const href = item === "Home" ? "/" : `/${item.toLowerCase()}`;
            const isActive = pathname === href;

            return (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={controls}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Link
                  href={href}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-blue-700 text-white dark:bg-blue-500"
                      : "text-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {item}
                </Link>
              </motion.li>
            );
          })}
          <ThemeSwitcher />
        </ul>

        {/* Tombol Hamburger untuk Mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-900 dark:text-white focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-lg p-4"
        >
          <ul className="flex flex-col items-center gap-4">
            {["Home", "About", "Gallery", "Contact"].map((item) => {
              const href = item === "Home" ? "/" : `/${item.toLowerCase()}`;
              return (
                <li key={item} className="w-full text-center">
                  <Link
                    href={href}
                    className="block w-full py-2 px-4 text-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              );
            })}
            <li>
              <ThemeSwitcher />
            </li>
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
