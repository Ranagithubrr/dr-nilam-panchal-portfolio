import HomeSidebar from "@/components/HomeSidebar";
import { getCachedSiteContent } from "@/lib/siteContent";
import { getCachedPageContent } from "@/lib/pageContent";
import type { PageSlug } from "@/lib/pages";

type PageContentViewProps = {
  slug: string;
  title: string;
};

const PageContentView = async ({ slug }: PageContentViewProps) => {
  const [siteContent, pageContent] = await Promise.all([
    getCachedSiteContent(),
    getCachedPageContent(slug as PageSlug),
  ]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f6f1e7_0%,#f3ede1_35%,#ebe4d6_65%,#e2d9c7_100%)]">
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="pt-8 grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          <HomeSidebar content={siteContent} variant="compact" />
          <main className="space-y-8">
            <section className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur">
              <div
                className="content-body space-y-4 text-sm leading-relaxed text-[#4c5f66] [&_p]:mb-4 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:font-semibold"
                dangerouslySetInnerHTML={{ __html: pageContent.html }}
              />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PageContentView;
