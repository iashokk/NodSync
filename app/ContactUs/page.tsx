export const metadata = {
  title: "Contact Us - NodSync",
  description: "Contact Us",
};

import Link from "next/link";

export default function ContactUs() {
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
            <p className="text-xl text-indigo-200/65">Need guidance for your projects, competitions, or placements? Let’s connect! Tell us what you need, and we’ll reach out to help you sync smarter!</p>
          </div>

          {/* Contact Form */}
          <form className="mx-auto max-w-4xl space-y-6 p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-200">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  className="mt-1 w-full rounded-md border-gray-700 bg-gray-900 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="surname" className="block text-sm font-medium text-gray-200">
                  Surname
                </label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  placeholder="Your surname"
                  className="mt-1 w-full rounded-md border-gray-700 bg-gray-900 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  className="mt-1 w-full rounded-md border-gray-700 bg-gray-900 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-200">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  className="mt-1 w-full rounded-md border-gray-700 bg-gray-900 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select a country</option>
                  <option value="US">Pondicherry</option>
                  <option value="IN">Chennai</option>
                  <option value="UK">TamilNadu</option>
                  <option value="UK">Bengaluru</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>

            <div>
  <label htmlFor="topic" className="block text-sm font-medium text-gray-200">
    Topic
  </label>
  <select
    id="topic"
    name="topic"
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


            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-200">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Let us know how we can help"
                className="mt-1 w-full rounded-md border-gray-700 bg-gray-900 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-200">
                Full Description
              </label>
              <textarea
                id="description"
                name="description"
                
                placeholder="Include as much detail as you can"
                className="mt-1 w-full rounded-md border-gray-700 bg-gray-900 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="mt-4 w-full rounded-md bg-indigo-600 px-6 py-3 text-white shadow-lg hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-300"
              >
                Send →
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
