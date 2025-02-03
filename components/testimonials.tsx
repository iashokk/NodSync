"use client";

import { useState } from "react";
import useMasonry from "@/utils/useMasonry";
import Image, { StaticImageData } from "next/image";
import GirlImg from "@/public/images/Girl.png";
import BoyImg from "@/public/images/men.png";
const testimonials = [
  {
    img: BoyImg,
    name: "Arun",
    place: "Vellore, India",
    content:
      "I reached out to this team for guidance on our final-year project, and they did an outstanding job. They provided step-by-step support, helping us make progress every week. Thanks to their mentorship, we successfully completed our project on time. Truly grateful for their assistance!",
    categories: [1, 3, 5],
  },
  {
    img: GirlImg,
    name: "Joshitha M.",
    place: "Chennai, India",
    content:
      "The C++ class started from the basics, making it perfect for beginners. We had no prior knowledge, but everything was explained clearly and in detail. The lessons were easy to follow, and the practice exercises helped a lot. It was a great learning experience!",
    categories: [1, 3, 5],
  },
  {
    img: GirlImg,
    name: "Sherlin Kaviya",
    place: "Chennai, India",
    content:
      "Complex C++ concepts were broken down in a way that was easy to grasp. Our doubts were always answered patiently, making the learning experience comfortable and enjoyable. Thank you for the excellent guidance!",
    categories: [1, 3, 5],
  },
  {
    img: GirlImg,
    name: "Jefrina",
    place: "Pondicherry, India",
    content:
      "Their mentor was extremely helpful and patient. He guided us throughout, explained concepts clearly, and ensured we completed our project on time. No matter how many times we asked questions, he was always supportive and friendly.",
    categories: [1, 3, 5],
  },
  {
    img: BoyImg,
    name: "KamalRaj",
    place: "Vellore, India",
    content:
      "During our final-year project, we got stuck midway and contacted Ashok for help. He was incredibly friendly and guided us with clarity on what needed to be done. He not only helped us resolve technical errors but also assisted us in publishing a well-structured research paper on time. Thank you for the tremendous support!",
    categories: [1, 3, 5],
  },
  {
    img: BoyImg,
    name: "Ramachandran",
    place: "Pondicherry, India",
    content:
      "Ashok's guidance was truly inspiring. He not only supported and reviewed our stage presence, presentation, and technical aspects but also mentored us throughout a competition. Thanks to his expertise and encouragement, we secured the top position in the finals. His skills, communication, and technical knowledge were invaluable!",
    categories: [1, 3, 5],
  },
  {
    img: GirlImg,
    name: "Sudharshini M",
    place: "Chennai, India",
    content:
      "Learning became much easier with real-life examples. The explanations were clear, and overall, I was able to understand the concepts efficiently.",
    categories: [1, 3, 5],
  },
  {
    img: GirlImg,
    name: "Sanjana",
    place: "Chennai, India",
    content:
      "Team explained complex concepts with clarity. The course was well-structured, with plenty of examples that made learning effective and engaging",
    categories: [1, 3, 5],
  },
];

export default function Testimonials() {
  const masonryContainer = useMasonry();
  const [category, setCategory] = useState<number>(1);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="border-t py-12 [border-image:linear-gradient(to_right,transparent,theme(colors.slate.400/.25),transparent)1] md:py-20">
        {/* Section header */}
        <div className="mx-auto max-w-3xl pb-12 text-center">
          <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
          Empowering Success Stories
          </h2>
          <p className="text-lg text-indigo-200/65">
          Hear from those who have experienced our guidance firsthand. 
          Our friends share their journeys and how our mentorship has helped them achieve their 
          academic and professional goals.
          </p>
        </div>

        <div>
          {/* Buttons */}
         

          {/* Cards */}
          <div
            className="mx-auto grid max-w-sm items-start gap-6 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3"
            ref={masonryContainer}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group">
                <Testimonial testimonial={testimonial} category={category}>
                  {testimonial.content}
                </Testimonial>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Testimonial({
  testimonial,
  category,
  children,
}: {
  testimonial: {
    img: StaticImageData;
    name: string;
    place: string;
    content: string;
    categories: number[];
  };
  category: number;
  children: React.ReactNode;
}) {
  return (
    <article
    className={`relative rounded-2xl bg-gradient-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-5 backdrop-blur-sm transition-opacity before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] ${!testimonial.categories.includes(category) ? "opacity-30" : ""}`}
    >
      <div className="flex flex-col gap-4">
        <p className="text-indigo-200/65 before:content-['“'] after:content-['”']">
          {children}
        </p>
        <div className="flex items-center gap-3">
          <Image
            className="inline-flex shrink-0 rounded-full"
            src={testimonial.img}
            width={36}
            height={36}
            alt={testimonial.name}
          />
          <div className="text-sm font-medium text-gray-200">
            <span>{testimonial.name}</span>
            <span className="text-gray-700"> - </span>
            <a
              className="text-indigo-200/65 transition-colors hover:text-indigo-500"
              href="#0"
            >
              {testimonial.place}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}