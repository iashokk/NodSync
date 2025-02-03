export const metadata = {
  title: "Blog - NodSync",
  description: "Blogs",
};

import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    image: "/images/Photo4.jpg",
    category: "AI Content",
    title: "The ultimate guide to AI management in the age of new tools",
    authorImage: "/images/Photo5.1.jpg",
    author: "Ashok K",
    role: "Developer",

  },
  {
    id: 2,
    image: "/images/Photo5.jpg",
    category: "Automation",
    title: "New AI releases for better, faster, more personalized support",
    authorImage: "/images/Photo5.1.jpg",
    author: "Fazil M",
    role: "AI Developer",
  },
  {
    id: 3,
    image: "/images/Photo5.jpg",
    category: "Customer Service",
    title: "Unlocking customer strategic potential with AI",
    authorImage: "/images/Photo5.1.jpg",
    author: "Ashok K",
    role: "Developer",
  },
  {
    id: 4,
    image: "/images/Photo5.jpg",
    category: "Automation",
    title: "New AI releases for better, faster, more personalized support",
    authorImage: "/images/Photo5.1.jpg",
    author: "Fazil M",
    role: "AI Developer",
  },
  {
    id: 5,
    image: "/images/Photo5.jpg",
    category: "Customer Service",
    title: "Unlocking customer strategic potential with AI",
    authorImage: "/images/Photo5.1.jpg",
    author: "Ashok K",
    role: "Developer",
  },
];

export default function Blog() {
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
              Blogs
            </h1>
          </div>

          {/* Card Grid */}
          <div className="grid gap-8 md:grid-cols-3">
            {blogPosts.map((post) => (
              <div key={post.id} className="rounded-lg  p-5 shadow-lg">
                <img
                  src={post.image}
                  alt={post.category}
                  className="mb-5 h-48 w-full rounded-lg object-cover"
                />
                <span className="inline-flex bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent py-2 ">
                {post.category}
              </span>
                <h2 className="mb-3 text-lg font-semibold text-white">
                  {post.title}
                </h2>
                <div className="flex items-center gap-2 text-gray-400">
                  <img
                    src={post.authorImage}
                    alt={post.author}
                    className="h-8 w-8 rounded-full"
                  />
                  <span>
                    {post.author} - {post.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
