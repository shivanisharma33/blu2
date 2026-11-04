import Image from "next/image";
import { SectionHead, Button } from "../ui/primitives";
import { licence, gulfAsset, routes } from "@/lib/content";
import AssetMetrics from "./AssetMetrics";

type Asset = {
  id: string;
  image: string;
  imageAlt: string;
  imageFit: "cover" | "contain";
  region: string;
  name: string;
  body: string;
  facts: [string, string][];
  status: string;
  link: { label: string; href: string };
};

const assets: Asset[] = [
  {
    id: "rl-003",
    image: "/images/rl-003-licence-map.png",
    imageAlt: "Official RL-003 licence map showing Blocks LB-26, LB-30 and LB-31 offshore Liberia",
    imageFit: "cover",
    region: "Harper basin · offshore Liberia",
    name: "Reconnaissance Licence RL-003",
    body:
      "Deepwater Blocks LB-26, LB-30 and LB-31, covering about 40% of the Harper basin. The licence was issued by the Liberia Petroleum Regulatory Authority, and BluEnergies holds it with TotalEnergies.",
    facts: [
      ["Area", `${licence.areaKm2.toLocaleString("en-US")} km² · ${licence.areaAcres}`],
      ["Interest", `BLU ${licence.bluInterest}% · TotalEnergies ${licence.partnerInterest}%`],
      ["3D seismic", `${licence.seismicKm2.toLocaleString("en-US")} km²`],
      ["Term", licence.term],
    ],
    status: "July 6, 2026 update: work programme on schedule, seismic reprocessing over 50% complete and sea-bottom survey acquisition under way.",
    link: { label: "Assets & operations overview", href: routes.overview },
  },
  {
    id: "ss-59",
    image: "/images/coastline-aerial.jpg",
    imageAlt: "Aerial view of shallow coastal water",
    imageFit: "cover",
    region: gulfAsset.region,
    name: gulfAsset.name,
    body:
      "A shallow-water lease block covering approximately 50% of the Crown Royal prospect. The company describes the addition as pairing shallow-water, low-risk drilling opportunities with its high-impact deepwater upside.",
    facts: [
      ["Area", `${gulfAsset.area} · ${gulfAsset.term}`],
      ["Interest", `${gulfAsset.interest}% working interest`],
      ["Water depth", gulfAsset.waterDepth],
      ["Prospect", gulfAsset.prospect],
    ],
    status: gulfAsset.status,
    link: { label: "Read the release", href: gulfAsset.href },
  },
];

export default function Assets() {
  return (
    <section id="assets" className="section assets" aria-labelledby="assets-title">
      <div className="container">
        <SectionHead
          eyebrow="Assets & Operations"
          id="assets-title"
          title="A Focused Exploration Portfolio."
          intro={
            <p className="lead">
              A high-impact deepwater licence in partnership with TotalEnergies, complemented by a shallow-water lease position in the
              Gulf of America.
            </p>
          }
        />

        <div className="asset-grid">
          {assets.map((a) => (
            <article key={a.id} className="asset-card" data-reveal>
              <div className="asset-card__media">
                <Image src={a.image} alt={a.imageAlt} fill sizes="(max-width: 900px) 100vw, 640px" style={{ objectFit: a.imageFit }} />
              </div>
              <div className="asset-card__body">
                <p className="eyebrow">{a.region}</p>
                <h3 className="h3">{a.name}</h3>
                <p>{a.body}</p>
                <dl className="asset-card__facts">
                  {a.facts.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="asset-card__status">{a.status}</p>
                <Button href={a.link.href} variant="link">{a.link.label}</Button>
              </div>
            </article>
          ))}
        </div>

        {/* Interactive Asset Telemetry & Metrics Suite */}
        <AssetMetrics />
      </div>
    </section>
  );
}
