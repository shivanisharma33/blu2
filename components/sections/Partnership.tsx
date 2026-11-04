"use client";

import { useState } from "react";
import Image from "next/image";
import { Eyebrow, Button } from "../ui/primitives";
import { licence } from "@/lib/content";

type PartnerKey = "blu" | "total";

interface PartnerDetail {
  id: PartnerKey;
  name: string;
  role: string;
  share: number;
  badge: string;
  summary: string;
  points: { title: string; desc: string }[];
}

const partners: Record<PartnerKey, PartnerDetail> = {
  blu: {
    id: "blu",
    name: "BluEnergies Ltd.",
    role: "Co-Venturer & Basin Pioneer",
    share: 35,
    badge: "35% Working Interest",
    summary:
      "BluEnergies originated the Harper Basin play fairway in 2023 through regional geological screening, securing high-impact equity alongside an elite deepwater supermajor operator.",
    points: [
      {
        title: "Early First-Mover Acreage",
        desc: "Pioneered the Harper Basin fairway in 2023 before the broader industry exploration rush along the West African Equatorial Margin.",
      },
      {
        title: "High-Conviction Equity Leverage",
        desc: "35% commercial participation delivers massive upside exposure to multi-billion barrel prospectivity with capital efficiency.",
      },
      {
        title: "Public Governance & Compliance",
        desc: "Transparent dual listing (TSXV: BLU / OTCQX: BLUGF) delivering rigorous regulatory stewardship and investor alignment.",
      },
    ],
  },
  total: {
    id: "total",
    name: "TotalEnergies SE",
    role: "Lead Deepwater Operator",
    share: 65,
    badge: "65% Operator Interest",
    summary:
      "The Liberian upstream affiliate of global supermajor TotalEnergies SE acts as designated operator for Reconnaissance Licence RL-003, bringing world-class deepwater execution standards.",
    points: [
      {
        title: "Global Offshore Operational Leadership",
        desc: "Proven track record developing frontier deepwater discoveries across Africa, the Atlantic margin, and international basins.",
      },
      {
        title: "Technical Execution & Safety Governance",
        desc: "Deploys industry-leading environmental, safety, and deepwater exploration procedures for seabed coring and subsurface evaluation.",
      },
      {
        title: "Balance Sheet & Procurement Power",
        desc: "Supermajor balance sheet backing (NYSE: TTE) ensuring comprehensive operational capability and tier-1 vendor contracting.",
      },
    ],
  },
};

const commercialPathway = [
  {
    step: "01",
    tag: "Executed",
    title: "Joint Study Agreement",
    desc: "Binding joint study & application agreement entered in January 2026 covering Blocks LB-26, LB-30, and LB-31.",
  },
  {
    step: "02",
    tag: "In Progress",
    title: "Synchronized Work Programme",
    desc: "Joint commitment to an 18-month technical campaign comprising 6,167 km² 3D seismic reprocessing and seabed sampling.",
  },
  {
    step: "03",
    tag: "Next Stage",
    title: "PSC Conversion Right",
    desc: "Upon establishing drillable prospects, the joint venture holds the priority pathway to apply for Production Sharing Contracts.",
  },
  {
    step: "04",
    tag: "Protected",
    title: "100% Cost Recovery",
    desc: "All exploration expenditures committed under RL-003 are legally recoverable under subsequent Production Sharing Contracts.",
  },
];

export default function Partnership() {
  const [activePartner, setActivePartner] = useState<PartnerKey>("total");

  const current = partners[activePartner];

  return (
    <section id="partnership" className="section section--white partnership" aria-labelledby="partner-title">
      <div className="container">
        {/* Top Header */}
        <div className="partnership__head" data-reveal>
          <div className="partnership__head-lead">
            <Eyebrow>Strategic Joint Venture</Eyebrow>
            <h2 id="partner-title" className="h2">
              Partnered with Supermajor TotalEnergies Offshore Liberia.
            </h2>
          </div>
          <p className="lead partnership__head-desc">
            In January 2026, BluEnergies formalized a joint study and application agreement with the Liberian upstream
            subsidiary of TotalEnergies SE to advance exploration across the deepwater Harper Basin.
          </p>
        </div>

        {/* Interactive Co-Venturer Structure Suite */}
        <div className="partnership__suite" data-reveal>
          {/* Equity & Role Split Bar */}
          <div className="partner-bar-card">
            <div className="partner-bar-card__meta">
              <span className="partner-bar-card__label">Participating Working Interest · Licence RL-003</span>
              <span className="partner-bar-card__hint">Click a partner below to inspect their operational role</span>
            </div>

            <div className="partner-equity-track" role="tablist" aria-label="Participating Interest Switcher">
              <button
                type="button"
                role="tab"
                aria-selected={activePartner === "blu"}
                className={`partner-equity-segment partner-equity-segment--blu ${activePartner === "blu" ? "is-active" : ""}`}
                style={{ flex: licence.bluInterest }}
                onClick={() => setActivePartner("blu")}
              >
                <div className="partner-equity-segment__inner">
                  <span className="partner-equity-num">{licence.bluInterest}%</span>
                  <span className="partner-equity-name">BluEnergies Ltd.</span>
                  <span className="partner-equity-tag">Co-Venturer</span>
                </div>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activePartner === "total"}
                className={`partner-equity-segment partner-equity-segment--total ${activePartner === "total" ? "is-active" : ""}`}
                style={{ flex: licence.partnerInterest }}
                onClick={() => setActivePartner("total")}
              >
                <div className="partner-equity-segment__inner">
                  <span className="partner-equity-num">{licence.partnerInterest}%</span>
                  <span className="partner-equity-name">TotalEnergies SE</span>
                  <span className="partner-equity-tag">Operator</span>
                </div>
              </button>
            </div>
          </div>

          {/* Dynamic Partner Focus Card */}
          <div className={`partner-detail-card partner-detail-card--${activePartner}`} key={current.id}>
            <div className="partner-detail-card__header">
              <div className="partner-detail-card__identity">
                <span className="partner-detail-card__badge">{current.badge}</span>
                <h3 className="h3 partner-detail-card__title">{current.name}</h3>
                <p className="partner-detail-card__role">{current.role}</p>
              </div>
              <p className="partner-detail-card__summary">{current.summary}</p>
            </div>

            <div className="partner-detail-card__grid">
              {current.points.map((pt) => (
                <div key={pt.title} className="partner-point-card">
                  <span className="partner-point-card__bullet" />
                  <div>
                    <h4 className="h5 partner-point-card__title">{pt.title}</h4>
                    <p className="partner-point-card__desc">{pt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Commercial Pathway & Legal Governance */}
        <div className="partnership__pathway" data-reveal>
          <div className="partnership__pathway-head">
            <span className="pathway-badge">Governance &amp; Commercial Terms</span>
            <h3 className="h3 pathway-title">Licence RL-003 to Production Sharing Transition</h3>
            <p className="pathway-desc">
              A transparent regulatory and contractual roadmap under the oversight of the Liberia Petroleum Regulatory
              Authority (LPRA).
            </p>
          </div>

          <div className="pathway-grid">
            {commercialPathway.map((item) => (
              <div key={item.title} className="pathway-card">
                <div className="pathway-card__top">
                  <span className="pathway-card__tag">{item.tag}</span>
                </div>
                <h4 className="pathway-card__title">{item.title}</h4>
                <p className="pathway-card__desc">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="partnership__actions">
            <Button
              href="/news-and-media/news/totalenergies-partners-with-bluenergies-in-its-harper-basin-fan-play-offshore-liberia"
              variant="primary"
              on="light"
            >
              Read the Partnership News Release
            </Button>
            <Button href="/assets-and-operations/overview" variant="secondary" on="light">
              View RL-003 Licence Specifications
            </Button>
          </div>
        </div>

        {/* Executive Endorsement Quote Card */}
        <div className="partner-quote-card" data-reveal>
          <div className="partner-quote-card__quote-icon" aria-hidden="true">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          <p className="partner-quote-card__text">
            “The recent, hectic activity by major oil companies in securing licenses for deepwater acreage along the
            entire Africa west margin is confirmation that the early move by BluEnergies in the Harper basin (2023) was
            a valid one.”
          </p>

          <div className="partner-quote-card__author">
            <div className="partner-quote-card__avatar">
              <Image
                src="/images/team/sergio-laura.jpg"
                alt="Sergio Laura"
                width={56}
                height={56}
                className="partner-quote-card__photo"
              />
            </div>
            <div className="partner-quote-card__meta">
              <h4 className="partner-quote-card__name">Sergio Laura</h4>
              <p className="partner-quote-card__role">Vice President, Exploration · Operations Update</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
