"use client";

import { useState } from "react";
import Image from "next/image";
import { company } from "@/lib/content";

const VIDEO_ID = new URL(company.video).searchParams.get("v") ?? "";

/**
 * The corporate video. A static poster loads first; the YouTube player (privacy-enhanced domain)
 * is only requested when the visitor presses play.
 */
export default function VideoFeature() {
  const [playing, setPlaying] = useState(false);
  return (
    <section className="section section--navy video-feature" aria-labelledby="video-title">
      <div className="container">
        <div className="video-feature__head" data-reveal>
          <p className="eyebrow">Corporate Video</p>
          <h2 id="video-title" className="h2">The BluEnergies Corporate Video.</h2>
        </div>
        <div className="video-feature__frame" data-reveal="image">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
              title="BluEnergies corporate video"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <button className="video-feature__poster" onClick={() => setPlaying(true)} aria-label="Play the BluEnergies corporate video">
              <Image src="/images/ocean-surface.jpg" alt="" fill sizes="(max-width: 1360px) 100vw, 1320px" style={{ objectFit: "cover" }} />
              <span className="video-feature__play" aria-hidden>
                <svg width="22" height="22" viewBox="0 0 22 22"><path d="M6 3.5v15l13-7.5z" fill="currentColor" /></svg>
              </span>
              <span className="video-feature__label">Play video</span>
            </button>
          )}
        </div>
        <p className="caption caption--dark">
          Also available on{" "}
          <a href={company.video} target="_blank" rel="noopener noreferrer" className="u-link">YouTube</a>.
        </p>
      </div>
    </section>
  );
}
