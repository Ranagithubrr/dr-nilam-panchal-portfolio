"use client";

import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player/lazy"), {
  ssr: false,
});

const HomeMainContent = () => {
  return (
    <main className="space-y-8">
      <section className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur">
        <div className="aspect-video overflow-hidden rounded-2xl border border-white/80 bg-black/90">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=Fi-HdiBbIWc"
            width="100%"
            height="100%"
            controls
          />
        </div>
      </section>

      <section className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur">
        <h2 className="text-2xl font-semibold text-[#17323D]">
          Prof. (Dr.) Nilam Panchal
        </h2>
        <p className="mt-2 text-sm font-semibold text-[#7A4C2C]">
          Ph.D. (Finance), Ph.D. (HR), M. Phil, MBA, PGDIRPM, MBA, FDPM &amp;
          SFDP (IIMA)
        </p>
        <p className="mt-3 text-sm text-[#4c5f66]">
          Specialization: Finance &amp; Human Resource
        </p>
        <div className="mt-4 space-y-2 text-sm text-[#4c5f66]">
          <p className="font-semibold text-[#17323D]">Title:</p>
          <p>Professor (Management)</p>
          <p>B.K School of Business management, Gujarat university.</p>
          <p>Head, Dept. of Public Policy &amp; Governance Gujarat university.</p>
        </div>
        <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#4c5f66]">
          <p className="font-semibold text-[#17323D]">Bio</p>
          <p>
            Prof. (Dr.) Nilam Panchal serves as Professor and Head of the
            Department of Public Policy and Governance (DPPG), B.K. School,
            Gujarat University. She oversees academic programmes at DPPG
            including PhD, MBA, IMBA, PG Diploma, and Certificate courses. She
            also holds the position of Academic Coordinator for the School of
            International Studies and Diaspora, SAP, and DFL at Gujarat
            University.
          </p>
          <p>
            A distinguished academician, she has authored 150+ research papers
            and 45 books. She has coordinated 452 workshops/seminars and
            delivered 371+ expert lectures across diverse areas of Management.
            Prof. Panchal has developed five MOOCs on UGC SWAYAM and created
            300+ e content modules for SWAYAM PRABHA (DTH Channels) in Economics,
            Commerce, and Management. She serves as Chief Editor of the IJMPR
            Journal and is on the editorial boards of Vidya and Vidyavrutt
            publications (GU).
          </p>
          <p>
            She has contributed to course development for PG programmes of
            BAOU, IGNOU, MGNCRE, and other Government of India academic
            initiatives. She has been awarded six research and seminar grants
            by ICSSR and NHRC (GOI). To date, 24 PhD scholars have completed
            their doctoral research under her supervision. Prof. Panchal is a
            Life Member of AIMA, AIMS, ISTD, NEMA, and NHRD. She has trained more
            than 20,000 professionals through FDPs, EDPs, MDPs, and SDPs for
            corporates and academic institutions. She was also invited as a
            Member and Presenter to the 16th Finance Commission, Government of
            India.
          </p>
        </div>
      </section>
    </main>
  );
};

export default HomeMainContent;
