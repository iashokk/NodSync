export const metadata = {
  title: "NodSync – Expert IT Project Guidance & Mentorship",
  description: "Discover NodSync – your trusted partner for IT project guidance, full project support, and one-on-one mentorship.",
};

import PageIllustration from "@/components/page-illustration";
import Hero from "@/components/hero-home";
import Workflows from "@/components/workflows";
import Features from "@/components/features";
import Testimonials from "@/components/testimonials";
import Cta from "@/components/cta";
import Head from 'next/head';

export default function Home() {

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Final Year Project Guidance and Mentorship",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "122"
    }
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
          key="jsonld-service"
        />
      </Head>
      <PageIllustration />
      <Hero />
      <Workflows />
      <Features />
      <Testimonials />
      <Cta />
    </>
  );
}
