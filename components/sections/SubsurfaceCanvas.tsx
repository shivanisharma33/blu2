"use client";

import { useEffect, useRef } from "react";

/**
 * Schematic shelf-to-basin cross-section. It illustrates the exploration methods,
 * not real data. Layers are drawn once to offscreen canvases per resize. Each frame
 * only composites them and draws the light overlays for the active programme step.
 *
 * step: 0 reprocessing · 1 MBES · 2 geochemical sampling · 3 heat flow
 */
export default function SubsurfaceCanvas({ step }: { step: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const stepRef = useRef(step);
  stepRef.current = step;

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mono = getComputedStyle(document.documentElement).getPropertyValue("--font-mono").trim() || "monospace";

    let W = 0, H = 0, dpr = 1;
    let soft: HTMLCanvasElement, sharp: HTMLCanvasElement;
    let raf = 0, visible = false, start = 0, revealStart = 0;
    const stepBlend = [1, 0, 0, 0];

    // deterministic noise
    const n1 = (x: number, k: number) =>
      Math.sin(x * 0.011 + k * 1.7) * 0.6 + Math.sin(x * 0.027 + k * 3.1) * 0.3 + Math.sin(x * 0.063 + k * 5.3) * 0.1;
    const smooth = (a: number, b: number, x: number) => {
      const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
      return t * t * (3 - 2 * t);
    };
    const seaY = () => H * 0.12;
    const seabed = (x: number) => H * (0.2 + 0.17 * smooth(W * 0.18, W * 0.62, x)) + n1(x, 0.3) * H * 0.006;
    const N = 15;
    const horizon = (k: number, x: number) => {
      const base = seabed(x);
      const span = H * 0.9 - base;
      const fold = Math.sin(x / W * Math.PI * 1.4 + 0.6) * H * 0.018 * (k / N);
      return base + span * Math.pow((k + 1) / (N + 1), 1.08) + fold + n1(x, k) * H * 0.006 * (1 + k / 6);
    };
    const bump = (x: number, a: number, b: number) => {
      if (x <= a || x >= b) return 0;
      const t = (x - a) / (b - a);
      return Math.pow(Math.sin(Math.PI * t), 1.4) * (0.75 + 0.25 * Math.sin(t * 9));
    };
    const fans = () => [
      { k: 6, a: W * 0.36, b: W * 0.7, th: H * 0.06, name: "CENOMANIAN FAN" },
      { k: 9, a: W * 0.5, b: W * 0.9, th: H * 0.052, name: "TURONIAN FAN" },
    ];

    function paintLayers(target: HTMLCanvasElement, crisp: boolean) {
      target.width = W * dpr;
      target.height = H * dpr;
      const c = target.getContext("2d")!;
      c.scale(dpr, dpr);
      // water column
      const water = c.createLinearGradient(0, seaY(), 0, H * 0.4);
      water.addColorStop(0, "rgba(22,119,168,0.20)");
      water.addColorStop(1, "rgba(11,38,56,0.05)");
      c.fillStyle = water;
      c.beginPath();
      c.moveTo(0, seaY());
      c.lineTo(W, seaY());
      for (let x = W; x >= 0; x -= 6) c.lineTo(x, seabed(x));
      c.fill();

      // sediment bands
      for (let k = -1; k < N; k++) {
        c.beginPath();
        for (let x = 0; x <= W; x += 6) c.lineTo(x, k < 0 ? seabed(x) : horizon(k, x));
        for (let x = W; x >= 0; x -= 6) c.lineTo(x, horizon(k + 1, x));
        c.closePath();
        const tone = 0.035 + ((k + 2) % 2) * 0.03 + (k / N) * 0.05;
        c.fillStyle = k >= N - 3 ? `rgba(198,173,122,${0.07 + (k - N + 3) * 0.03})` : `rgba(168,215,232,${tone})`;
        c.fill();
      }

      // seismic reflectors
      for (let k = -1; k < N; k++) {
        const sub = crisp ? 4 : 3;
        for (let s = 0; s < sub; s++) {
          c.beginPath();
          for (let x = 0; x <= W; x += crisp ? 3 : 5) {
            const y0 = k < 0 ? seabed(x) : horizon(k, x);
            const y1 = horizon(k + 1, x);
            const y = y0 + (y1 - y0) * ((s + 0.5) / sub) + Math.sin(x * (crisp ? 0.21 : 0.12) + s * 2 + k) * (crisp ? 0.9 : 1.6);
            x === 0 ? c.moveTo(x, y) : c.lineTo(x, y);
          }
          c.strokeStyle = crisp ? `rgba(168,215,232,${0.26 - s * 0.03})` : `rgba(168,215,232,${0.11 - s * 0.02})`;
          c.lineWidth = crisp ? 0.7 : 1.1;
          c.stroke();
        }
      }

      // seabed line
      c.beginPath();
      for (let x = 0; x <= W; x += 4) x === 0 ? c.moveTo(x, seabed(x)) : c.lineTo(x, seabed(x));
      c.strokeStyle = "rgba(168,215,232,0.75)";
      c.lineWidth = 1.2;
      c.stroke();

      // faults
      c.strokeStyle = crisp ? "rgba(168,215,232,0.32)" : "rgba(168,215,232,0.16)";
      c.lineWidth = 1;
      [[0.3, 0.06], [0.78, -0.05]].forEach(([fx, lean]) => {
        c.beginPath();
        c.moveTo(W * fx, horizon(2, W * fx));
        c.lineTo(W * (fx + lean), H * 0.95);
        c.stroke();
      });
    }

    function fanPath(c: CanvasRenderingContext2D, f: ReturnType<typeof fans>[number]) {
      c.beginPath();
      for (let x = f.a; x <= f.b; x += 4) c.lineTo(x, horizon(f.k, x) - f.th * bump(x, f.a, f.b));
      for (let x = f.b; x >= f.a; x -= 4) c.lineTo(x, horizon(f.k, x) + 2);
      c.closePath();
    }

    function resize() {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(320, r.width);
      H = Math.max(260, r.height);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      soft = document.createElement("canvas");
      sharp = document.createElement("canvas");
      paintLayers(soft, false);
      paintLayers(sharp, true);
      if (reduce) frame(performance.now());
    }

    function label(text: string, x: number, y: number, align: CanvasTextAlign = "left", alpha = 0.7) {
      ctx.font = `500 ${W < 600 ? 9 : 10.5}px ${mono}`;
      ctx.textAlign = align;
      ctx.fillStyle = `rgba(168,215,232,${alpha})`;
      ctx.fillText(text, x, y);
    }

    function frame(now: number) {
      const t = (now - start) / 1000;
      const rev = reduce ? 1 : Math.min(1, (now - revealStart) / 2600);
      const ease = 1 - Math.pow(1 - rev, 3);
      const s = stepRef.current;
      for (let i = 0; i < 4; i++) stepBlend[i] += ((i === s ? 1 : 0) - stepBlend[i]) * (reduce ? 1 : 0.08);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // progressive reveal from the surface down
      const depth = seaY() + (H - seaY()) * ease;
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, W, depth);
      ctx.clip();
      ctx.drawImage(soft, 0, 0, W, H);

      // reprocessing: crisp data revealed behind a sweeping scan line
      const scanX = ((t * 0.12) % 1.25) * W;
      if (stepBlend[0] > 0.01) {
        ctx.save();
        ctx.globalAlpha = stepBlend[0];
        ctx.beginPath();
        ctx.rect(0, 0, Math.min(scanX, W), H);
        ctx.clip();
        ctx.drawImage(sharp, 0, 0, W, H);
        ctx.restore();
        if (scanX < W) {
          const g = ctx.createLinearGradient(scanX - 60, 0, scanX, 0);
          g.addColorStop(0, "rgba(22,119,168,0)");
          g.addColorStop(1, `rgba(168,215,232,${0.35 * stepBlend[0]})`);
          ctx.fillStyle = g;
          ctx.fillRect(scanX - 60, seabed(scanX), 60, H);
        }
      }

      // fans
      fans().forEach((f, i) => {
        fanPath(ctx, f);
        const glow = 0.35 + stepBlend[0] * 0.45;
        const g = ctx.createLinearGradient(f.a, 0, f.b, 0);
        g.addColorStop(0, `rgba(22,119,168,${glow * 0.5})`);
        g.addColorStop(0.5, `rgba(80,170,210,${glow})`);
        g.addColorStop(1, `rgba(22,119,168,${glow * 0.4})`);
        ctx.fillStyle = g;
        ctx.fill();
        ctx.strokeStyle = `rgba(168,215,232,${0.4 + stepBlend[0] * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        const lx = f.a + (f.b - f.a) * (i ? 0.62 : 0.45);
        const ly = horizon(f.k, lx) - f.th * bump(lx, f.a, f.b);
        ctx.strokeStyle = "rgba(168,215,232,0.5)";
        ctx.beginPath();
        ctx.moveTo(lx, ly - 4);
        ctx.lineTo(lx + 26, ly - 26);
        ctx.lineTo(lx + 120, ly - 26);
        ctx.stroke();
        label(f.name, lx + 30, ly - 31, "left", 0.9);
      });

      // migration paths from source to fans
      ctx.setLineDash([2, 6]);
      ctx.lineDashOffset = -t * 18;
      ctx.strokeStyle = "rgba(198,173,122,0.55)";
      ctx.lineWidth = 1.2;
      [0.47, 0.6, 0.74].forEach((fx, i) => {
        const x = W * fx;
        ctx.beginPath();
        ctx.moveTo(x + 10, horizon(N - 2, x));
        ctx.bezierCurveTo(x - 10, horizon(N - 5, x), x + 14, horizon(11, x), x + (i - 1) * 6, horizon(i === 0 ? 6 : 9, x) - 6);
        ctx.stroke();
      });
      ctx.setLineDash([]);
      ctx.restore();

      // ---- step overlays (drawn above the reveal) ----
      const vx = W * 0.58;
      // vessel
      ctx.fillStyle = "rgba(244,245,243,0.9)";
      ctx.beginPath();
      ctx.moveTo(vx - 16, seaY() - 2);
      ctx.lineTo(vx + 16, seaY() - 2);
      ctx.lineTo(vx + 10, seaY() + 4);
      ctx.lineTo(vx - 12, seaY() + 4);
      ctx.closePath();
      ctx.fill();
      ctx.fillRect(vx - 4, seaY() - 8, 9, 6);

      // MBES fan of beams
      if (stepBlend[1] > 0.01) {
        const a = stepBlend[1];
        const sweep = Math.sin(t * 1.4) * 0.5 + 0.5;
        for (let i = -9; i <= 9; i++) {
          const ang = (i / 9) * 0.95;
          const len = (seabed(vx + Math.tan(ang) * (seabed(vx) - seaY())) - seaY()) / Math.cos(ang);
          const ex = vx + Math.sin(ang) * len;
          const ey = seaY() + Math.cos(ang) * len;
          const hot = Math.abs(i / 9 - (sweep * 2 - 1)) < 0.18;
          ctx.strokeStyle = `rgba(168,215,232,${(hot ? 0.55 : 0.14) * a})`;
          ctx.lineWidth = hot ? 1.2 : 0.8;
          ctx.beginPath();
          ctx.moveTo(vx, seaY() + 4);
          ctx.lineTo(ex, ey);
          ctx.stroke();
          ctx.fillStyle = `rgba(168,215,232,${(hot ? 0.95 : 0.4) * a})`;
          ctx.fillRect(ex - 1.5, ey - 1.5, 3, 3);
        }
        // mapped swath
        ctx.strokeStyle = `rgba(22,119,168,${0.9 * a})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        const x0 = vx - (seabed(vx) - seaY()) * 1.4, x1 = vx + (seabed(vx) - seaY()) * 1.4;
        for (let x = x0; x <= x1; x += 4) x === x0 ? ctx.moveTo(x, seabed(x)) : ctx.lineTo(x, seabed(x));
        ctx.stroke();
        label("MULTI-BEAM SWATH", vx, seaY() - 16, "center", 0.9 * a);
      }

      // geochemical cores
      if (stepBlend[2] > 0.01) {
        const a = stepBlend[2];
        [0.42, 0.55, 0.68, 0.81].forEach((fx, i) => {
          const x = W * fx, y = seabed(x);
          const depthPx = 26 + (i % 2) * 10;
          ctx.strokeStyle = `rgba(244,245,243,${0.25 * a})`;
          ctx.setLineDash([3, 4]);
          ctx.beginPath();
          ctx.moveTo(x, seaY() + 6);
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.fillStyle = `rgba(198,173,122,${0.85 * a})`;
          ctx.fillRect(x - 2, y, 4, depthPx);
          const p = (t * 0.6 + i * 0.25) % 1;
          ctx.strokeStyle = `rgba(198,173,122,${(1 - p) * 0.7 * a})`;
          ctx.beginPath();
          ctx.arc(x, y, 4 + p * 22, Math.PI, 0);
          ctx.stroke();
        });
        label("PISTON CORES · SEEP DETECTION", W * 0.42, seabed(W * 0.42) - 14, "left", 0.9 * a);
      }

      // heat-flow isotherms
      if (stepBlend[3] > 0.01) {
        const a = stepBlend[3];
        ctx.setLineDash([6, 6]);
        [0.38, 0.55, 0.72, 0.88].forEach((d, i) => {
          ctx.strokeStyle = `rgba(198,173,122,${(0.25 + i * 0.12) * a})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          for (let x = 0; x <= W; x += 8) {
            const y = H * d + Math.sin(x / W * Math.PI * 2 + i + t * 0.3) * H * 0.012 + (seabed(x) - H * 0.2) * 0.4;
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.stroke();
        });
        ctx.setLineDash([]);
        [0.35, 0.62, 0.86].forEach((fx) => {
          const x = W * fx, y = seabed(x);
          ctx.fillStyle = `rgba(244,245,243,${0.9 * a})`;
          ctx.fillRect(x - 1, y - 2, 2, 22);
        });
        label("ISOTHERMS · THERMAL HISTORY", W - 16, H * 0.55 - 10, "right", 0.85 * a);
      }

      // static annotations
      ctx.strokeStyle = "rgba(168,215,232,0.35)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, seaY());
      ctx.lineTo(W, seaY());
      ctx.stroke();
      label("SEA LEVEL", 16, seaY() - 8, "left", 0.6);
      label("SEABED", 16, seabed(16) - 8, "left", 0.6 * ease);
      if (ease > 0.92) label("SOURCE ROCK", 16, horizon(N - 2, 16) + 4, "left", 0.55);
      label("SCHEMATIC · NOT TO SCALE", W - 16, H - 14, "right", 0.4);
      if (W >= 600) label("SHELF", W * 0.08, seaY() + 18, "left", 0.4);
      label("DEEPWATER BASIN →", W - 16, seaY() + 18, "right", 0.4);

      if (!reduce && visible) raf = requestAnimationFrame(frame);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    start = performance.now();

    const io = new IntersectionObserver(([e]) => {
      const was = visible;
      visible = e.isIntersecting;
      if (visible && !was && !reduce) {
        if (!revealStart) revealStart = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!visible) cancelAnimationFrame(raf);
    }, { threshold: 0.05 });
    io.observe(canvas);
    const redraw = () => frame(performance.now());
    canvas.addEventListener("redraw", redraw);
    if (reduce) {
      revealStart = 1;
      redraw();
    }

    return () => {
      canvas.removeEventListener("redraw", redraw);
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  // reduced motion: redraw on step change happens via ResizeObserver-free path
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ref.current?.dispatchEvent(new Event("redraw"));
    }
  }, [step]);

  return <canvas ref={ref} className="subsurface__canvas" role="img" aria-label="Schematic cross-section from shelf to deepwater basin. It shows the seabed, sediment layers, two basin-floor fan reservoirs and the active survey method." />;
}
