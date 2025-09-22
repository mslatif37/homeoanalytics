import articlesData from "./articles-data.json";
import booksData from "./books-data.json";
import projectsData from "./projects-data.json";
import imagesData from "./images-data.json";

export type Article = {
  key: string;
  slug?: string;
  title: string;
  excerpt: string;
  cover?: string;
  icon?: "book" | "flask" | "brain" | string;
  date?: string;
  html: string;
  images?: Array<{
    url: string;
    title?: string;
    file_size_bytes?: number;
    file_size_human?: string;
  }>;
  images_dir_resolved?: string | null;
};


export type Book = {
  slug: string;
  title: string;
  description: string;
  access: "free" | "subscription";
  download_url: string;
  cover?: string;
  file_size_human?: string;
  file_size_bytes?: number;
};

export type Project = {
  slug: string;
  title: string;
  status: "active" | "archived";
  repo?: string;
  link?: string;
  thumb?: string;
  summary: string;
  html?: string;
};

export type ImageAsset = {
  slug: string;
  title: string;
  alt?: string;
  url: string;         // /uploads/images/...
  path?: string;       // alias
  article_slug?: string | null;
  width?: number | null;
  height?: number | null;
  file_size_bytes?: number | null;
  file_size_human?: string | null;
};

export async function loadArticles(): Promise<Article[]> {
  return articlesData as Article[];
}

export async function loadBooks(): Promise<Book[]> {
  return booksData as Book[];
}

export async function loadProjects(): Promise<Project[]> {
  return projectsData as Project[];
}

export async function loadImages()  { return imagesData as ImageAsset[]; }
export const projects: any[] = [];

// Auto-added on 2025-09-22
projects.push({
  slug: "digital-parsing-pipelines",
  title: "Digital Parsing Pipelines",
  summary: "Automated workflows to transform classical Materia Medica and repertories into structured, machine-readable data (CSV, JSON, SQL).",
  thumb: "/uploads/projects/thumbs/digital-parsing-pipelines.jpg",
  repo: "https://github.com/your-org/digital-parsing-pipelines",
  link: "https://your-host/digital-parsing-pipelines"
});

// Auto-added on 2025-09-22
projects.push({
  slug: "repertory-explorer-apps",
  title: "Repertory Explorer Apps",
  summary: "Interactive Streamlit dashboards for rubric search, rubric–remedy visualization, and export to Excel/CSV.",
  thumb: "/uploads/projects/thumbs/repertory-explorer-apps.jpg",
  repo: "https://github.com/your-org/repertory-explorer-apps",
  link: "https://your-host/repertory-explorer-apps"
});

// Auto-added on 2025-09-22
projects.push({
  slug: "binary-remedy-resolver",
  title: "Binary Remedy Resolver (BRR)",
  summary: "A decision-support tool using binary logic to differentiate remedies by traits, producing top-3 candidates instead of one.",
  thumb: "/uploads/projects/thumbs/binary-remedy-resolver.jpg",
  repo: "https://github.com/your-org/binary-remedy-resolver",
  link: "https://your-host/binary-remedy-resolver"
});

// Auto-added on 2025-09-22
projects.push({
  slug: "cyclopaedia-reborn",
  title: "Cyclopædia of Drug Pathogenesy — Reborn",
  summary: "A scholarly modernization of Richard Hughes’ Cyclopædia, restructured into AI-ready proving records with observer-wise fidelity.",
  thumb: "/uploads/projects/thumbs/cyclopaedia-reborn.jpg",
  repo: "https://github.com/your-org/cyclopaedia-reborn",
  link: "https://your-host/cyclopaedia-reborn"
});

// Auto-added on 2025-09-22
projects.push({
  slug: "thematic-mental-qualities",
  title: "Thematic Mental Qualities (QRep)",
  summary: "Exploring remedies across mental themes like Fear, Ambition, and Delusions, using remedy-grade mappings and semantic dashboards.",
  thumb: "/uploads/projects/thumbs/thematic-mental-qualities.jpg",
  repo: "https://github.com/your-org/thematic-mental-qualities",
  link: "https://your-host/thematic-mental-qualities"
});

// Auto-added on 2025-09-22
projects.push({
  slug: "homeoanalytics-hub",
  title: "HomeoAnalytics Website Hub",
  summary: "The curated website itself: a platform showcasing structured outputs, research articles, interactive apps, and visualizations.",
  thumb: "/uploads/projects/thumbs/homeoanalytics-hub.jpg",
  repo: "https://github.com/your-org/homeoanalytics-website",
  link: "https://your-host"
});
