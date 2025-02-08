// app/sign-up/page.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';



export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Loading state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Reset error state
    setSuccessMessage(''); // Reset success message
    setIsSubmitting(true); // Show loading state

    try {
      const response = await fetch('/api/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        setSuccessMessage('User registered successfully!');
        setFormData({
          name: '',
          organization: '',
          email: '',
          password: '',
        }); // Clear form data
      } else {
        setError(data.message || 'Something went wrong, please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false); // Remove loading state
    }
  };

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="pb-12 text-center">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Create an account
            </h1>
          </div>

          {/* Contact form */}
          <form onSubmit={handleSubmit} className="mx-auto max-w-[400px]">
            <div className="space-y-5">
              <div>
                <label className="mb-1 block text-sm font-medium text-indigo-200/65" htmlFor="name">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-input w-full"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-indigo-200/65" htmlFor="organization">
                  Organization Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="organization"
                  name="organization"
                  type="text"
                  className="form-input w-full"
                  placeholder="Your organization name"
                  value={formData.organization}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-indigo-200/65" htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-input w-full"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-indigo-200/65" htmlFor="password">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="form-input w-full"
                  placeholder="Password (at least 10 characters)"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Display success or error messages */}
            {error && <p className="mt-3 text-red-500">{error}</p>}
            {successMessage && <p className=" mt-3 inline-flex bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">{successMessage}</p>}
           
            <div className="mt-6 space-y-5">
              <button
                type="submit"
                disabled={isSubmitting}
                className={` btn w-full bg-gradient-to-t from-indigo-600 to-indigo-500 text-white ${
                  isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'btn w-full bg-gradient-to-t from-indigo-600 to-indigo-500 text-white'
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
                    Signing Up...
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>
            </div>
          </form>

          {/* Bottom link */}
          <div className="mt-6 text-center text-sm text-indigo-200/65">
            Already have an account?{" "}
            <Link className="font-medium text-indigo-500" href="/signin">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
