import type { PageItem } from "@/lib/pageItems";
import type { PageSlug } from "@/lib/pages";
import { getCachedSiteContent } from "@/lib/siteContent";
import PageItemsLayout from "@/components/content/PageItemsLayout";

type PageItemsViewProps = {
  slug: PageSlug;
  title: string;
  items: PageItem[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
};

const PageItemsView = async ({
  slug,
  title,
  items,
  currentPage,
  totalPages,
  totalItems,
}: PageItemsViewProps) => {
  const siteContent = await getCachedSiteContent();

  return (
    <PageItemsLayout
      slug={slug}
      title={title}
      items={items}
      currentPage={currentPage}
      totalPages={totalPages}
      totalItems={totalItems}
      siteContent={siteContent}
    />
  );
};

export default PageItemsView;
