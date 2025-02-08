"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/authContext";
import { usePathname } from "next/navigation";

export default function SignupPopup() {
  const { isLoggedIn } = useAuth();
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);
  const [justLoggedOut, setJustLoggedOut] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      const lastLogout = localStorage.getItem("lastLogout");
      if (lastLogout && Date.now() - parseInt(lastLogout) < 30000) {
        setJustLoggedOut(true);
      } else {
        setJustLoggedOut(false);
      }
    } else {
      localStorage.setItem("lastLogout", Date.now().toString());
    }
  }, [isLoggedIn]);

  useEffect(() => {
    // Only show popup when not logged in, not on /signup or /signin, and not just logged out
    if (!isLoggedIn && pathname !== "/signup" && pathname !== "/signin" && !justLoggedOut) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 15000); // 15 seconds delay

      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, pathname, justLoggedOut]);

  if (!showModal) return null;

  // Close the modal when the button is clicked.
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="relative bg-gray-900/90 p-8 rounded-lg shadow-lg w-full max-w-md mx-4 md:mx-auto text-center border border-gray-700 backdrop-filter backdrop-blur-md">
        {/* Close button in the top-right corner */}
        <button onClick={handleClose} className="absolute top-2 right-2 p-2 text-white hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="h-6 w-6" fill="currentColor">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
            </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4 text-white">
          Register and get your free DSA Roadmap and Study Plan!
        </h2>
        <p className="mb-6 text-white">
          Sign up now to access exclusive resources that will help you master DSA
        </p>
        <Link href="/signup">
          <span
            onClick={handleClose}
            className="inline-block px-6 py-2 text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-500 transition duration-300"
          >
            Sign Up
          </span>
        </Link>
      </div>
    </div>
  );
}
