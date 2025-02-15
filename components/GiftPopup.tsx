"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firestore } from "@/libs/firebase";
import { ToastContainer, toast } from "react-toastify";
import { usePathname } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import logger from "@/libs/logger";

// Gift icon SVG updated to be responsive: mobile (w-6 h-6) and desktop (w-8 h-8)
const GiftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className="w-7 h-7 md:w-8 md:h-8"
  >
    <path d="M 9 2 C 7.346 2 6 3.346 6 5 C 6 5.3523906 6.0714373 5.6856091 6.1835938 6 L 2 6 L 2 12 L 3 12 L 3 19.087891 C 3 20.142891 3.8571094 21 4.9121094 21 L 19.087891 21 C 20.142891 21 21 20.142891 21 19.087891 L 21 12 L 22 12 L 22 6 L 17.816406 6 C 17.928563 5.6856091 18 5.3523906 18 5 C 18 3.346 16.654 2 15 2 C 14.229288 2 13.531943 2.2998104 13 2.7792969 L 13 2.765625 L 12.921875 2.84375 C 12.895215 2.8694499 12.86945 2.8952145 12.84375 2.921875 L 12 3.765625 L 11.15625 2.921875 C 11.13055 2.8952145 11.104785 2.8694499 11.078125 2.84375 L 11 2.765625 L 11 2.7792969 C 10.468057 2.2998104 9.7707122 2 9 2 z M 9 4 C 9.552 4 10 4.449 10 5 C 10 5.551 9.552 6 9 6 C 8.448 6 8 5.551 8 5 C 8 4.449 8.448 4 9 4 z M 15 4 C 15.552 4 16 4.449 16 5 C 16 5.551 15.552 6 15 6 C 14.448 6 14 5.551 14 5 C 14 4.449 14.448 4 15 4 z M 4 8 L 20 8 L 20 10 L 4 10 L 4 8 z M 5 12 L 11 12 L 11 19 L 5 19 L 5 12 z M 13 12 L 19 12 L 19 19 L 13 19 L 13 12 z"></path>
  </svg>
);

const isValidPhoneNumber = (phone: string) => {
  // A simple phone number regex (adjust according to your needs)
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  return phoneRegex.test(phone);
};

export default function GiftPopup() {
  const pathname = usePathname();
  if (pathname === "/ContactUs") {
    return null;
  }
  const [showIcon, setShowIcon] = useState(false); // Show gift icon bubble
  const [showModal, setShowModal] = useState(false); // Show popup modal
  const [positionStyle, setPositionStyle] = useState<"fixed" | "absolute">("fixed");
  const [iconBottom, setIconBottom] = useState("40px"); // default bottom offset
  const [rightOffset, setRightOffset] = useState("8rem"); // default right offset for desktop
  const [shake, setShake] = useState(false); // Controls shake animation
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Show gift icon bubble after 20 seconds
  useEffect(() => {
    const submitted = localStorage.getItem("giftPopupSubmitted");
    // 7 days = 7 * 24 * 60 * 60 * 1000 ms = 604800000 ms
    if (submitted && Date.now() - parseInt(submitted) < 604800000) {
      // Don't show the gift icon if the form was submitted within the last 7 days.
      return;
    }
    const timer = setTimeout(() => {
      setShowIcon(true);
    }, 20000); // 20 seconds delay
    return () => clearTimeout(timer);
  }, []);

  // Trigger shake animation every 10 seconds for 500ms
  useEffect(() => {
    const interval = setInterval(() => {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Update right offset based on screen width for responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setRightOffset("1.5rem");
      } else {
        setRightOffset("8rem");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Consolidated scroll listener: adjust bottom offset based on footer position using document.querySelector("footer")
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("#giftStopper");
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (footerRect.top < windowHeight) {
          // Compute new bottom offset so the icon stays above the footer with a 20px gap
          const computedOffset = windowHeight - footerRect.top + 20;
          const newOffset = Math.min(computedOffset, 80); // Clamp maximum offset to 80px
          setIconBottom(`${newOffset}px`);
          setPositionStyle("absolute");
        } else {
          setIconBottom("40px");
          setPositionStyle("fixed");
        }
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission from popup
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.subject.trim()) {
      toast.error("All fields are required.");
      return;
    }
    if (!isValidPhoneNumber(formData.phone)) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    setIsSubmitting(true);
    try {
      // Call server-side API to append data to Google Sheets (fire-and-forget)
      fetch("/api/google_sheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          number: formData.phone,  // Map phone to number for Google Sheets
          subject: formData.subject,
        }),
      })
      .then((response) => {
        if (response.ok) {
          logger.info(`Contact data of "${formData.name}" appended to Google Sheets successfully`);
        } else {
          const responseInfo = {
            status: response.status,
            statusText: response.statusText,
          };
          logger.error(`Failed to append contact data of "${formData.name}" to Google Sheets`, {formData,responseInfo});
        }
      })
      .catch((error) => {
        logger.error(`Error appending contact data of "${formData.name}" to Google Sheets`, {formData,error});
      });

      // Save contact data to Firestore in the "contacts" collection
      await addDoc(collection(firestore, "contacts"), {
        name: formData.name,
        number: formData.phone,
        subject: formData.subject,
        createdAt: serverTimestamp(),
      });
      toast.success("Details submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      logger.info(`Contact data of "${formData.name}" written to FireStore`);
      localStorage.setItem("giftPopupSubmitted", Date.now().toString());
      setFormData({ name: "", phone: "", subject: "" });
      setShowModal(false);
      setShowIcon(false);
    } catch (error: any) {
      toast.error("Error submitting details. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
      logger.error(`Error writing contact data of "${formData.name}" to FireStore`, {formData, error});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />
      {/* Floating gift icon bubble */}
      {showIcon && !showModal && (
        <div
          style={{
            position: positionStyle,
            bottom: iconBottom,
            right: rightOffset,
            zIndex: 1000,
            cursor: "pointer",
          }}
          onClick={() => setShowModal(true)}
        >
          <div className={`bg-indigo-500 transition hover:bg-indigo-400 rounded-full p-2 shadow-lg ${shake ? "animate-shake" : ""}`}>
            <GiftIcon />
          </div>
        </div>
      )}
      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="relative bg-gray-900/90 p-8 rounded-lg shadow-lg w-full max-w-md mx-4 md:mx-auto text-center border border-gray-700">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 p-2 text-white hover:text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                className="h-6 w-6"
                fill="currentColor"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4 text-white">
              Get Your Free Consultation!
            </h2>
            <p className="mb-6 text-white">
              Connect with us for a free consultation. Enter your details below.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full rounded-md border-gray-700 bg-gray-800 p-2 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  className="w-full rounded-md border-gray-700 bg-gray-800 p-2 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Let us know how we can help"
                  className="w-full rounded-md border-gray-700 bg-gray-800 p-2 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-4 w-full flex items-center justify-center rounded-md px-5 py-2 text-sm text-white shadow-lg focus:outline-none focus:ring-4 ${
                  isSubmitting ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.7s ease-in-out;
        } 
      `}</style>
    </>
  );
}
