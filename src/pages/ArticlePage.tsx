// src/pages/ArticlePage.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadArticles, type Article } from "../content.loader";

export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    (async () => {
      const all = await loadArticles();
      setArticle(all.find(a => a.slug === slug) ?? null);
    })();
  }, [slug]);

  if (!article) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-3xl font-bold">Article not found</h1>
        <p className="text-gray-600 mt-2">Please check the URL or return to Articles.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">{article.title}</h1>
        {article.date && <p className="text-gray-500 mt-2">{new Date(article.date).toDateString()}</p>}
      </header>
      <article
        className="prose lg:prose-xl prose-slate max-w-none"
        dangerouslySetInnerHTML={{ __html: article.html }}
      />
    </section>
  );
}
