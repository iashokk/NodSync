export const metadata = {
  title: "About Us - NodSync",
  description: "About me",
};

import Link from "next/link";
import Image from "next/image";

export default function AboutUs() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section Header */}
          <div className="pb-12 text-center">
            <h1
              className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-5xl"
              data-aos="fade-up"
            >
              The Story Behind NodSync and Myself
            </h1>
          </div>

          {/* Overlapping Image Grid */}
          <div className="relative w-full max-w-4xl aspect-[3/2] mx-auto flex items-center justify-center">
            <Image
              src="/images/Photo4.jpg"
              alt="Team 1"
              width={400}
              height={300}
              className="absolute top-[10%] left-1/3 -translate-x-1/2 w-[50vw] sm:w-[40vw] md:w-[35vw] lg:w-[30vw] max-w-[400px] rounded-xl shadow-xl rotate-3 z-10"
            />
            <Image
              src="/images/Photo2.jpg"
              alt="Team 2"
              width={280}
              height={200}
              className="absolute top-[12%] right-[8%] w-[25vw] sm:w-[20vw] md:w-[18vw] lg:w-[15vw] max-w-[280px] rounded-xl shadow-lg rotate-3 z-20"
            />
            <Image
              src="/images/Photo1.jpg"
              alt="Workspace"
              width={250}
              height={180}
              className="absolute bottom-[12%] left-[8%] w-[30vw] sm:w-[25vw] md:w-[22vw] lg:w-[18vw] max-w-[250px] rounded-xl shadow-lg -rotate-2 z-30"
            />
            <Image
              src="/images/Photo5.jpg"
              alt="Office Pet"
              width={320}
              height={100}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[20vw] sm:w-[18vw] md:w-[15vw] lg:w-[12vw] max-w-[320px] rounded-xl shadow-md z-40"
            />
            <Image
              src="/images/Photo5.1.jpg"
              alt="Office Pet"
              width={200}
              height={100}
              className="absolute bottom-[6%] right-[8%] w-[18vw] sm:w-[16vw] md:w-[14vw] lg:w-[12vw] max-w-[200px] rounded-xl shadow-md rotate-3 z-40"
            />
          </div>

          {/* Timeline Section */}
          <div className="relative mt-12">
            <div className="border-l-2 border-indigo-300 pl-6">
              {[
                {
                  year: "2020",
                  title: "The Beginning",
                  desc: "In 2020, I entered the world of projects with no prior knowledge. I didn’t even know how to create a PPT or a document. With my friends’ support, I participated in competitions, faced repeated failures, and learned from my mistakes. Each rejection became a stepping stone.",
                },
                {
                  year: "2021",
                  title: "A Breakthrough",
                  desc: "We reached the Top 30 in a competition for the first time. Although we didn’t win, it felt like a massive achievement. Later that year, one project reached the Top 15, and another reached the finals. We continued improving and learning.",
                },
                {
                  year: "2021",
                  title: "The Seed",
                  desc: "We, a team of three friends, had the initial spark of an idea—NodSync. With nothing more than passion and curiosity, we created a simple website to start helping others and working on small projects.",
                },
                {
                  year: "2022",
                  title: "The Turning Point",
                  desc: "2022 was a game-changer. We participated in two major competitions simultaneously, pushing our limits. Our hard work paid off as we won both competitions, marking the beginning of something extraordinary.",
                },
                {
                  year: "2023 - 2024",
                  title: "Building Momentum",
                  desc: "Through word of mouth, I began interacting with more people—helping with their projects, guiding them in competitions, teaching coding languages, and so much more.",
                },
                {
                  year: "2025",
                  title: "Launching NodSync",
                  desc: "After mentoring over 20 projects and sharing knowledge with juniors, I realized the potential of creating something bigger. That’s when NodSync was born — a platform to guide students and professionals in projects, academics, and placements.",
                },
              ].map((event, index) => (
                <div key={index} className="mb-10">
                  <div className="flex items-center mb-1">
                    <div className="bg-indigo-500 w-3 h-3 rounded-full mr-3"></div>
                    <h2 className="text-lg font-semibold text-gray-200">
                      <span className="inline-flex bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                        {event.year}:
                      </span>{" "}
                      {event.title}
                    </h2>
                  </div>
                  <p className="text-gray-400">{event.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
