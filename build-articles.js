// build-articles.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

const articlesPath = path.join(process.cwd(), 'src/content/articles');
const outputPath = path.join(process.cwd(), 'src/articles-data.json');

async function processArticles() {
  const articles = [];
  const files = fs.readdirSync(articlesPath);

  for (const file of files) {
    if (file.endsWith('.md')) {
      const filePath = path.join(articlesPath, file);
      const rawContent = fs.readFileSync(filePath, 'utf-8');
      
      try {
        const { data, content } = matter(rawContent);
        const html = String(
          await unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkRehype)
            .use(rehypeStringify)
            .process(content)
        );

        articles.push({
          key: data.slug || file.replace(/\.md$/, ''),
          title: data.title || file.replace(/\.md$/, ''),
          excerpt: data.excerpt || content.split('\n\n')[0],
          cover: data.cover || undefined,
          icon: data.icon || 'book',
          date: data.date || undefined,
          html,
        });
      } catch (e) {
        console.error(`Error processing file: ${file}`, e);
      }
    }
  }

  // Sort articles by date
  articles.sort((a, b) => {
    if (!a.date && !b.date) return a.title.localeCompare(b.title);
    if (!a.date) return 1;
    if (!b.date) return -1;
    return b.date.localeCompare(a.date);
  });
  
  fs.writeFileSync(outputPath, JSON.stringify(articles, null, 2), 'utf-8');
  console.log('Successfully processed articles and created src/articles-data.json');
}

processArticles();