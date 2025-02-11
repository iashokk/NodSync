"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/authContext";
import { auth } from "@/libs/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  getDoc,
  deleteDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { firestore } from "@/libs/firebase";
// Import bcryptjs for client-side password comparison
import bcrypt from "bcryptjs";

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
    setError(null); // Reset any previous error

    try {
      // Try to sign in using Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Only redirect if we're on the client-side
      if (isClient) {
        // Store user information in local storage (for persistence)
        localStorage.setItem("user", JSON.stringify({ email: userCredential.user.email }));
        // Immediately update the global auth state
        setLoggedIn(true);
        router.push("/");  // Redirect to homepage
      }
    } catch (err: any) {
      // If the user is not found, attempt to migrate from old_users
      if (err.code === 'auth/user-not-found' || err.code === "auth/invalid-credential") {
        try {
          // Check in the "old_users" collection for this email (document ID is the email)
          const oldUserDocRef = doc(firestore, "old_users", email);
          const oldUserSnapshot = await getDoc(oldUserDocRef);
          if (oldUserSnapshot.exists()) {
            const oldUserData = oldUserSnapshot.data();
            // Compare the provided password with the stored hashed password
            const passwordMatch = await bcrypt.compare(password, oldUserData.password);
            if (passwordMatch) {
              // Migrate user by creating a new account in Firebase Authentication
              const migratedUserCredential = await createUserWithEmailAndPassword(auth, email, password);
              const migratedUser = migratedUserCredential.user;
              // Update the user's profile with the name from old_users
              await updateProfile(migratedUser, { displayName: oldUserData.name });
              // Create a user document in the new "users" collection in Firestore
              await setDoc(doc(firestore, "users", migratedUser.uid), {
                name: oldUserData.name,
                organization: oldUserData.organization,
                email: email,
                createdAt: serverTimestamp(),
              });
              // Delete the migrated document from "old_users" so it won't be used again
              await deleteDoc(oldUserDocRef);
              // Migration successful, log the user in and redirect
              if (isClient) {
                localStorage.setItem("user", JSON.stringify({ email: migratedUser.email }));
                setLoggedIn(true);
                router.push("/");
              }
              return; // Exit after successful migration
            } else {
              // Password did not match for the old user record
              setError("Invalid credentials. Please check your password.");
            }
          } else {
            // No old user record found, prompt user to sign up
            setError("Invalid credentials. Please check your email and password.");
  
          }
        } catch (migrationError: any) {
          setError(migrationError.message || "Error during migration. Please try again.");
        }
      } else {
        if(err.message === 'auth/too-many-requests'){
          setError("Too many request, please wait a while")
        }else{
          setError(err.message || "Something went wrong. Please try again.");
        }
      }
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
                className={`btn w-full bg-gradient-to-t from-indigo-600 to-indigo-500 text-white ${
                  isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : ''
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
