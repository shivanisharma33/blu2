import HarperMap from "./HarperMap";
import { SectionHead } from "../ui/primitives";
import { analogues } from "@/lib/content";

export default function Opportunity() {
  return (
    <section id="opportunity" className="section section--white opportunity" aria-labelledby="opp-title">
      <div className="container">
        <SectionHead
          eyebrow="The Harper Basin · Offshore Liberia"
          id="opp-title"
          title="Positioned in a World-Class Exploration Frontier."
          intro={
            <p className="lead">
              The Harper basin contains a Cretaceous deepwater fan play. It shares the same source rocks and depositional environment
              as the Stabroek Block in Guyana, on the conjugate margin.
            </p>
          }
        />

        <div className="opportunity__stage">
          <HarperMap />
        </div>

        <div className="grid opportunity__explain">
          <div className="opportunity__col" data-reveal>
            <h3 className="h4">The basin floor fan play</h3>
            <p>
              Basin floor fans are sand bodies carried down the continental slope by deepwater sediment flows and laid down on the
              basin floor. Where they are charged by a mature source rock and sealed, they can form stratigraphic reservoirs. High
              success rates in these plays have sparked an exploration boom along the West African Margin.
            </p>
          </div>
          <div className="opportunity__col" data-reveal>
            <h3 className="h4">What the 3D seismic shows</h3>
            <p>
              Interpretation of 6,167 km² of 3D seismic has identified seven Cretaceous fan systems at Cenomanian and Turonian levels.
              Six of them, all in Blocks LB-30 and LB-31, carry independently certified prospective resource potential. An assessment
              of LB-26 is underway.
            </p>
          </div>
          <div className="opportunity__col" data-reveal>
            <h3 className="h4">Why the scale matters</h3>
            <p>
              A 1 billion boe recoverable discovery in the Harper basin would rank among offshore Africa&apos;s top 5% by volume in the
              past decade (Westwood, 2024). The prospects lie approximately 50 km from shore.
            </p>
          </div>
        </div>

        <div className="analogues" data-reveal>
          <p className="eyebrow">Regional analogues cited by the company</p>
          <ul>
            {analogues.map((a) => (
              <li key={a.name}>
                <span className="analogues__name">{a.name}</span>
                <span className="analogues__where">{a.where}</span>
                <span className="analogues__size">{a.size}</span>
              </li>
            ))}
          </ul>
          <p className="fineprint">
            Analogues are third-party discoveries shown for geological context only. They are not indicative of volumes on
            BluEnergies&apos; blocks. boe = barrels of oil equivalent.
          </p>
        </div>
      </div>
    </section>
  );
}
