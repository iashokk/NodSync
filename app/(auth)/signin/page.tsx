"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/authContext";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);  // Track if it's running on the client side
  const { setLoggedIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Loading state


  // Initialize router in useEffect to ensure it runs client-side
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // This will be true after the component is mounted on the client
  }, []);

  // Sign-in function
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Show loading state
try{
  const res = await fetch("/api/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

    const data = await res.json();

    if (res.ok) {
      // Only redirect if we're on the client-side
      if (isClient) {
        localStorage.setItem("user", JSON.stringify({ email }));
        // Immediately update the global auth state
        setLoggedIn(true);
        router.push("/");  // Redirect to homepage
      }
    } else {
      setError(data.message || "Something went wrong");
    } }catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false); // Remove loading state
    }
  };

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="pb-12 text-center">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Welcome back
            </h1>
          </div>

          <form className="mx-auto max-w-[400px]" onSubmit={handleSignIn}>
            <div className="space-y-5">
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-input w-full"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between gap-3">
                  <label
                    className="block text-sm font-medium text-indigo-200/65"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  {/* <Link
                    className="text-sm text-gray-600 hover:underline"
                    href="/reset-password"
                  >
                    Forgot?
                  </Link> */}
                </div>
                <input
                  id="password"
                  type="password"
                  className="form-input w-full"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Display error if any */}
            {error && (
              <div className="text-red-500 text-sm mt-2">{error}</div>
            )}

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
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-indigo-200/65">
            Don't you have an account?{" "}
            <Link className="font-medium text-indigo-500" href="/signup">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
