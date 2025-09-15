// src/content.loader.ts
import articlesData from './articles-data.json'; // The new, pre-processed data file

export type Article = {
  key: string;
  title: string;
  excerpt: string;
  cover?: string;
  icon?: "book" | "flask" | "brain" | string;
  date?: string;
  html: string;
};

// No async function, no parsing logic. Just return the data.
export async function loadArticles(): Promise<Article[]> {
  return articlesData as Article[];
}