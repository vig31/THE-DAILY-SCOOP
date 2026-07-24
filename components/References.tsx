// ============================================================================
// REFERENCES — sources & method bibliography. Static.
// ============================================================================
import React from "react";
import { references, lastUpdated } from "@/lib/data";

export default function References() {
  return (
    <section className="section" id="sources">
      <div className="container">
        <div className="sec-head">
          <div>
            <span className="kicker">Section 11</span>
            <h2 className="section-title">Sources &amp; Method</h2>
            <p className="deck">
              Every figure in this edition traces to a peer-reviewed or
              institutional source. Here they are.
            </p>
          </div>
          <span className="idx">No. 11 / Method</span>
        </div>

        <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {references.map((ref, i) => (
            <li
              key={ref.id}
              className="grid grid-12"
              style={{ padding: "16px 0", borderBottom: "var(--hair)" }}
            >
              <div className="col-span-8">
                <span
                  className="num muted"
                  style={{ fontSize: 13, marginRight: 10 }}
                >
                  [{i + 1}]
                </span>
                <a href={ref.url} target="_blank" rel="noopener noreferrer">
                  {ref.title}
                </a>
                <div className="meta" style={{ marginTop: 6 }}>
                  {ref.org}
                </div>
              </div>
              <div className="col-span-4">
                <span className="box-label" style={{ display: "inline-block" }}>
                  Used For
                </span>
                <p className="small" style={{ margin: "6px 0 0" }}>
                  {ref.used}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="small muted mt-24">
          Values are representative figures drawn from these peer-reviewed and
          institutional sources; where the literature disagrees, ranges are noted
          at the point of use. Cost figures are approximate and volatile. This
          app is educational and not medical advice. Last updated {lastUpdated}.
        </p>
      </div>
    </section>
  );
}
