"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/siteConfig";
import { Partner } from "generated/prisma";

type StoryImages = {
  story_hero: string;
  story_origin: string;
  story_closing: string;
};

export default function StoryClient({
  partners,
  images,
}: {
  partners: Partner[];
  images: StoryImages;
}) {
  return (
    <main className="flex flex-col items-center pt-24 overflow-hidden">

      {/* ── HERO ── */}
      <section className="relative w-full h-[90vh] flex items-end justify-start">
        <Image
          src={images.story_hero}
          alt={`${SITE_CONFIG.name} story`}
          fill
          priority
          className="object-cover brightness-[0.45]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-4xl px-8 md:px-16 pb-20 md:pb-28 text-white"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="text-sm font-semibold tracking-widest uppercase text-brand mb-4"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold leading-tight mb-6"
          >
            Made Fresh<br />
            <span className="text-brand">For You</span>, Every Day
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.35 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed"
          >
            Good food brings people together. At {SITE_CONFIG.name}, every
            order is made in our kitchen when you place it.
          </motion.p>
        </motion.div>
      </section>

      {/* ── ORIGIN STATEMENT ── */}
      <section className="w-full max-w-6xl px-6 md:px-12 py-24 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-6"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-[#c85a1e]">
            How It Started
          </p>
          <h2 className="text-3xl md:text-4xl font-bold leading-snug">
            Born from a love of good food
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {SITE_CONFIG.name} started with a simple idea: serve {SITE_CONFIG.city}
            food we&apos;re proud of, cooked fresh and served with care.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Order online for pickup straight from our own website, or come see
            us at {SITE_CONFIG.address}.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="h-full"
        >
          <Image
            src={images.story_origin}
            alt={`${SITE_CONFIG.name} food`}
            width={800}
            height={600}
            className="rounded-3xl object-top object-cover w-full h-full aspect-4/3"
          />
        </motion.div>
      </section>

      {/* ── MEET THE OWNERS - hidden for mockup (bios/photos come from DB) ── */}
      {false && (
      <section className="w-full bg-stone-50 py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-[#c85a1e] mb-3">
              The People Behind It
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">Meet the owners</h2>
          </motion.div>

          <div className="flex flex-col gap-20">
            {partners.map((person, i) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`flex flex-col ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-12 items-start`}
              >
                {/* Photo */}
                <div className="relative shrink-0 w-full md:w-72">
                  {person.image ? (
                    <Image
                      src={person.image}
                      alt={person.name}
                      width={288}
                      height={384}
                      className="object-cover w-full aspect-3/4 rounded-3xl"
                    />
                  ) : (
                    <div
                      className="w-full aspect-3/4 rounded-3xl flex items-center justify-center text-5xl font-bold text-white"
                      style={{ background: person.accent }}
                    >
                      {person.name[0]}
                    </div>
                  )}
                  <div className="mt-5 px-1">
                    <p className="text-lg font-bold">{person.name}</p>
                    <p
                      className="text-sm font-medium mt-0.5"
                      style={{ color: person.accent }}
                    >
                      {person.role}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <div className="flex-1 space-y-5 pt-2">
                  {person.bio.map((para, j) => (
                    <p key={j} className="text-gray-600 leading-relaxed text-[15px]">
                      {para}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ── PULL QUOTE ── */}
      <section className="w-full bg-stone-900 text-white py-20 px-6 text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-2xl md:text-4xl font-bold leading-snug">
            &quot;{SITE_CONFIG.name} is more than a restaurant,
            <span className="text-brand"> it&apos;s a place to share a meal.&quot;</span>
          </p>
          <p className="mt-6 text-gray-400 text-lg leading-relaxed">
            Fresh food, made to order in {SITE_CONFIG.city}.
          </p>
        </motion.blockquote>
      </section>

      {/* ── VALUES ── */}
      <section className="w-full max-w-6xl px-6 md:px-12 py-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-[#c85a1e] mb-3">
            What We Stand For
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            The soul behind the flavor
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              icon: "🏡",
              title: "Family First",
              text: "Every plate is made the way we'd make it for our own family, with care and nothing to hide.",
            },
            {
              icon: "🍳",
              title: "Fresh Every Day",
              text: "No shortcuts. Every order is prepared fresh in our kitchen when you place it.",
            },
            {
              icon: "🤝",
              title: "Community Rooted",
              text: "We're not just serving food. We're building a space where culture, community, and connection share the same table.",
            },
          ].map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.12 }}
              className="bg-white border border-stone-200 rounded-2xl p-8 space-y-3"
            >
              <h3 className="text-xl font-semibold">{v.title}</h3>
              <p className="text-gray-500 leading-relaxed">{v.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CLOSING IMAGE + CTA ── */}
      <section className="w-full max-w-6xl px-6 md:px-12 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative rounded-3xl overflow-hidden"
        >
          <Image
            src={images.story_closing}
            alt={`${SITE_CONFIG.name} dining`}
            width={1600}
            height={700}
            className="w-full object-cover max-h-125"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-10 md:p-16 text-white max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              This Is Just the Beginning
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {SITE_CONFIG.name} is here to serve {SITE_CONFIG.city}, one plate
              at a time.
            </p>
            <a
              href="/Menu"
              className="inline-flex items-center gap-2 bg-brand text-brand-foreground font-semibold px-7 py-3 rounded-xl hover:bg-brand-dark transition-colors text-sm"
            >
              {SITE_CONFIG.menuCtaLabel}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
