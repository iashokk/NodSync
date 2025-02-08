"use client";

import Link from "next/link";
import Logo from "./logo";
import { useState, useEffect } from "react";
import { useAuth } from "../authContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {isLoggedIn, setLoggedIn} = useAuth();
  // Function to close the mobile menu
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Check the login state on initial render
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setLoggedIn(true);
    }
  }, [setLoggedIn]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedIn(false);
  };

  return (
    <header className="z-30 mt-2 w-full md:mt-5">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between rounded-2xl bg-gray-900/90 px-3 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] after:absolute after:inset-0 after:-z-10 after:backdrop-blur-sm">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex md:flex-1 md:justify-center">
            <ul className="flex items-center gap-16 text-gray-300">
              <li>
                <Link href="/" className="text-[1.02rem] hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/AboutUs" className="text-[1.02rem] hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/Blog" className="text-[1.02rem] hover:text-white transition">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/ContactUs" className="text-[1.02rem] hover:text-white transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
          {/* Sign In, Register or Logout based on login status */}
          <ul className="flex items-center gap-3">
            {isLoggedIn ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="btn-sm bg-gray-800 py-2 px-4 text-gray-300 hover:bg-gray-700"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    href="/signin"
                    className="btn-sm bg-gray-800 py-2 px-4 text-gray-300 hover:bg-gray-700"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="btn-sm bg-indigo-600 py-2 px-4 text-white hover:bg-indigo-500"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
            <li className="md:hidden flex items-center">
              {/* Hamburger Menu */}
              <button
                className="text-gray-300 focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-8 w-8" fill="none" stroke="currentColor">
                  <path 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  fill="white" 
                  d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/>
                </svg>
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="absolute left-0 top-14 w-full rounded-lg bg-gray-900/80 backdrop-blur-md p-4 shadow-lg md:hidden">
            <ul className="flex flex-col gap-4 text-gray-300">
              <li>
                <Link href="/" className="hover:text-white transition" onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/AboutUs" className="hover:text-white transition" onClick={closeMobileMenu}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/Blog" className="hover:text-white transition" onClick={closeMobileMenu}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/ContactUs" className="hover:text-white transition" onClick={closeMobileMenu}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
