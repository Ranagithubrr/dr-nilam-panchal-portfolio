"use client";

import dynamic from "next/dynamic";
import type { SiteContent } from "@/lib/siteContent";

const ReactPlayer = dynamic(() => import("react-player/lazy"), {
  ssr: false,
});

type HomeMainContentProps = {
  content: SiteContent;
};

const HomeMainContent = ({ content }: HomeMainContentProps) => {
  return (
    <main className="space-y-8">
      <section className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur">
        <div className="aspect-video overflow-hidden rounded-2xl border border-white/80 bg-black/90">
          <ReactPlayer
            url={content.videoUrl}
            width="100%"
            height="100%"
            controls
          />
        </div>
      </section>

      <section className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur">
        <h2 className="text-2xl font-semibold text-[#17323D]">
          {content.name}
        </h2>
        <p className="mt-2 text-sm font-semibold text-[#7A4C2C]">
          {content.degrees}
        </p>
        <p className="mt-3 text-sm text-[#4c5f66]">
          {content.specialization}
        </p>
        <div className="mt-4 space-y-2 text-sm text-[#4c5f66]">
          <p className="font-semibold text-[#17323D]">Title:</p>
          {content.titleLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="mt-5 text-sm leading-relaxed text-[#4c5f66]">
          <div
            className="space-y-4 [&_p]:mb-4 [&_p:last-child]:mb-0"
            dangerouslySetInnerHTML={{ __html: content.bioHtml }}
          />
        </div>
      </section>
    </main>
  );
};

export default HomeMainContent;
