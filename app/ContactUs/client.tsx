"use client";

import Footer from "@/components/ui/footer";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firestore } from "@/libs/firebase";
import logger from "@/libs/logger";

export default function ContactUsClient() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    number: "",
    role: "",
    topic: "",
    subject: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation:
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!isValidEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!formData.number.trim()) {
      toast.error("Phone Number is required");
      return;
    }
    if (!isValidPhoneNumber(formData.number)) {
      toast.error("Please enter a valid phone number");
      return;
    }
    if (!formData.role.trim()) {
      toast.error("Role is required");
      return;
    }
    if (!formData.topic.trim()) {
      toast.error("Topic is required");
      return;
    }
    if (!formData.subject.trim()) {
      toast.error("Subject is required");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Full Description is required");
      return;
    }
    setIsSubmitting(true);

    try {

      // Calling the server-side API to append the contact data to Google Sheets (fire-and-forget)
      fetch("/api/google_sheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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

      // Directly add the contact data to Firestore in the "contacts" collection
      await addDoc(collection(firestore, "contacts"), {
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        number: formData.number,
        role: formData.role,
        topic: formData.topic,
        subject: formData.subject,
        description: formData.description,
        createdAt: serverTimestamp(),
      });
      
      toast.success("Message sent successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      logger.info(`Contact data of "${formData.name}" written to FireStore`);

      // Reset the form data
      setFormData({
        name: "",
        surname: "",
        email: "",
        number: "",
        role: "",
        topic: "",
        subject: "",
        description: "",
      });
    } catch (error) {
      toast.error("Error sending message. Please try again!", {
        position: "top-right",
        autoClose: 3000,
      });
      logger.error(`Error writing contact data of "${formData.name}" to FireStore`, {formData, error});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="pb-12 text-center">
            <h1
              className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-5xl"
              data-aos="fade-up"
            >
              Contact Us
            </h1>
            <p className="text-xl text-indigo-200/65">
              Need guidance for your projects, competitions, or placements? Let’s connect! Tell us what you need, and we’ll reach out to help you sync smarter!
            </p>
          </div>
          <ToastContainer />
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-4xl space-y-6 p-8 rounded-lg shadow-lg"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-200"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="mt-1 w-full rounded-md border-gray-700 bg-gray-900 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="surname"
                  className="block text-sm font-medium text-gray-200"
                >
                  Surname
                </label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  placeholder="Your surname"
                  className="mt-1 w-full rounded-md border-gray-700 bg-gray-900 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-200"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="mt-1 w-full rounded-md border-gray-700 bg-gray-900 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="number"
                  className="block text-sm font-medium text-gray-200"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="Your Mobile Number"
                  className="mt-1 w-full rounded-md border-gray-700 bg-gray-900 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-200"
                >
                  I'm a <span className="text-red-500">*</span>
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-700 bg-gray-900 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select a role</option>
                  <option value="Student">Student</option>
                  <option value="Fresher">Fresher</option>
                  <option value="Work">Working Professional</option>
                  <option value="Other">Others</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div>
                <label
                  htmlFor="topic"
                  className="block text-sm font-medium text-gray-200"
                >
                  Topic <span className="text-red-500">*</span>
                </label>
                <select
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-700 bg-gray-900 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select a topic</option>
                  <option value="project_guidance">Project Guidance</option>
                  <option value="competition_prep">Competition Preparation</option>
                  <option value="placement_assistance">Placement Assistance</option>
                  <option value="coding_help">Coding Help</option>
                  <option value="academic_support">Academic Support</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-200"
              >
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Let us know how we can help"
                className="mt-1 w-full rounded-md border-gray-700 bg-gray-900 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-200"
              >
                Full Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Include as much detail as you can"
                className="mt-1 w-full rounded-md border-gray-700 bg-gray-900 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-4 w-full flex items-center justify-center rounded-md px-6 py-3 text-white shadow-lg focus:outline-none focus:ring-4 ${
                  isSubmitting ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="w-5 h-5 mr-2 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3m-3 3l-3-3"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send →"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </section>
  );
}

const isValidEmail = (email: string) => {
  // Basic email regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhoneNumber = (phone: string) => {
  // A simple phone number regex (adjust according to your needs)
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  return phoneRegex.test(phone);
};
