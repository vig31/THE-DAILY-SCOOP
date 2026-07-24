// ============================================================================
// SOY SPOTLIGHT — long-form editorial feature. Static.
// All claims grounded strictly in lib/data.ts (soy-isolate notes + fields).
// ============================================================================
import React from "react";

export default function SoySpotlight() {
  return (
    <section className="section" id="soy">
      <div className="container">
        <div className="sec-head">
          <div>
            <span className="kicker">Section 03 — Feature</span>
            <h2 className="section-title">The Soy Verdict</h2>
            <p className="deck">
              The value winner nobody in the fitness aisle wanted to talk about.
            </p>
          </div>
          <span className="idx">No. 03 / Feature</span>
        </div>

        <div className="columns-3">
          <p className="dropcap">
            Soy protein isolate occupies a strange position: it is the single
            most efficient high-quality protein per rupee on the market, and it
            spent a decade being dismissed. The chemistry is not ambiguous. Among
            plant proteins, soy isolate is the only one that is both fully
            complete — supplying all nine essential amino acids in adequate ratio
            — and scores PDCAAS 1.0, the ceiling of the older quality scale.
          </p>
          <p>
            On the stricter modern scale it reaches a DIAAS near 0.90 (the
            literature ranges from about 0.84 to 0.98). That places it just below
            dairy and egg, and comfortably above pea, rice and hemp as a
            standalone protein. It manages this at a protein density of 90 g per
            100 g and 95% digestibility — numbers that read like an animal
            protein.
          </p>
          <p>
            Its one honest weakness is methionine, a sulfur amino acid that sits
            at the borderline of adequacy. This is why soy is scored as
            &ldquo;complete but methionine-limited&rdquo; rather than flawless.
            In practice, a mixed diet supplies methionine from grains, dairy and
            other sources, and the shortfall closes without effort.
          </p>
          <p>
            The isoflavone question deserves a direct answer. Soy contains plant
            isoflavones, and the folk claim is that they lower testosterone. The
            weight of the evidence — pooled meta-analyses — does not support this
            at normal intakes. Soy isolate does not lower testosterone when eaten
            in the amounts a person actually uses as a protein supplement.
          </p>
        </div>

        <div className="box--ink mt-32" style={{ padding: "28px 26px" }}>
          <span className="kicker">Pull Quote</span>
          <p
            className="headline--sm"
            style={{ margin: "10px 0 0", lineHeight: 1.15 }}
          >
            &ldquo;The only single plant protein that is both complete and
            PDCAAS 1.0 — and it happens to be the cheapest high-quality protein
            per usable gram.&rdquo;
          </p>
        </div>

        <div className="columns-2 mt-32">
          <p>
            How does it sit against whey? Whey wins on two axes: it is faster to
            absorb and richer in leucine (about 11% of protein versus soy&rsquo;s
            8%), the amino acid that flips the switch on muscle protein
            synthesis. For a single post-workout dose aimed at maximal acute
            response, whey remains the sharper tool. Across a whole day of
            protein intake, that edge shrinks — and soy&rsquo;s intermediate
            absorption speed is a feature, not a flaw, for sustained coverage.
          </p>
          <p>
            Against pea protein — the other plant favourite — soy is simply more
            complete on its own. Pea is high in lysine and BCAAs but limited in
            the sulfur amino acids, and it needs to be paired with rice protein
            to reach an animal-like profile. Soy isolate needs no partner to be
            complete. That self-sufficiency, plus a bulk cost near ₹900/kg, is
            what makes it the highest quality-per-rupee protein in this ledger.
          </p>
        </div>

        <div className="box mt-32">
          <div className="box-label">Bottom Line</div>
          <p style={{ marginBottom: 0 }}>
            If you want maximal acute muscle response from a single serving and
            cost is no object, whey still edges it. For everyone weighing quality
            against price — and especially anyone eating plant-first — soy protein
            isolate is the rational default: complete, PDCAAS 1.0, DIAAS ~0.90,
            and dramatically cheaper per usable gram. The methionine caveat is
            real but minor; the testosterone worry is not supported by the
            evidence.
          </p>
        </div>
      </div>
    </section>
  );
}
