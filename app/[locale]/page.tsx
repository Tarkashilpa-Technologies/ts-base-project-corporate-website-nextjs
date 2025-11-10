// 'use client';

import AppCard from '@/components/AppCard/AppCard';
import AppSection from '@/components/AppSection/AppSection';
import AppLink from '@/components/AppLink/AppLink';
import Image from 'next/image';

export default function Home() {
  const spotlightCards = [
    {
      type: 'Guide',
      title: 'NTT DATA and Cisco partner to power networking for the AI era',
      backgroundImage: 'card-img-1.jpg',
    },
    {
      type: 'Service',
      title: 'Generative AI',
      backgroundImage: 'card-img-2.jpg',
    },
    {
      type: 'Article',
      title: 'Empower your workforce with AI in manufacturing operations',
      backgroundImage: 'card-img-3.jpg',
    },
    {
      type: 'Article',
      title: 'Measuring customer loyalty in the age on AI needs a fresh take on NPS',
      backgroundImage: 'card-img-4.jpg',
    },
    {
      type: 'Article',
      title: 'Honoring our planet, one action at a time',
      backgroundImage: 'card-img-5.jpg',
    },
    {
      type: 'Article',
      title: 'Setting sail for future: Agentic AI charts a new course for business',
      backgroundImage: 'card-img-6.jpg',
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-80px">
      <section className="hero-container">
        <div className="homepage-hero-image overlay-wrapper">
          <Image src={'/images/top-kv_05_sp.jpg'} alt="image" width={1500} height={840} />
        </div>
        <div className="homepage-hero-text w-100 h-100">
          <div className="content-wrapper h-100 d-flex flex-column justify-content-center align-items-start">
            <div className="mt-24px">Elevate customer experiences with NTT DATA</div>
            <AppLink
              text="Read More"
              variant="buttonLink"
              iconAfter="ArrowRight"
              className="mt-24px"
            ></AppLink>
          </div>
        </div>
      </section>

      <AppSection title="Spotlight">
        <div className="row g-5">
          {spotlightCards.map((spotlight, index) => (
            <AppCard
              type={spotlight.type}
              title={spotlight.title}
              backgroundImage={spotlight.backgroundImage}
              key={spotlight.title + index}
            ></AppCard>
          ))}
        </div>
      </AppSection>
    </main>
  );
}
