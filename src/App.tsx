import React, { useEffect, useMemo, useState } from "react";
import {
  Menu, X, ExternalLink, ArrowRight, ChevronLeft, Download,
  BookOpen, FlaskConical, BrainCircuit,
  Github, Twitter, Facebook, Instagram
} from "lucide-react";
import { loadArticles, type Article as ArticleType } from "./content.loader";

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
    { id: "apps", label: "Apps" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <header className="bg-white/90 backdrop-blur shadow-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <button onClick={() => setActive("home")} aria-label="Home">
          <Brand />
        </button>
        <nav className="hidden md:flex items-center gap-1">
          {nav.map(n => (
            <button
              key={n.id}
              onClick={() => setActive(n.id)}
              className={`px-3 py-2 rounded-lg font-medium transition
                           hover:text-brand ${active === n.id ? "text-brand" : "text-gray-700"}`}
            >
              {n.label}
            </button>
          ))}
        </nav>
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-1">
            {nav.map(n => (
              <button
                key={n.id}
                onClick={() => { setActive(n.id); setOpen(false); }}
                className={`text-left w-full px-3 py-2 rounded-md ${active === n.id ? "text-brand" : "text-gray-800"} hover:bg-gray-50`}
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
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-12 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">HomeoAnalytics</h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-6">
          Explore classical homeopathic sources with modern data analysis. Clean datasets, reproducible methods, and clear visualizations
          to support scholarship and clinical study.
        </p>
        <button
          onClick={() => setActive("articles")}
          className="inline-flex items-center bg-brand hover:bg-brand-dark text-white font-medium px-8 py-3 rounded-full shadow transition"
        >
          Explore Our Work <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </section>
  );
}

function FeaturedArticles({ onOpen, items }: { onOpen: (key: string) => void; items: ArticleType[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(a => (
        <div key={a.key} className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
          {a.cover && (
            <img src={a.cover} alt={a.title} className="w-full h-40 object-cover" />
          )}
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
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">About {brand.name}</h2>
        <div className="text-gray-700 space-y-4">
          <p>
            Founded by Dr. Muhammad Sohail Latif (PhD Biotechnology, MSc Biochemistry, DHMS), {brand.name} bridges classical homeopathic literature and modern analytics.
            Workstreams include corpus digitization, rubric–remedy alignment, concordance audits, and visualization of remedy signatures.
          </p>
          <p>
            Outputs are research-ready CSV/JSON, DOCX/PDF reports, and interactive dashboards. Educational tools include a Binary Remedy Resolver and a Case Simulator to support learning.
          </p>
        </div>
      </div>
    </section>
  );
}

function Articles({ onOpen, items }: { onOpen: (key: string) => void; items: ArticleType[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">All Articles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(a => (
            <div key={a.key} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="px-6 pt-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  {ICONS[a.icon as keyof typeof ICONS] || ICONS.book} {a.title}
                </h3>
              </div>
              <div className="px-6 pb-6">
                <p className="text-sm text-gray-600 mb-4">{a.excerpt}</p>
                <button onClick={() => onOpen(a.key)} className="text-brand hover:text-brand-dark font-medium">Read More →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const items = [
    { title: "Repertory Data Visualization", desc: "Interactive charts from rubric–remedy matrices; explore signatures and co-occurrence.", link: "#" },
    { title: "Materia Medica Analysis Tool", desc: "Keyword/theme analysis across authors; export concordance and comparative views.", link: "#" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Repository Deliverables</h2>
        <div className="space-y-4">
          {items.map((it) => (
            <div key={it.title} className="bg-gray-50 p-6 rounded-xl border-l-4 border-brand hover:shadow-md transition">
              <h3 className="text-xl font-bold mb-1">{it.title}</h3>
              <p className="text-gray-600 mb-2">{it.desc}</p>
              <a href={it.link} className="inline-flex items-center font-medium text-brand hover:text-brand-dark">
                View Project Deliverables <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Bookshelf() {
  const books = [
    { title: "Classical Homeopathy Revisited", desc: "Free download of annotated classics.", free: true, url: "/books/classical-homeopathy-revisited.pdf" },
    { title: "Analytics Toolkit", desc: "Subscription — datasets + CSV/JSON exports.", free: false, url: "YOUR_STRIPE_CHECKOUT_LINK_1" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Bookshelf</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {books.map((b) => (
            <div key={b.title} className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md">
              <h3 className="text-xl font-semibold">{b.title}</h3>
              <p className="text-gray-600 my-2">{b.desc}</p>
              {b.free ? (
                <a
                  href={b.url}
                  download
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
                >
                  Free Download
                  <Download className="w-4 h-4 ml-2" />
                </a>
              ) : (
                <a
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
                >
                  Subscribe
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Apps() {
  const apps = [
    { title: "Binary Remedy Resolver", desc: "Interactive differentiation engine.", sub: true, url: "YOUR_STRIPE_CHECKOUT_LINK_2" },
    { title: "Case Simulator", desc: "100 real-world cases with analytics.", sub: true, url: "YOUR_STRIPE_CHECKOUT_LINK_3" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Apps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {apps.map((app) => (
            <div key={app.title} className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md">
              <h3 className="text-xl font-semibold">{app.title}</h3>
              <p className="text-gray-600 my-2">{app.desc}</p>
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
              >
                Subscribe
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// The Contact component with the functional form
function Contact() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact</h2>
        <p className="text-gray-700 text-lg mb-6">Questions or topics you would like covered? Write to us.</p>
        <form
          className="grid gap-4 md:grid-cols-2"
          action="https://formspree.io/f/mblabqdk"
          method="POST"
        >
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input 
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand"
              type="text"
              name="name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input 
              type="email" 
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand" 
              name="_replyto"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-1">Message</label>
            <textarea 
              rows={4} 
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand" 
              name="message"
              required
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center bg-brand hover:bg-brand-dark text-white font-medium px-6 py-2 rounded-lg transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
function ArticleDetail(
  { articleKey, onBack, items }: { articleKey: string; onBack: () => void; items: ArticleType[] }
) {
  const article = useMemo(() => items.find(a => a.key === articleKey), [items, articleKey]);

  if (!article) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-12">
        <button
          onClick={onBack}
          className="text-gray-500 hover:text-gray-700 mb-4 inline-flex items-center"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Articles
        </button>

        <h1 className="text-3xl md:text-4xl font-bold mb-2">{article.title}</h1>

        <div className="flex items-center gap-2 mb-6">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-brand/10 text-brand border border-brand/20">
            Research
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border border-gray-300 text-gray-700">
            HomeoAnalytics
          </span>
        </div>
        <div className="prose prose-lg prose-gray max-w-none prose-img:rounded-xl prose-headings:scroll-mt-20">
          <div dangerouslySetInnerHTML={{ __html: article.html }} />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-400 py-10 mt-12">
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

  useEffect(() => {
    loadArticles().then(setArticles);
  }, []);

  useEffect(() => { if (active !== "articles") setOpenArticle(null); }, [active]);

  return (
    <div className="min-h-screen">
      <Header active={active} setActive={setActive} />

      <main>
        {active === "home" && (
          <>
            <Hero setActive={setActive} />
            <FeaturedArticles items={articles.slice(0, 3)} onOpen={(k: string) => { setActive("articles"); setOpenArticle(k); }} />
          </>
        )}

        {active === "about" && <About />}

        {active === "articles" &&
          (openArticle ? (
            <ArticleDetail items={articles} articleKey={openArticle} onBack={() => setOpenArticle(null)} />
          ) : (
            <Articles items={articles} onOpen={(k: string) => setOpenArticle(k)} />
          ))}

        {active === "books" && <Bookshelf />}
        {active === "apps" && <Apps />}
        {active === "projects" && <Projects />}
        {active === "contact" && <Contact />}
      </main>

      <Footer />
    </div>
  );
}