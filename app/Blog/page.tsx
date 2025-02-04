export const metadata = {
  title: "Blog - NodSync",
  description: "Blogs",
};

import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    image: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*7yRGIPGoeeKDjMF9r19r2g.jpeg",
    category: "AI Content",
    title: "Believe it or Not: AI can’t steal your food but it can…",
    authorImage: "/images/Mohamed Fazil.jpg",
    author: "Fazil M",
    role: " AI Developer",
    link: "https://medium.com/@mfazil2409/believe-it-or-not-ai-cant-steal-your-food-but-it-can-e907c6a2ae3f",
  },
  {
    id: 2,
    image: "https://miro.medium.com/v2/resize:fit:2000/format:webp/1*MZqFvIKFpwb7pXmRIy-0Gg.png",
    category: "AI Content",
    title: "From Data to Deployment: Sentiment Analysis of Financial News.",
    authorImage: "/images/Mohamed Fazil.jpg",
    author: "Fazil M",
    role: "AI Developer",
    link: "https://medium.com/@mfazil2409/from-data-to-deployment-sentiment-analysis-of-financial-news-780169e85b20",
  },
  {
    id: 3,
    image: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*5t0zYC0oWGmfotrlNHlpYQ.jpeg",
    category: "AI Content",
    title: "Why did AI lie to me?",
    authorImage: "/images/Mohamed Fazil.jpg",
    author: "Fazil M",
    role: "AI Developer",
    link: "https://medium.com/@mfazil2409/why-did-ai-lie-to-me-74e442ace482",
  },
  {
    id: 4,
    image: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*Udz6YnGrUtr926yL3CZj0Q.png",
    category: "AI Content",
    title: "Build and Blog Marathon: Building a UPSC Preparation Assistant with Generative AI",
    authorImage: "/images/Mohamed Fazil.jpg",
    author: "Fazil M",
    role: "AI Developer",
    link: "https://medium.com/google-cloud/build-and-blog-marathon-building-a-upsc-preparation-assistant-with-generative-ai-8b28602befea",
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
            <p className="text-2xl text-indigo-200/65">Discover the latest news, tips and user research insights from NODSYNC.</p>
          </div>

          {/* Card Grid */}
          <div className="grid gap-8 md:grid-cols-3">
            {blogPosts.map((post) => (
              <Link key={post.id} href={post.link ?? "#"} passHref target="_blank" rel="noopener noreferrer">
              <div key={post.id} className="cursor-pointer rounded-lg p-5 shadow-lg transition-transform transform hover:scale-105">
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
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
