import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Menu, X, ExternalLink, ArrowRight, ChevronLeft, Download,
  BookOpen, FlaskConical, BrainCircuit,
  Github, Twitter, Facebook, Instagram
} from "lucide-react";
import {
  loadArticles, type Article as ArticleType,
  loadBooks, type Book as BookType,
  loadProjects, type Project as ProjectType,
} from "./content.loader";
import Contact from "./components/Contact";
import {
  Chart,
  BarController, BarElement, CategoryScale, LinearScale,
  Title, Tooltip, Legend
} from "chart.js";

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const brand = { name: "HomeoAnalytics", tagline: "Homeopathy Meets Analytics" };

const ICONS = {
  book: <BookOpen className="w-5 h-5" />,
  flask: <FlaskConical className="w-5 h-5" />,
  brain: <BrainCircuit className="w-5 h-5" />,
} as const;

function Brand() {
  return (
    <div className="flex flex-col items-start leading-tight">
      <span className="text-2xl md:text-3xl font-extrabold text-brand">{brand.name}</span>
      <span className="text-sm md:text-base text-gray-500 font-medium tracking-wide">{brand.tagline}</span>
    </div>
  );
}

function Header({ active, setActive }: { active: string; setActive: (s: string) => void }) {
  const [open, setOpen] = useState(false);
  const nav = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "articles", label: "Articles" },
    { id: "books", label: "Bookshelf" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];
  return (
    // inside <header> replace root wrapper with a vibrant bar
<header className="sticky top-0 z-50 bg-gradient-to-r from-brand to-brand-glow text-white shadow-soft">
  <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
    <button onClick={() => setActive("home")} aria-label="Home" className="hover:opacity-90">
      <div className="flex flex-col leading-tight">
        <span className="text-2xl md:text-3xl font-extrabold drop-shadow-sm">HomeoAnalytics</span>
        <span className="text-sm md:text-base text-white/80">{brand.tagline}</span>
      </div>
    </button>

    <nav className="hidden md:flex items-center gap-2">
      {nav.map(n => {
        const isActive = active === n.id;
        return (
          <button
            key={n.id}
            onClick={() => setActive(n.id)}
            className={[
              "px-3 py-1.5 font-medium transition",
              isActive ? "ha-pill" : "text-white/90 hover:text-white"
            ].join(" ")}
          >
            {n.label}
          </button>
        );
      })}
    </nav>

    <button
      className="md:hidden p-2 rounded-lg hover:bg-white/10"
      onClick={() => setOpen(v => !v)}
      aria-label="Toggle menu"
    >
      {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    </button>
  </div>

  {open && (
    <div className="md:hidden border-t border-white/20 bg-white/10 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-1">
        {nav.map(n => (
          <button
            key={n.id}
            onClick={() => { setActive(n.id); setOpen(false); }}
            className={[
              "text-left w-full px-3 py-2 rounded-md",
              active === n.id ? "ha-pill" : "text-white"
            ].join(" ")}
          >
            {n.label}
          </button>
        ))}
      </div>
    </div>
  )}
</header>

  );
}

function Hero({ setActive }: { setActive: (s: string) => void }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-10 pb-12">
  <div className="ha-glass bg-gradient-to-br from-white/90 via-white/70 to-white/60">
    <div className="rounded-3xl p-6 md:p-12 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
        HomeoAnalytics
      </h1>
      <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-6">
        Explore classical homeopathic sources with modern data analysis. Clean datasets, reproducible methods,
        and clear visualizations to support scholarship and clinical study.
      </p>
      <button
        onClick={() => setActive("articles")}
        className="inline-flex items-center px-8 py-3 rounded-full bg-brand text-white font-semibold
                   hover:bg-brand-dark shadow-soft transition"
      >
        Explore Our Work <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  </div>
</section>
  );
}

function FeaturedArticles({ items, onOpen }: { items: ArticleType[]; onOpen: (key: string) => void }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(a => (
        // Updated with card hover effects
        <div key={a.key} className="bg-white rounded-2xl shadow-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(99,102,241,0.2)] overflow-hidden">
          {a.cover && <img src={a.cover} alt={a.title} className="w-full h-40 object-cover" />}
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              {ICONS[a.icon as keyof typeof ICONS] || ICONS.book} {a.title}
            </h3>
            <p className="text-sm text-gray-600 mt-2 mb-4">{a.excerpt}</p>
            <button onClick={() => onOpen(a.key)} className="text-brand hover:text-brand-dark font-medium">
              Read More →
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}

function About() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="ha-glass hover:shadow-2xl hover:shadow-brand/20 transition-transform duration-200 hover:-translate-y-0.5 overflow-hidden">
        <div className="p-6 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About {brand.name}</h2>
          <div className="text-gray-700 space-y-4">
            <p>
              Founded by Dr. Muhammad Sohail Latif (PhD Biotechnology, MSc Biochemistry, DHMS), {brand.name} bridges
              classical homeopathic literature and modern analytics.
            </p>
            <p>
              Workstreams include corpus digitization, rubric–remedy alignment, concordance audits, and visualization of
              remedy signatures. Outputs are research-ready CSV/JSON, DOCX/PDF reports, and interactive dashboards.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Articles({ items, onOpen }: { items: ArticleType[]; onOpen: (key: string) => void }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="ha-glass hover:shadow-2xl hover:shadow-brand/20 transition-transform duration-200 hover:-translate-y-0.5 overflow-hidden">
        <div className="p-6 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">All Articles</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((a) => (
              <div key={a.key} className="bg-white rounded-2xl shadow-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(99,102,241,0.2)]">
                {a.cover && <img src={a.cover} alt={a.title} className="w-full h-40 object-cover rounded-t-2xl" />}
                <div className="px-6 pt-6">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    {ICONS[a.icon as keyof typeof ICONS] || ICONS.book} {a.title}
                  </h3>
                </div>
                <div className="px-6 pb-6">
                  <p className="text-sm text-gray-600 mb-4">{a.excerpt}</p>
                  <button onClick={() => onOpen(a.key)} className="text-brand hover:text-brand-dark font-medium">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

function Projects({ projects }: { projects: ProjectType[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="rounded-2xl p-6 md:p-12 shadow-lg bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Repository Deliverables</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <div key={p.slug} className="p-6 bg-white rounded-xl shadow transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(99,102,241,0.2)] hover:border-indigo-200 border border-transparent">
              {p.thumb && (
                <img
                  src={p.thumb}
                  alt={p.title}
                  className="w-full h-40 object-cover rounded mb-4"
                />
              )}
              <h3 className="text-xl font-bold mb-1">{p.title}</h3>
              <p className="text-gray-600 mb-2">{p.summary}</p>
              <div className="flex gap-4">
                {p.repo && (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand hover:text-brand-dark inline-flex items-center"
                  >
                    GitHub <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                )}
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand hover:text-brand-dark inline-flex items-center"
                  >
                    View <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Bookshelf({ books }: { books: BookType[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="rounded-2xl p-6 md:p-12 shadow-lg bg-gradient-to-br from-sky-50 via-white to-violet-50">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Bookshelf</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {books.map((b) => (
            <div key={b.slug} className="p-6 bg-white rounded-xl shadow transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(99,102,241,0.2)] hover:border-indigo-200 border border-transparent">
              {b.cover && (
                <img src={b.cover} alt={b.title} className="w-full h-40 object-cover rounded mb-4" />
              )}
              <h3 className="text-xl font-semibold">{b.title}</h3>
              <p className="text-gray-600 my-2">{b.description}</p>
              {b.access === "free" ? (
                <a
                  href={b.download_url}
                  download
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Free Download{b.file_size_human ? ` (${b.file_size_human})` : ""}
                </a>
              ) : (
                <span className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-200 text-gray-700">
                  Coming Soon
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArticleHero({ title }: { title: string }) {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 mb-8 shadow-lg">
      <h1 className="text-3xl md:text-5xl font-extrabold">{title}</h1>
    </div>
  );
}

function ArticleDetail(
  { articleKey, onBack, items }: { articleKey: string; onBack: () => void; items: ArticleType[] }
) {
  type Img = {
    url: string; title?: string; alt?: string;
    width?: number; height?: number;
    file_size_human?: string; srcset?: string; sizes?: string;
  };

  const article = useMemo(() => items.find(a => a.key === articleKey), [items, articleKey]);

  const figures: Img[] = useMemo(() => {
    const src = (article as any) ?? {};
    const arr = (Array.isArray(src.images) ? src.images : src.figures) as Img[] | undefined;
    if (!arr) return [];
    const seen = new Set<string>();
    return arr.filter(f => {
      const u = (f?.url || "").trim();
      if (!u || seen.has(u)) return false;
      seen.add(u); return true;
    });
  }, [article]);

  const rootRef = useRef<HTMLDivElement>(null);
  const [viewerIdx, setViewerIdx] = useState<number | null>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewer = viewerIdx != null && figures[viewerIdx] ? figures[viewerIdx] : null;

  useEffect(() => {
  if (!article || !rootRef.current) return;
  const cvs = rootRef.current.querySelectorAll<HTMLCanvasElement>("canvas[data-chart]");
  const charts: Chart[] = [];
  cvs.forEach(cv => {
    const raw = cv.getAttribute("data-chart");
    if (!raw) return;
    try { charts.push(new Chart(cv, JSON.parse(raw))); } catch {}
  });
  return () => charts.forEach(c => c.destroy());
}, [articleKey, article?.html]);
  useEffect(() => {
    if (viewerIdx != null) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [viewerIdx]);

  useEffect(() => {
    if (viewerIdx == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewerIdx(null);
      if (e.key === "ArrowLeft" && figures.length)
        setViewerIdx(i => (i! - 1 + figures.length) % figures.length);
      if (e.key === "ArrowRight" && figures.length)
        setViewerIdx(i => (i! + 1) % figures.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [viewerIdx, figures.length]);

  if (!article) return null;

  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
  const resetZoom = () => { setScale(1); setTx(0); setTy(0); };
  const zoomBy = (delta: number) => setScale(s => clamp(Number((s + delta).toFixed(2)), 1, 5));
  const setZoom = (val: number) => setScale(s => clamp(val, 1, 5));

  const onWheel: React.WheelEventHandler = (e) => {
    e.preventDefault();
    const step = e.deltaY > 0 ? -0.2 : 0.2;
    setScale(s => {
      const next = clamp(Number((s + step).toFixed(2)), 1, 5);
      if (next === 1) { setTx(0); setTy(0); }
      return next;
    });
  };

  const onDoubleClick: React.MouseEventHandler = () => {
    setScale(s => {
      const next = s === 1 ? 2 : 1;
      if (next === 1) { setTx(0); setTy(0); }
      return next;
    });
  };

  const onMouseDown: React.MouseEventHandler = (e) => {
    if (scale === 1) return;
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, tx, ty };
  };
  const onMouseMove: React.MouseEventHandler = (e) => {
    if (!dragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setTx(dragStart.current.tx + dx);
    setTy(dragStart.current.ty + dy);
  };
  const stopDrag = () => setDragging(false);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="rounded-2xl p-6 md:p-12 shadow-lg bg-gradient-to-br from-amber-50 via-white to-rose-50">
        <div className="mb-6">
          <button onClick={onBack} className="inline-flex items-center text-gray-600 hover:text-brand transition">
            <ChevronLeft className="w-5 h-5 mr-1" /> Back to Articles
          </button>
        </div>

        {article.title && (
  <div className="mb-8 rounded-2xl bg-gradient-to-r from-brand to-brand-glow text-white p-6 shadow-soft">
    <h1 className="text-3xl md:text-4xl font-extrabold">{article.title}</h1>
  </div>
)}
        <ArticleHero title={article.title} />

        <div
          ref={rootRef}
          className="prose prose-lg prose-gray max-w-none prose-img:rounded-xl prose-headings:scroll-mt-20 prose-h2:text-indigo-600 prose-h3:text-purple-600"
          dangerouslySetInnerHTML={{ __html: article.html }}
        />

        {figures.length > 0 && (
          <div className="mt-10">
            <h3 className="text-2xl font-bold mb-4">Figures</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {figures.map((fig, idx) => (
                <figure
                  key={encodeURI(fig.url)}
                  className="bg-gradient-to-br from-white via-sky-50 to-violet-50 rounded-xl shadow border overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-[1.01] hover:shadow-lg"
                  onClick={() => { setViewerIdx(idx); resetZoom(); }}
                  title="Click to enlarge"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-gray-50">
                    <img
                      src={encodeURI(fig.url)}
                      alt={fig.alt || fig.title || "figure"}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      width={fig.width || undefined}
                      height={fig.height || undefined}
                      srcSet={fig.srcset} sizes={fig.sizes}
                    />
                  </div>
                  <figcaption className="p-3 text-sm text-gray-600 truncate">
                    {fig.title || "figure"}{fig.file_size_human && <span className="ml-2 text-gray-400">· {fig.file_size_human}</span>}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}
      </div>

      {viewer && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-2 sm:p-4"
          onClick={() => { setViewerIdx(null); resetZoom(); }}
          role="dialog" aria-modal="true" aria-label="Image viewer"
        >
          <div
            ref={viewerRef}
            className="relative max-w-[96vw] max-h-[94vh] bg-white rounded-lg overflow-hidden shadow-lg outline-none flex flex-col"
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            <div className="p-2 sm:p-3 flex items-center justify-between gap-2 border-b">
              <div className="text-xs sm:text-sm text-gray-700 truncate">
                {viewer.title || viewer.alt || viewer.url}
                {viewer.file_size_human && <span className="ml-2 text-gray-400">· {viewer.file_size_human}</span>}
              </div>
              <div className="flex items-center gap-2">
                <button className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-xs sm:text-sm" onClick={() => zoomBy(-0.2)} title="Zoom out">−</button>
                <span className="text-xs w-10 text-center tabular-nums">{Math.round(scale * 100)}%</span>
                <button className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-xs sm:text-sm" onClick={() => zoomBy(+0.2)} title="Zoom in">+</button>
                <button className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-xs sm:text-sm" onClick={resetZoom} title="Reset">Reset</button>

                <a
                  href={encodeURI(viewer.url)} target="_blank" rel="noopener noreferrer"
                  className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-xs sm:text-sm" title="Open full size"
                >Open</a>
                <a
                  href={encodeURI(viewer.url)} download
                  className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-xs sm:text-sm" title="Download"
                >Download</a>
                <button
                  className="px-2 py-1 bg-gray-800 text-white rounded hover:bg-gray-700 text-xs sm:text-sm"
                  onClick={() => { setViewerIdx(null); resetZoom(); }}
                >Close</button>
              </div>
            </div>

            <div
              className={`flex-1 bg-black flex items-center justify-center ${dragging ? "cursor-grabbing" : scale > 1 ? "cursor-grab" : "cursor-zoom-in"}`}
              style={{ maxHeight: "calc(94vh - 88px)" }}
              onWheel={onWheel}
              onDoubleClick={onDoubleClick}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={stopDrag}
              onMouseLeave={stopDrag}
            >
              <img
                src={encodeURI(viewer.url)}
                alt={viewer.alt || viewer.title || "figure"}
                draggable={false}
                className="select-none"
                style={{
                  transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
                  transition: dragging ? "none" : "transform 120ms ease",
                  maxWidth: "96vw",
                  maxHeight: "calc(94vh - 88px)",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>

            <div className="px-3 py-2 border-t text-xs sm:text-sm text-gray-600 bg-white">
              <strong className="text-gray-800">{viewer.title || "Figure"}</strong>
              {viewer.alt && <span className="ml-2 text-gray-500">{viewer.alt}</span>}
            </div>

            {figures.length > 1 && (
              <>
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-white/80 hover:bg-white rounded shadow"
                  onClick={() => { setViewerIdx(i => (i! - 1 + figures.length) % figures.length); resetZoom(); }}
                  aria-label="Previous image"
                >‹</button>
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-white/80 hover:bg-white rounded shadow"
                  onClick={() => { setViewerIdx(i => (i! + 1) % figures.length); resetZoom(); }}
                  aria-label="Next image"
                >›</button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}


function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 text-gray-600 py-10 mt-12 border-t">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <div className="flex flex-col items-center gap-2">
          <Brand />
          <p className="mt-2">&copy; {year} HomeoAnalytics. All Rights Reserved.</p>
        </div>
        <div className="flex justify-center gap-5 mt-4">
          <a href="#" className="hover:text-white" aria-label="Twitter"><Twitter className="w-5 h-5" /></a>
          <a href="#" className="hover:text-white" aria-label="Facebook"><Facebook className="w-5 h-5" /></a>
          <a href="#" className="hover:text-white" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
          <a href="#" className="hover:text-white" aria-label="GitHub"><Github className="w-5 h-5" /></a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [active, setActive] = useState("home");
  const [openArticle, setOpenArticle] = useState<string | null>(null);

  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [books, setBooks] = useState<BookType[]>([]);
  const [projects, setProjects] = useState<ProjectType[]>([]);

  useEffect(() => { loadArticles().then(setArticles); }, []);
  useEffect(() => { loadBooks().then(setBooks); }, []);
  useEffect(() => { loadProjects().then(setProjects); }, []);
  useEffect(() => { if (active !== "articles") setOpenArticle(null); }, [active]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-sky-50">
      <Header active={active} setActive={setActive} />
      <main>
        {active === "home" && (
          <>
            <Hero setActive={setActive} />
            <FeaturedArticles
              items={articles.slice(0, 3)}
              onOpen={(k) => { setActive("articles"); setOpenArticle(k); }}
            />
          </>
        )}
        {active === "about" && <About />}
        {active === "articles" && (
          openArticle
            ? <ArticleDetail items={articles} articleKey={openArticle} onBack={() => setOpenArticle(null)} />
            : <Articles items={articles} onOpen={(k) => setOpenArticle(k)} />
        )}
        {active === "books" && <Bookshelf books={books} />}
        {active === "projects" && <Projects projects={projects} />}
        {active === "contact" && <Contact />}
      </main>
      <Footer />
    </div>
  );
}