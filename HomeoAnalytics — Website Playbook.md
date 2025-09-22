HomeoAnalytics — Website Playbook (README)

A focused, static website for showcasing HomeoAnalytics research summaries, interactive visualizations, and project deliverables. This is not an open-source library; it’s a curated portfolio site.

1) Quick Start
Prereqs

Node 20.x LTS

npm 9+ (bundled with Node)

Install & run
npm i
npm run dev


Visit the printed local URL in your terminal (Vite dev server).

Build for deploy
npm run build
# deploy the /dist directory to your static host

2) How the Site Loads Content (Important)

All front-end sections (Articles, Bookshelf, Projects) read from a single content loader (src/content.loader.ts or similarly named). You’ll add or update JSON entries and drop assets (images / PDFs) into the public/ folder so the site can serve them at runtime.

Why public/? Anything under public/ is copied as-is to the built site and served from the same root URL. That makes asset URLs simple and stable.

3) Directory Layout You’ll Use
homeoanalytics/
├─ public/
│  ├─ uploads/
│  │  ├─ images/
│  │  │  └─ <article-slug>/
│  │  │     ├─ fig1.png
│  │  │     ├─ fig2.webp
│  │  │     └─ cover.jpg
│  │  ├─ books/
│  │  │  ├─ organon.pdf
│  │  │  └─ repertory-audit.pdf
│  │  └─ projects/
│  │     └─ thumbs/
│  │        └─ repertory-audit.jpg
│  └─ favicon.svg  (optional)
├─ src/
│  ├─ App.tsx
│  ├─ components/Contact.tsx
│  ├─ content.loader.ts       ← update this to register new content
│  ├─ index.css               ← Tailwind entry
│  └─ main.tsx
├─ docs/
│  └─ screenshots/            ← images you show in this README
├─ tailwind.config.js
├─ postcss.config.cjs
└─ package.json


If you prefer different subfolders, keep the same pattern (predictable URLs) and update the paths you store in content.loader.ts.

4) Articles — Step-by-Step

Articles are HTML bodies (produced by your converter) plus metadata (title, excerpt, cover, images). The UI reads an array of Article objects and handles:

Summary cards (title + excerpt + optional cover)

Full article rendering (HTML wrapped by Tailwind Typography)

Auto-initialization of Chart.js if you embed <canvas data-chart="...">

A Figures grid + Lightbox (zoom, pan, next/prev)

4.1 Create the article folder and assets

Pick a slug (lowercase with hyphens), e.g. classical-homeopathy-revisited.

Put related images under:

public/uploads/images/classical-homeopathy-revisited/
  cover.jpg          (optional cover for cards)
  fig1.png
  fig2.webp


Export your article’s HTML with your converter (no global <style> or <script>—see §7).

4.2 Add the article entry to the loader

Open src/content.loader.ts and add a new entry to the articles array you export.

Article shape (example):

export type Article = {
  key: string;            // unique slug
  title: string;
  excerpt: string;
  html: string;           // your converter output
  icon?: "book" | "flask" | "brain";
  cover?: string;         // e.g. "/uploads/images/<slug>/cover.jpg"
  images?: Array<{
    url: string;          // e.g. "/uploads/images/<slug>/fig1.png"
    title?: string;
    alt?: string;
    width?: number;
    height?: number;
    file_size_human?: string; // e.g. "740 KB"
    srcset?: string;
    sizes?: string;
  }>;
};


Minimal example:

articles.push({
  key: "classical-homeopathy-revisited",
  title: "Classical Homeopathy Revisited",
  excerpt: "Revisiting classical sources through modern analytics.",
  icon: "book",
  cover: "/uploads/images/classical-homeopathy-revisited/cover.jpg",
  html: `
    <h2>Introduction</h2>
    <p>...</p>
    <h3>Top 10 Co-occurring Remedies</h3>
    <canvas data-chart='{
      "type":"bar",
      "data":{"labels":["A","B","C"],"datasets":[{"label":"Count","data":[12,8,6]}]},
      "options":{"responsive":true,"plugins":{"legend":{"display":false}}}
    }'></canvas>
  `,
  images: [
    { url: "/uploads/images/classical-homeopathy-revisited/fig1.png",
      title: "Top-10 co-occurring remedies",
      alt: "Horizontal bar chart of remedies" }
  ]
});


The article page automatically renders all <canvas data-chart="..."> blocks with Chart.js and shows the images array under a Figures section with a click-to-enlarge lightbox.

4.3 Image & lightbox tips

Prefer ≤1600px width & compressed (WebP/PNG).

Always set alt for accessibility.

If you know actual width/height, include them to improve CLS.

5) Bookshelf — Step-by-Step

Books showcase PDFs for download (or mark them as “coming soon”).

5.1 Put the files in place

PDF: public/uploads/books/<file>.pdf

Optional cover: public/uploads/images/books/<slug>.jpg (or any path you like)

5.2 Add the book entry

In src/content.loader.ts, extend the exported books array.

Book shape:

export type Book = {
  slug: string;
  title: string;
  description: string;
  cover?: string;              // "/uploads/images/books/organon.jpg"
  access: "free" | "coming-soon";
  download_url?: string;       // "/uploads/books/organon.pdf" if access === "free"
  file_size_human?: string;    // "3.2 MB"
};


Example:

books.push({
  slug: "organon",
  title: "Organon of Medicine",
  description: "Curated study edition.",
  cover: "/uploads/images/books/organon.jpg",
  access: "free",
  download_url: "/uploads/books/organon.pdf",
  file_size_human: "3.2 MB"
});

6) Projects — Step-by-Step

Projects list research deliverables and links (repo or hosted demo).

6.1 Prepare a thumbnail (optional)

public/uploads/projects/thumbs/<slug>.jpg (or .png, .webp)

6.2 Add the project entry

In src/content.loader.ts, extend the exported projects array.

Project shape:

export type Project = {
  slug: string;
  title: string;
  summary: string;
  thumb?: string;       // "/uploads/projects/thumbs/repertory-audit.jpg"
  repo?: string;        // "https://github.com/... (optional)"
  link?: string;        // Live page or dashboard URL (optional)
};


Example:

projects.push({
  slug: "repertory-audit",
  title: "Repertory Audit",
  summary: "Interactive audit of rubric–remedy matrices and signatures.",
  thumb: "/uploads/projects/thumbs/repertory-audit.jpg",
  repo: "https://github.com/your-org/repertory-audit",
  link: "https://your-host/repertory-audit"
});

7) Using the HTML Converter (Safely)

Your converter generates the article html string. To keep the website styles intact:

Do

Output semantic HTML: headings (h2, h3), paragraphs, lists, tables.

Keep inline styles minimal. The site applies typography via Tailwind’s prose class.

If you must style, scope with a wrapper class (e.g., wrap your article with <div class="article-body"> ... </div> and only target .article-body * in converter CSS).

Don’t

Inject <style> tags that reset global elements (html, body, h1, h2, ...).

Inject <script> tags.

Add global IDs/classes that collide with the app (like #app, .container, etc.).

Charts

To embed a chart, add <canvas data-chart="{...}"></canvas> with valid Chart.js config JSON (see the example in §4.2). The page will auto-render it.

8) Visuals & Theming (What’s already wired)

Gradients, glass/soft shadows, and transitions are baked into components via Tailwind utility classes.

Lightbox supports zoom (wheel, ± buttons, double-click) and pan (drag).

Cards and sections have hover elevation and subtle transforms.

If you change Tailwind config, ensure any custom classes used in App.tsx are included in the content globs so Purge/Scan won’t drop them.

9) Accessibility & Content Quality

Before publishing an article:

Headings are in order (h2 then h3).

Images include clear alt text.

Links are descriptive (the article card already shows titles; “Read More →” is acceptable in context).

Large images are optimized (WebP/PNG; ≤1600px width recommended).

10) Troubleshooting (Fast Fixes)
Symptom	Likely cause	Fix
Page looks unstyled	Tailwind didn’t pick up classes or Vite cache stale	Ensure tailwind.config.js > content includes src/**/*.{ts,tsx,html}. Restart dev server. Delete node_modules/.vite and retry.
“Unknown utility class”	File not included in Tailwind content globs	Add/adjust globs (e.g., ./index.html, ./src/**/*.{ts,tsx}) and restart.
Converter output “breaks” page	Global CSS in article HTML	Remove <style> tags; scope any CSS to .article-body.
Lightbox image overflows	Huge raw image	Resize to ≤1600px width; compress to WebP/PNG.
Chart not rendering	Invalid JSON in data-chart	Validate JSON; ensure it’s a string the browser can parse.
11) Release / “Freeze” Workflow
# create branch for content update
git checkout -b content/<YYYY-MM-DD>-<slug>

# add/update article in src/content.loader.ts
# drop images in public/uploads/images/<slug>/
# drop book pdfs in public/uploads/books/

npm run dev        # verify locally
npm run build      # verify production build

git commit -am "content: add <Article Title> + figures + book(s)"
git tag -a vYYYY.MM.DD -m "content freeze YYYY-MM-DD"
git push --tags origin HEAD

12) FAQ

Q: Where exactly do I put article images?
A: public/uploads/images/<article-slug>/... and reference them with /uploads/images/<article-slug>/<file> in content.loader.ts.

Q: Do I need to hand-build a figures gallery?
A: No. Add an images: [] array to the article object; the UI will render a “Figures” grid and lightbox automatically.

Q: Can I use WebP?
A: Yes (recommended for size). Keep a PNG fallback only if you must. Most modern browsers support WebP.

Q: Can I link to external repos or dashboards in Projects?
A: Yes—set repo or link in the project entry.

13) Example “Copy-Paste” Blocks
New article template
articles.push({
  key: "<slug>",
  title: "<Title>",
  excerpt: "<one sentence summary>",
  icon: "book", // or "flask" | "brain"
  cover: "/uploads/images/<slug>/cover.jpg",
  html: `
    <h2>Intro</h2>
    <p>...</p>
  `,
  images: [
    { url: "/uploads/images/<slug>/fig1.png", title: "Figure 1", alt: "..." }
  ]
});

New book template
books.push({
  slug: "<slug>",
  title: "<Book Title>",
  description: "<Short description>",
  cover: "/uploads/images/books/<slug>.jpg",
  access: "free",
  download_url: "/uploads/books/<slug>.pdf",
  file_size_human: "2.4 MB"
});

New project template
projects.push({
  slug: "<slug>",
  title: "<Project Title>",
  summary: "<1–2 line summary>",
  thumb: "/uploads/projects/thumbs/<slug>.jpg",
  repo: "https://github.com/…",   // optional
  link: "https://…"               // optional
});

14) License & Use

Content (text, images, PDFs): © HomeoAnalytics / authors.

Code: internal use; not open for general redistribution.

Adjust this section to match your preferred legal wording.