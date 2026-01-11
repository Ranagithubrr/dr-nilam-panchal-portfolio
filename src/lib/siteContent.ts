import "server-only";

import { head, put } from "@vercel/blob";
import bannerImage from "@/assets/banner.png";
import profileImage from "@/assets/profile.jpg";

export type SiteContent = {
  bannerImageUrl: string;
  profileImageUrl: string;
  videoUrl: string;
  name: string;
  degrees: string;
  specialization: string;
  titleLines: string[];
  bioHtml: string;
};

const CONTENT_PATH = "content/site-content.json";

export const defaultSiteContent: SiteContent = {
  bannerImageUrl: bannerImage.src,
  profileImageUrl: profileImage.src,
  videoUrl: "https://www.youtube.com/watch?v=Fi-HdiBbIWc",
  name: "Prof. (Dr.) Nilam Panchal",
  degrees:
    "Ph.D. (Finance), Ph.D. (HR), M. Phil, MBA, PGDIRPM, MBA, FDPM & SFDP (IIMA)",
  specialization: "Specialization: Finance & Human Resource",
  titleLines: [
    "Professor (Management)",
    "B.K School of Business management, Gujarat university.",
    "Head, Dept. of Public Policy & Governance Gujarat university.",
  ],
  bioHtml: `
    <p><strong>Bio</strong></p>
    <p>Prof. (Dr.) Nilam Panchal serves as Professor and Head of the Department of Public Policy and Governance (DPPG), B.K. School, Gujarat University. She oversees academic programmes at DPPG including PhD, MBA, IMBA, PG Diploma, and Certificate courses. She also holds the position of Academic Coordinator for the School of International Studies and Diaspora, SAP, and DFL at Gujarat University.</p>
    <p>A distinguished academician, she has authored 150+ research papers and 45 books. She has coordinated 452 workshops/seminars and delivered 371+ expert lectures across diverse areas of Management. Prof. Panchal has developed five MOOCs on UGC SWAYAM and created 300+ e content modules for SWAYAM PRABHA (DTH Channels) in Economics, Commerce, and Management. She serves as Chief Editor of the IJMPR Journal and is on the editorial boards of Vidya and Vidyavrutt publications (GU).</p>
    <p>She has contributed to course development for PG programmes of BAOU, IGNOU, MGNCRE, and other Government of India academic initiatives. She has been awarded six research and seminar grants by ICSSR and NHRC (GOI). To date, 24 PhD scholars have completed their doctoral research under her supervision. Prof. Panchal is a Life Member of AIMA, AIMS, ISTD, NEMA, and NHRD. She has trained more than 20,000 professionals through FDPs, EDPs, MDPs, and SDPs for corporates and academic institutions. She was also invited as a Member and Presenter to the 16th Finance Commission, Government of India.</p>
  `.trim(),
};

export const getSiteContent = async (): Promise<SiteContent> => {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return defaultSiteContent;
  }

  try {
    const metadata = await head(CONTENT_PATH);
    const response = await fetch(metadata.url, { cache: "no-store" });
    if (!response.ok) {
      return defaultSiteContent;
    }
    const data = (await response.json()) as SiteContent;
    return {
      ...defaultSiteContent,
      ...data,
    };
  } catch {
    return defaultSiteContent;
  }
};

export const saveSiteContent = async (
  content: SiteContent
): Promise<SiteContent> => {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured.");
  }

  await put(CONTENT_PATH, JSON.stringify(content, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
  });

  return content;
};
