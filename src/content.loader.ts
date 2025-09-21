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