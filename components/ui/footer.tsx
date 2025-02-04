import Logo from "./logo";
import Image from "next/image";
import FooterIllustration from "@/public/images/footer-illustration.svg";

export default function Footer() {
  return (
    <footer>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Footer illustration */}
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -translate-x-1/2"
          aria-hidden="true"
        >
          <Image
            className="max-w-none"
            src={FooterIllustration}
            width={1076}
            height={378}
            alt="Footer illustration"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 py-8 md:flex-row md:justify-between md:py-12">
  <div className="text-center md:text-left">
    <p className="text-sm text-indigo-200/65">
      <Logo /> © NodSync
      <span className="text-gray-700"> · </span>
      2025
    </p>
  </div>
  <div>
    <ul className="flex items-center gap-4">
      <li>
        <a
          className="flex items-center justify-center text-indigo-500 transition hover:text-indigo-400"
          href="https://www.instagram.com/nodsync/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <svg
            className="h-8 w-8 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13 2.163c3.204 0 3.584.012 4.849.07 1.17.056 1.98.246 2.689.528a5.376 5.376 0 0 1 1.953 1.257 5.375 5.375 0 0 1 1.257 1.953c.282.709.472 1.519.528 2.689.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.056 1.17-.246 1.98-.528 2.689a5.376 5.376 0 0 1-1.257 1.953 5.375 5.375 0 0 1-1.953 1.257c-.709.282-1.519.472-2.689.528-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.17-.056-1.98-.246-2.689-.528a5.376 5.376 0 0 1-1.953-1.257 5.375 5.375 0 0 1-1.257-1.953c-.282-.709-.472-1.519-.528-2.689C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.849c.056-1.17.246-1.98.528-2.689A5.376 5.376 0 0 1 4.018 2.509 5.375 5.375 0 0 1 5.971 1.252c.709-.282 1.519-.472 2.689-.528C8.416 2.175 8.796 2.163 12 2.163zm0 1.837c-3.168 0-3.543.012-4.796.07-1.044.051-1.608.218-1.985.364a3.99 3.99 0 0 0-1.466.947 3.99 3.99 0 0 0-.947 1.466c-.146.377-.313.941-.364 1.985-.058 1.253-.07 1.628-.07 4.796s.012 3.543.07 4.796c.051 1.044.218 1.608.364 1.985.218.555.497.99.947 1.466a3.99 3.99 0 0 0 1.466.947c.377.146.941.313 1.985.364 1.253.058 1.628.07 4.796.07s3.543-.012 4.796-.07c1.044-.051 1.608-.218 1.985-.364a3.99 3.99 0 0 0 1.466-.947 3.99 3.99 0 0 0 .947-1.466c.146-.377.313-.941.364-1.985.058-1.253.07-1.628.07-4.796s-.012-3.543-.07-4.796c-.051-1.044-.218-1.608-.364-1.985a3.99 3.99 0 0 0-.947-1.466 3.99 3.99 0 0 0-1.466-.947c-.377-.146-.941-.313-1.985-.364-1.253-.058-1.628-.07-4.796-.07zm0 3.513a5.325 5.325 0 1 1 0 10.65 5.325 5.325 0 0 1 0-10.65zm0 8.762a3.437 3.437 0 1 0 0-6.875 3.437 3.437 0 0 0 0 6.875zm6.406-8.885a1.248 1.248 0 1 1 2.496 0 1.248 1.248 0 0 1-2.496 0z" />
          </svg>
        </a>
      </li>
    </ul>
  </div>
</div>

      </div>
    </footer>
  );
}
