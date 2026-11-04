/**
 * Imports news releases and the legal page from the official site
 * (https://www.blu-energies.com) into lib/data/*.json.
 *
 *   node scripts/import-site.mjs
 *
 * Release bodies are reduced to an allowlist of safe tags (p, strong, em, a, ul, ol, li, br, h3, h4)
 * so they can be rendered as article prose. Re-run it whenever new releases are published.
 */
import { writeFileSync, mkdirSync } from "node:fs";

const ORIGIN = "https://www.blu-energies.com";
const UA = { headers: { "User-Agent": "BluEnergies-site-import" } };
const get = async (path) => {
  const r = await fetch(ORIGIN + path, UA);
  if (!r.ok) throw new Error(`${r.status} ${path}`);
  return r.text();
};

const ENT = { amp: "&", nbsp: " ", quot: '"', "#39": "'", rsquo: "’", lsquo: "‘", ldquo: "“", rdquo: "”", ndash: "–", mdash: "—", hellip: "…", lrm: "", eacute: "é", ocirc: "ô", euro: "€", reg: "®", trade: "™", deg: "°", sup2: "²", frac12: "½" };
const decode = (s) => s.replace(/&([a-z0-9#]+);/gi, (m, e) => (e in ENT ? ENT[e] : e.startsWith("#") ? String.fromCodePoint(Number(e.slice(1))) : m));
/** Source HTML often wraps quoted terms in spans, leaving `" Company "`; close those gaps. */
const tidyQuotes = (s) => s.replace(/“\s+/g, "“").replace(/\s+”/g, "”").replace(/"\s+([^"<>]*?)\s+"/g, '"$1"');
const text = (h) => tidyQuotes(decode(h.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim());

const ALLOWED = new Set(["p", "strong", "em", "a", "ul", "ol", "li", "br", "h3", "h4"]);
const RENAME = { b: "strong", i: "em", h2: "h3" };

function sanitize(html) {
  let out = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|form|iframe)[\s\S]*?<\/\1>/gi, "")
    .replace(/<\/?([a-z0-9]+)([^>]*)>/gi, (m, tag, attrs) => {
      const closing = m.startsWith("</");
      let t = tag.toLowerCase();
      t = RENAME[t] || t;
      if (!ALLOWED.has(t)) return t === "div" && closing ? "\n" : "";
      if (closing) return `</${t}>`;
      if (t === "a") {
        const href = (attrs.match(/href\s*=\s*["']([^"']+)["']/i) || [])[1];
        if (!href) return "";
        const abs = href.startsWith("/") ? ORIGIN + href : href.startsWith("http") || href.startsWith("mailto:") ? href : `${ORIGIN}/${href}`;
        const ext = /^https?:/.test(abs);
        return `<a href="${abs.replace(/"/g, "&quot;")}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ""}>`;
      }
      return `<${t}>`;
    });
  out = tidyQuotes(out
    .replace(/&nbsp;/g, " "))
    .replace(/&lrm;/g, "")
    .replace(/<(strong|em)>\s*<\/\1>/g, "")
    .replace(/<p>\s*(<br>\s*)*<\/p>/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .trim();
  return out;
}

function contentBlock(html) {
  const start = html.indexOf('<div id="content">');
  const end = html.indexOf('<div id="subscribe">');
  return html.slice(start, end > start ? end : undefined);
}

function category(title) {
  const t = title.toLowerCase();
  if (/totalenergies|operations|lease sale|harper/.test(t)) return "Operations";
  if (/placement|warrant|shares for services|option grant/.test(t)) return "Financing";
  if (/trading|otcqx|dtc|tsx venture/.test(t)) return "Markets";
  return "Corporate";
}

async function releases() {
  const list = await get("/news-and-media/news/");
  const items = [...list.matchAll(/(\d{2})\.(\d{2})\.(\d{2})[\s\S]*?href=['"](?:\/news-and-media\/news\/)?([a-z0-9-]+)['"][^>]*>([\s\S]*?)<\/a>/g)];
  const seen = new Set();
  const out = [];
  for (const [, mm, dd, yy, slug, rawTitle] of items) {
    if (seen.has(slug)) continue;
    seen.add(slug);
    const page = contentBlock(await get(`/news-and-media/news/${slug}`));
    const h2 = page.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
    const title = text(h2 ? h2[1] : rawTitle);
    const body = sanitize(page.slice(h2 ? page.indexOf(h2[0]) + h2[0].length : 0));
    // First substantive paragraph: skip date-only lines and all-caps distribution notices.
    const paras = [...body.matchAll(/<p>([\s\S]*?)<\/p>/g)].map((m) => text(m[1]));
    const first = paras.find((p) => p.length > 80 && p !== p.toUpperCase()) || paras[0] || "";
    const dateline = (first.match(/^(.*?\/\s*(?:CNW|Newsfile|GlobeNewswire|Accesswire)\s*\/)\s*[-–—]?\s*/i) || [])[1] || null;
    const lead = (dateline ? first.slice(first.indexOf(dateline) + dateline.length) : first)
      .replace(/^\s*[-–—]\s*/, "")
      .replace(/^[A-Z][a-z]+ \d{1,2}, \d{4}\s*[–-]\s*[^–]+?\s*[–-]\s*/, "") // "May 8, 2025 – Vancouver, BC – "
      .replace(/^BluEnergies Ltd\.\s*(\([^)]*\)\s*)+,?\s*/, "BluEnergies ")
      .replace(/\(\s*["“][^"”]*["”]\s*or the\s*["“]\s*Company\s*["”]\s*\),?\s*/, "");
    out.push({
      slug,
      date: `20${yy}-${mm}-${dd}`,
      title,
      category: category(title),
      dateline,
      excerpt: lead.length > 260 ? lead.slice(0, lead.lastIndexOf(" ", 250)) + "…" : lead,
      html: body,
      source: `${ORIGIN}/news-and-media/news/${slug}`,
    });
    console.log("release", out.at(-1).date, slug);
  }
  return out.sort((a, b) => b.date.localeCompare(a.date));
}

async function legal() {
  const page = contentBlock(await get("/legal/"));
  const parts = page.split(/<h2[^>]*>/i).slice(1);
  return parts
    .map((p) => {
      const [head, ...rest] = p.split(/<\/h2>/i);
      return { title: text(head), html: sanitize(rest.join("")) };
    })
    .filter((s) => s.title && !/^news$/i.test(s.title))
    .map((s) => ({ ...s, html: s.html.replace(/<h3>\s*([\s\S]*?)\s*<\/h3>/g, (m, t) => `<h3>${t.replace(/<[^>]+>/g, "")}</h3>`) }));
}

mkdirSync("lib/data", { recursive: true });
writeFileSync("lib/data/releases.json", JSON.stringify(await releases(), null, 1));
writeFileSync("lib/data/legal.json", JSON.stringify(await legal(), null, 1));
console.log("done");
