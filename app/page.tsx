import { ProfileProvider } from "@/lib/store";
import { lastUpdated } from "@/lib/data";
import Nav from "@/components/Nav";
import Masthead from "@/components/Masthead";
import ProteinComparison from "@/components/ProteinComparison";
import Bioavailability from "@/components/Bioavailability";
import SoySpotlight from "@/components/SoySpotlight";
import CostAnalysis from "@/components/CostAnalysis";
import BmiProtein from "@/components/BmiProtein";
import GoalPlanner from "@/components/GoalPlanner";
import MealPlanner from "@/components/MealPlanner";
import TrustifiedProducts from "@/components/TrustifiedProducts";
import SupplementGuide from "@/components/SupplementGuide";
import AiPrompt from "@/components/AiPrompt";
import References from "@/components/References";

export default function Page() {
  return (
    <ProfileProvider>
      <Nav />
      <main id="top">
        <Masthead />
        <ProteinComparison />
        <Bioavailability />
        <SoySpotlight />
        <CostAnalysis />
        <BmiProtein />
        <GoalPlanner />
        <MealPlanner />
        <TrustifiedProducts />
        <SupplementGuide />
        <AiPrompt />
        <References />
      </main>
      <footer className="section section--band" style={{ borderTop: "4px solid var(--ink)" }}>
        <div className="container center">
          <div className="kicker">The Daily Scoop</div>
          <p className="headline--sm" style={{ marginTop: 12 }}>
            One page. Everything you need to run your protein, supplements &amp; plate.
          </p>
          <hr className="rule" />
          <p className="footnote">
            Evidence-based edition · Updated {lastUpdated} · Educational use only — not medical advice.
            Product recommendations reflect the Trustified pass list; re-verify the current batch before buying.
          </p>
        </div>
      </footer>
    </ProfileProvider>
  );
}
