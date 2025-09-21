// scripts/md.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

// ---------- helpers ----------
function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
}

// escape for embedding JSON into an HTML attribute safely
function htmlAttrEscape(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// trivially parse CSV with headers: Label,Value (case-insensitive)
function parseCSV(text) {
  const lines = text
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean);

  if (lines.length < 2) return { labels: [], values: [] };

  const header = lines[0].split(",").map(h => h.trim().toLowerCase());
  const idxLabel = header.findIndex(h => /label|name|rubric|chapter|remedy/.test(h));
  const idxValue = header.findIndex(h => /value|count|freq|frequency|n/.test(h));

  if (idxLabel === -1 || idxValue === -1) return { labels: [], values: [] };

  const labels = [];
  const values = [];
  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split(",");
    const lab = (parts[idxLabel] || "").trim();
    const val = Number((parts[idxValue] || "").trim());
    if (!lab) continue;
    labels.push(lab);
    values.push(Number.isFinite(val) ? val : 0);
  }
  return { labels, values };
}

// ---------- marked extension: code fences ----------
const renderer = new marked.Renderer();
const origCode = renderer.code.bind(renderer);

renderer.code = (code, infostring, escaped) => {
  const lang = (infostring || "").trim().toLowerCase();

  // 1) Raw Chart.js config
  if (lang === "chart") {
    const dataAttr = htmlAttrEscape(code);
    return `
<div class="ha-chart">
  <canvas data-chart="${dataAttr}"></canvas>
</div>`;
  }

  // 2) CSV -> horizontal bar chart scaffold
  if (lang === "chartcsv") {
    const { labels, values } = parseCSV(code);
    const cfg = {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "Frequency",
          data: values
        }]
      },
      options: {
        indexAxis: "y",
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: false }
        },
        scales: {
          x: { beginAtZero: true, grace: "5%" }
        }
      }
    };
    const dataAttr = htmlAttrEscape(JSON.stringify(cfg));
    return `
<div class="ha-chart">
  <canvas data-chart="${dataAttr}"></canvas>
</div>`;
  }

  // default
  return origCode(code, infostring, escaped);
};

// optional: add a base class for nicer spacing
marked.use({
  renderer,
  walkTokens(token) { /* no-op, reserved for future */ }
});

// ---------- loader ----------
export function loadMDDir(dir) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".md"));
  return files.map(filename => {
    const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
    const { data, content } = matter(raw);
    const html = marked.parse(content);

    const base = filename.replace(/\.md$/i, "");
    const derivedSlug = data.slug ? String(data.slug) : slugify(data.title || base);
    const key = data.key ? String(data.key) : derivedSlug;

    return { ...data, slug: derivedSlug, key, html };
  });
}
