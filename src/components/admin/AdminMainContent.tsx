"use client";

import dynamic from "next/dynamic";
import type { SiteContent } from "@/lib/siteContent";
import RichTextEditor from "@/components/admin/RichTextEditor";

const ReactPlayer = dynamic(() => import("react-player/lazy"), {
  ssr: false,
});

type AdminMainContentProps = {
  content: SiteContent;
  onChange: (next: SiteContent) => void;
};

const AdminMainContent = ({ content, onChange }: AdminMainContentProps) => {
  return (
    <main className="space-y-8">
      <section className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur">
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7A4C2C]">
          Intro Video URL
        </label>
        <input
          type="text"
          value={content.videoUrl}
          onChange={(event) =>
            onChange({ ...content, videoUrl: event.target.value })
          }
          className="mt-2 w-full rounded-full border border-white/70 bg-white/90 px-4 py-2 text-sm text-[#2d3b41] outline-none"
        />
        <div className="mt-4 aspect-video overflow-hidden rounded-2xl border border-white/80 bg-black/90">
          <ReactPlayer
            url={content.videoUrl}
            width="100%"
            height="100%"
            controls
          />
        </div>
      </section>

      <section className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7A4C2C]">
              Name
            </label>
            <input
              type="text"
              value={content.name}
              onChange={(event) =>
                onChange({ ...content, name: event.target.value })
              }
              className="mt-2 w-full rounded-full border border-white/70 bg-white/90 px-4 py-2 text-sm text-[#2d3b41] outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7A4C2C]">
              Degrees
            </label>
            <input
              type="text"
              value={content.degrees}
              onChange={(event) =>
                onChange({ ...content, degrees: event.target.value })
              }
              className="mt-2 w-full rounded-full border border-white/70 bg-white/90 px-4 py-2 text-sm text-[#2d3b41] outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7A4C2C]">
              Specialization
            </label>
            <input
              type="text"
              value={content.specialization}
              onChange={(event) =>
                onChange({ ...content, specialization: event.target.value })
              }
              className="mt-2 w-full rounded-full border border-white/70 bg-white/90 px-4 py-2 text-sm text-[#2d3b41] outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7A4C2C]">
              Title Lines (one per line)
            </label>
            <textarea
              value={content.titleLines.join("\n")}
              onChange={(event) =>
                onChange({
                  ...content,
                  titleLines: event.target.value.split("\n").filter(Boolean),
                })
              }
              rows={4}
              className="mt-2 w-full rounded-2xl border border-white/70 bg-white/90 px-4 py-3 text-sm text-[#2d3b41] outline-none"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7A4C2C]">
            Bio
          </label>
          <div className="mt-2">
            <RichTextEditor
              value={content.bioHtml}
              onChange={(value) => onChange({ ...content, bioHtml: value })}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminMainContent;
