// ============================================================================
// MASTHEAD — front-page nameplate + lead story + "In This Edition" box.
// ============================================================================
import React from "react";
import { lastUpdated } from "@/lib/data";

const CONTENTS: { no: string; label: string }[] = [
  { no: "01", label: "The Protein Comparison Ledger" },
  { no: "02", label: "Bioavailability — Eaten vs. Usable" },
  { no: "03", label: "The Soy Verdict" },
  { no: "04", label: "The Cost Crisis" },
  { no: "05", label: "Requirement Calculator" },
  { no: "06", label: "Personal Planner" },
  { no: "07", label: "Meal Builder" },
  { no: "08", label: "Verified Products" },
  { no: "09", label: "The Supplement Verdict" },
  { no: "10", label: "The Brief — Your AI Prompt" },
  { no: "11", label: "Sources & Method" },
];

export default function Masthead() {
  return (
    <section className="section" id="top" style={{ paddingTop: 40 }}>
      <div className="container">
        {/* ---- Nameplate rule + edition line ---- */}
        <div
          className="flex between items-center meta"
          style={{ borderBottom: "var(--rule)", paddingBottom: 8 }}
        >
          <span>Vol. I</span>
          <span className="nowrap">Evidence-Based Edition</span>
          <span className="nowrap">Price: Free</span>
        </div>

        <h1 className="headline center" style={{ margin: "18px 0 10px" }}>
          THE DAILY SCOOP
        </h1>

        <div
          className="flex between items-center meta"
          style={{
            borderTop: "var(--rule-4)",
            borderBottom: "var(--rule)",
            padding: "8px 0",
          }}
        >
          <span className="nowrap">Updated {lastUpdated}</span>
          <span
            className="nowrap center"
            style={{ letterSpacing: "0.2em", fontWeight: 600 }}
          >
            DIAAS · Cost · Verified Supply
          </span>
          <span className="nowrap">India Desk</span>
        </div>

        {/* ---- Lead story grid ---- */}
        <div className="grid grid-12 mt-24">
          {/* Lead article */}
          <article className="col-span-8">
            <span className="kicker">Lead Report</span>
            <h2 className="section-title" style={{ marginTop: 10 }}>
              Whey Quadrupled. The Body Doesn&rsquo;t Care Where Protein Comes
              From.
            </h2>
            <p className="deck mb-16" style={{ marginTop: 8 }}>
              A price shock has broken the whey habit. The science says the swap
              was never a sacrifice — quality is a number, and you can buy it for
              a fraction of the cost.
            </p>
            <hr className="rule" />
            <div className="columns-2">
              <p className="dropcap">
                For a decade the fitness aisle told a single story: whey, and
                only whey. Then the price of imported whey ran to roughly four
                times its 2024 level, and the story fell apart. What replaced it
                is not a compromise but a measurement. Protein quality is now
                scored — the FAO&rsquo;s DIAAS ranks how much of what you eat your
                body can actually build with.
              </p>
              <p>
                On that scale the surprise is soy protein isolate: the only
                single plant protein that is both complete and scores PDCAAS
                1.0, at a DIAAS near 0.90 — for a fraction of whey&rsquo;s rupee
                cost per usable gram. Whey still wins on speed and leucine; it no
                longer wins on value.
              </p>
              <p>
                This edition lays out the full ledger: every source scored side
                by side, the true cost per usable gram, a soy verdict grounded
                only in the data, a personal requirement calculator, and a
                verified-products list restricted to batches that passed
                independent lab testing. Read the numbers. Then decide.
              </p>
            </div>
          </article>

          {/* In this edition */}
          <aside className="col-span-4">
            <div className="box">
              <div className="box-label">In This Edition</div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {CONTENTS.map((c) => (
                  <li
                    key={c.no}
                    className="flex gap-12"
                    style={{
                      padding: "7px 0",
                      borderBottom: "var(--hair)",
                      alignItems: "baseline",
                    }}
                  >
                    <span className="num muted" style={{ fontSize: 12 }}>
                      {c.no}
                    </span>
                    <span style={{ fontSize: 14, lineHeight: 1.3 }}>
                      {c.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-2 mt-16" style={{ gap: 16 }}>
              <div className="stat">
                <div className="stat__value num">0.90</div>
                <div className="stat__label">Soy Isolate DIAAS</div>
              </div>
              <div className="stat">
                <div className="stat__value num">&asymp;4&times;</div>
                <div className="stat__label">Whey Price vs 2024</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
