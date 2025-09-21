// scripts/build-content.js
import fs from "fs";
import path from "path";
import { loadMDDir } from "./md.js";   // ✅ correct import

const ROOT = process.cwd();
const SRC  = path.join(ROOT, "src");
const CONTENT = path.join(SRC, "content");

/* ---------------- utils ---------------- */
function formatBytes(bytes) {
  if (typeof bytes !== "number" || isNaN(bytes) || bytes < 0) return null;
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const val = bytes / Math.pow(1024, i);
  return `${val.toFixed(val >= 10 || i === 0 ? 0 : 1)} ${units[i]}`;
}
function fileExists(p) { try { return fs.existsSync(p); } catch { return false; } }
function writeJSON(rel, data) {
  const out = path.join(SRC, rel);
  fs.writeFileSync(out, JSON.stringify(data, null, 2), "utf-8");
  console.log("✓ wrote", rel);
}

/* ---------------- generic loaders ---------------- */
// Load .html files from a directory into the same shape as MD output
function loadHTMLDir(dir) {
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.toLowerCase().endsWith(".html"));
  return files.map(filename => {
    const html = fs.readFileSync(path.join(dir, filename), "utf-8");
    const base = filename.replace(/\.html$/i, "");
    const title = base.replace(/[-_]/g, " ").replace(/\s+/g, " ").trim();
    return { title, slug: base, key: base, html };
  });
}

// Combine MD + HTML for a given content folder
function loadContentDir(dir) {
  const md = loadMDDir(dir);
  const html = loadHTMLDir(dir);
  return [...md, ...html];
}

/* ---------------- image helpers ---------------- */
// list images under /public/<relDir> and return display info
function listImagesUnderPublic(relDir) {
  const base = path.join(ROOT, "public", relDir);
  if (!fs.existsSync(base)) return [];
  const files = fs.readdirSync(base).filter(f => /\.(png|jpe?g|gif|webp|svg)$/i.test(f));
  return files.map(f => {
    const full = path.join(base, f);
    const { size } = fs.statSync(full);
    return {
      url: `/${relDir}/${f}`,                     // web path
      title: f.replace(/\.[^.]+$/, ""),
      file_size_bytes: size,
      file_size_human: formatBytes(size),
    };
  });
}

// directories we’ll try for a given article slug
function resolveArticleImageDirs(article, slug) {
  const dirs = [];
  // front-matter override: images_dir: uploads/images/sample_article_chart
  if (article.images_dir && typeof article.images_dir === "string") {
    dirs.push(article.images_dir.replace(/^\/+/, "")); // strip leading /
  }
  // conventional locations
  dirs.push(
    `uploads/articles/${slug}/images`,
    `uploads/articles/${slug}/figures`,
    `uploads/images/${slug}`,
    `uploads/images/${slug}/images`,
    `uploads/images/${slug}/figures`
  );
  return dirs;
}

// attach images array to an article (first folder that has files wins)
function attachImagesToArticle(article, slug) {
  const candidates = resolveArticleImageDirs(article, slug);
  for (const rel of candidates) {
    const found = listImagesUnderPublic(rel);
    if (found.length) {
      return { ...article, images: found, images_dir_resolved: rel };
    }
  }
  return { ...article, images: [], images_dir_resolved: null };
}

/* ---------------- ARTICLES ---------------- */
const articlesDir = path.join(CONTENT, "articles");
const articles = loadContentDir(articlesDir)
  .map(a => {
    const slug = a.slug || a.key;

    // add date if missing (fallback to file mtime)
    let enriched = a;
    if (!a.date) {
      try {
        const mdPath = path.join(articlesDir, `${slug}.md`);
        const htmlPath = path.join(articlesDir, `${slug}.html`);
        const stat = fs.statSync(fileExists(mdPath) ? mdPath : htmlPath);
        const iso = new Date(stat.mtime).toISOString().slice(0, 10);
        enriched = { ...enriched, date: iso };
      } catch {}
    }

    // attach figures
    enriched = attachImagesToArticle(enriched, slug);
    return enriched;
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

writeJSON("articles-data.json", articles);

/* ---------------- BOOKS ---------------- */
const booksRaw = loadContentDir(path.join(CONTENT, "books"));
const books = booksRaw.map(b => {
  const out = { ...b };
  if (typeof out.download_url === "string" && out.download_url.startsWith("/uploads/")) {
    const rel = out.download_url.replace(/^\//, ""); // uploads/books/...
    const publicPath = path.join(ROOT, "public", rel);
    if (!fileExists(publicPath)) {
      console.warn(`⚠︎ Book "${out.title || out.slug}" -> missing file at /public/${rel}`);
    } else {
      try {
        const { size } = fs.statSync(publicPath);
        out.file_size_bytes = size;
        out.file_size_human = formatBytes(size);
      } catch (err) {
        console.warn(`⚠︎ Could not stat ${publicPath}:`, err?.message || err);
      }
    }
  }
  return out;
});
writeJSON("books-data.json", books);

/* ---------------- PROJECTS ---------------- */
const projects = loadContentDir(path.join(CONTENT, "projects"));
writeJSON("projects-data.json", projects);

/* ---------------- APPS (optional JSON passthrough) ---------------- */
const appsPath = path.join(CONTENT, "apps", "apps.json");
let apps = [];
if (fileExists(appsPath)) {
  apps = JSON.parse(fs.readFileSync(appsPath, "utf-8"));
}
writeJSON("apps-data.json", apps);
