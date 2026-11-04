"use client";

import { useEffect, useRef, useState } from "react";

interface WaveRibbon3DProps {
  className?: string;
  height?: number;
}

export default function WaveRibbon3D({ className = "", height = 240 }: WaveRibbon3DProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [interactive, setInteractive] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let canvasHeight = 0;
    let time = 0;
    let isVisible = true;

    // Mouse interaction coordinates with spring lerp
    let targetMouseX = -1000;
    let targetMouseY = -1000;
    let currentMouseX = -1000;
    let currentMouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      targetMouseX = -1000;
      targetMouseY = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        targetMouseX = e.touches[0].clientX - rect.left;
        targetMouseY = e.touches[0].clientY - rect.top;
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchend", handleMouseLeave);

    // Resize handling with devicePixelRatio for Retina crispness
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      width = rect.width;
      canvasHeight = height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(canvasHeight * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${canvasHeight}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    // IntersectionObserver to pause rendering when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Number of ribbons and filaments
    const ribbonConfigs = [
      {
        phase: 0,
        amp1Ratio: 0.24,
        amp2Ratio: 0.1,
        waveLenRatio1: 0.72,
        waveLenRatio2: 0.36,
        twistFreq: 0.0032,
        twistSpeed: 0.9,
        lineCount: 36,
        ribbonWidth: 48,
        colorStart: "#38bdf8", // Sky blue
        colorMid: "#0284c7",   // Azure
        colorEnd: "#0369a1",   // Deep ocean
      },
      {
        phase: Math.PI * 0.78,
        amp1Ratio: 0.22,
        amp2Ratio: 0.12,
        waveLenRatio1: 0.68,
        waveLenRatio2: 0.42,
        twistFreq: 0.0028,
        twistSpeed: -0.75,
        lineCount: 36,
        ribbonWidth: 44,
        colorStart: "#60a5fa", // Soft cyan
        colorMid: "#2563eb",   // Cobalt
        colorEnd: "#1d4ed8",   // Deep royal blue
      },
    ];

    const render = () => {
      animId = requestAnimationFrame(render);
      if (!isVisible || width <= 0) return;

      time += 0.012 * speedMultiplier;

      // Smooth mouse lerping
      currentMouseX += (targetMouseX - currentMouseX) * 0.08;
      currentMouseY += (targetMouseY - currentMouseY) * 0.08;

      ctx.clearRect(0, 0, width, canvasHeight);

      const centerY = canvasHeight / 2;
      const stepX = 4; // Dense sampling for ultra-smooth bezier look
      const numSteps = Math.ceil(width / stepX) + 1;

      // Render each 3D twisted ribbon
      ribbonConfigs.forEach((config) => {
        const {
          phase,
          amp1Ratio,
          amp2Ratio,
          waveLenRatio1,
          waveLenRatio2,
          twistFreq,
          twistSpeed,
          lineCount,
          ribbonWidth,
          colorStart,
          colorMid,
          colorEnd,
        } = config;

        const k1 = (Math.PI * 2) / (width * waveLenRatio1);
        const k2 = (Math.PI * 2) / (width * waveLenRatio2);
        const amp1 = canvasHeight * amp1Ratio;
        const amp2 = canvasHeight * amp2Ratio;

        // Precompute spine & twist points along X
        const spineY: number[] = new Array(numSteps);
        const spineZ: number[] = new Array(numSteps);
        const twistSin: number[] = new Array(numSteps);
        const twistCos: number[] = new Array(numSteps);
        const widthMod: number[] = new Array(numSteps);

        for (let s = 0; s < numSteps; s++) {
          const x = s * stepX;

          // Main spine sine waves in 3D
          let y =
            centerY +
            amp1 * Math.sin(k1 * x - time * 1.1 + phase) +
            amp2 * Math.cos(k2 * x + time * 0.7 + phase);

          const z = 120 * Math.sin(k1 * x - time * 0.9 + phase + Math.PI / 2);

          // Mouse ripple interaction
          if (targetMouseX > -500) {
            const dx = x - currentMouseX;
            const dy = y - currentMouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 220) {
              const influence = Math.exp(-(dist * dist) / (2 * 70 * 70));
              y += Math.sin(time * 6 + dist * 0.05) * 32 * influence;
            }
          }

          const angle = x * twistFreq + time * twistSpeed + phase;
          const w = ribbonWidth * (0.8 + 0.3 * Math.sin(x * 0.003 + time * 0.6));

          spineY[s] = y;
          spineZ[s] = z;
          twistSin[s] = Math.sin(angle);
          twistCos[s] = Math.cos(angle);
          widthMod[s] = w;
        }

        // Create linear gradient across canvas for the ribbon lines
        const grad = ctx.createLinearGradient(0, 0, width, 0);
        grad.addColorStop(0, colorStart);
        grad.addColorStop(0.5, colorMid);
        grad.addColorStop(1, colorEnd);

        // Draw individual filament lines across the ribbon cross-section
        const halfCount = (lineCount - 1) / 2;
        const cameraDist = 480;

        for (let j = 0; j < lineCount; j++) {
          const u = (j - halfCount) / halfCount; // -1 to +1
          const distFromEdge = Math.abs(u); // 0 at center, 1 at edge

          // Alpha distribution: edge lines are denser & more vivid, matching reference image
          const baseAlpha = 0.12 + 0.32 * Math.pow(distFromEdge, 1.8);
          ctx.beginPath();

          for (let s = 0; s < numSteps; s++) {
            const x = s * stepX;
            const w = widthMod[s];

            // 3D vector rotation around spine
            const deltaY = u * w * twistCos[s];
            const deltaZ = u * w * twistSin[s];

            const ptY = spineY[s] + deltaY;
            const ptZ = spineZ[s] + deltaZ;

            // 3D Perspective projection
            const scale = cameraDist / (cameraDist + ptZ);
            const projY = centerY + (ptY - centerY) * scale;

            if (s === 0) {
              ctx.moveTo(x, projY);
            } else {
              ctx.lineTo(x, projY);
            }
          }

          ctx.strokeStyle = grad;
          ctx.globalAlpha = baseAlpha;
          ctx.lineWidth = distFromEdge > 0.85 ? 1.4 : 1.1;
          ctx.stroke();
        }
      });

      ctx.globalAlpha = 1.0;
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      observer.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleMouseLeave);
    };
  }, [height, speedMultiplier]);

  return (
    <div ref={containerRef} className={`wave-ribbon-stage ${className}`}>
      {/* 3D Wave Canvas */}
      <canvas ref={canvasRef} className="wave-ribbon-canvas" aria-hidden="true" />

      {/* Floating Ambient Wavefield HUD Badge */}
      <div className="wave-ribbon-hud">
        <div className="wave-ribbon-hud__indicator">
          <span className="wave-ribbon-hud__dot" />
          <span className="wave-ribbon-hud__label">Acoustic Wavefield · 3D Seismic Resonance</span>
        </div>

        <div className="wave-ribbon-hud__controls">
          <button
            type="button"
            className={`wave-hud-btn ${speedMultiplier === 1 ? "is-active" : ""}`}
            onClick={() => setSpeedMultiplier(1)}
            aria-label="Normal wave speed"
          >
            Flow: 1x
          </button>
          <button
            type="button"
            className={`wave-hud-btn ${speedMultiplier === 0.4 ? "is-active" : ""}`}
            onClick={() => setSpeedMultiplier(0.4)}
            aria-label="Slow wave speed"
          >
            0.4x
          </button>
        </div>
      </div>
    </div>
  );
}
