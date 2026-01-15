"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { PageItem } from "@/lib/pageItems";
import type { PageSlug } from "@/lib/pages";
import type { SiteContent } from "@/lib/siteContentTypes";
import LoadingSpinner from "@/components/LoadingSpinner";
import PageItemsLayout from "@/components/content/PageItemsLayout";

const itemsCache = new Map<string, PageItem[]>();
let siteContentCache: SiteContent | null = null;

type PageItemsClientProps = {
  slug: PageSlug;
  title: string;
};

const PageItemsClient = ({ slug, title }: PageItemsClientProps) => {
  const searchParams = useSearchParams();
  const [items, setItems] = useState<PageItem[] | null>(
    () => itemsCache.get(slug) ?? null
  );
  const [siteContent, setSiteContent] = useState<SiteContent | null>(
    () => siteContentCache
  );
  const [isLoadingItems, setIsLoadingItems] = useState(!items);
  const [isLoadingContent, setIsLoadingContent] = useState(!siteContent);

  useEffect(() => {
    if (siteContentCache) {
      setSiteContent(siteContentCache);
      setIsLoadingContent(false);
      return;
    }

    let isActive = true;
    const load = async () => {
      try {
        const response = await fetch("/api/content");
        if (!response.ok) return;
        const data = (await response.json()) as SiteContent;
        if (!isActive) return;
        siteContentCache = data;
        setSiteContent(data);
      } finally {
        if (isActive) {
          setIsLoadingContent(false);
        }
      }
    };
    load();
    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    const cached = itemsCache.get(slug);
    if (cached) {
      setItems(cached);
      setIsLoadingItems(false);
      return;
    }

    let isActive = true;
    const load = async () => {
      try {
        const response = await fetch(`/api/items/${slug}`);
        if (!response.ok) return;
        const data = (await response.json()) as { items?: PageItem[] };
        if (!isActive) return;
        const resolved = data.items ?? [];
        itemsCache.set(slug, resolved);
        setItems(resolved);
      } finally {
        if (isActive) {
          setIsLoadingItems(false);
        }
      }
    };
    load();
    return () => {
      isActive = false;
    };
  }, [slug]);

  const isLoading = isLoadingItems || isLoadingContent;

  const paginationState = useMemo(() => {
    const pageSize = 5;
    const allItems = items ?? [];
    const totalItems = allItems.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const requestedPage = Number(searchParams.get("page")) || 1;
    const currentPage = Math.min(Math.max(requestedPage, 1), totalPages);
    const startIndex = (currentPage - 1) * pageSize;
    const pagedItems = allItems.slice(startIndex, startIndex + pageSize);
    return { pagedItems, totalItems, totalPages, currentPage };
  }, [items, searchParams]);

  if (isLoading || !siteContent) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,#f6f1e7_0%,#f3ede1_35%,#ebe4d6_65%,#e2d9c7_100%)]">
        <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4">
          <div className="rounded-3xl border border-white/70 bg-white/90 px-6 py-4 shadow-xl backdrop-blur">
            <LoadingSpinner />
          </div>
        </div>
      </div>
    );
  }

  return (
    <PageItemsLayout
      slug={slug}
      title={title}
      items={paginationState.pagedItems}
      currentPage={paginationState.currentPage}
      totalPages={paginationState.totalPages}
      totalItems={paginationState.totalItems}
      siteContent={siteContent}
    />
  );
};

export default PageItemsClient;
