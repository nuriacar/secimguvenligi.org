import type { APIRoute } from 'astro';

const mdxRaw = import.meta.glob('./*.mdx', {
  query: '?raw',
  eager: true,
  import: 'default',
});

const mdxModules = import.meta.glob('./*.mdx', { eager: true });

const astroRaw = import.meta.glob('./*.astro', {
  query: '?raw',
  eager: true,
  import: 'default',
});

interface PageData {
  title: string;
  url: string;
  content: string;
}

function stripToPlainText(raw: string): string {
  return raw
    .replace(/^---[\s\S]*?---\n?/m, '')
    .replace(/^import .*$/gm, '')
    .replace(/<(?:Alert|Accordion|DoDont|Checklist|Scenario|DfdDiagram|ThreatTreeDiagram)[^>]*\/?>/gi, ' ')
    .replace(/<\/?(?:ul|ol|li|div|span|table|thead|tbody|tr|th|td|caption|details|summary|strong|em|a|p|blockquote|h[1-6]|img|br|hr|mark|code|pre|sub|sup|section|form|button)[^>]*>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ')
    .replace(/\{["'].*?["']\}/g, ' ')
    .replace(/\{[^}]*\}/g, ' ')
    .replace(/[#*_`~|>\[\](){}!]/g, ' ')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 4000);
}

function extractAstroTitle(raw: string): string {
  const h1Match = raw.match(/<h1[^>]*>(?:<[^>]+>)*([^<]+)/);
  if (h1Match) return h1Match[1].trim();
  const titleMatch = raw.match(/title="([^"]+)"/);
  if (titleMatch) return titleMatch[1].trim();
  return '';
}

export const GET: APIRoute = async () => {
  const pages: PageData[] = [];

  for (const [filePath, mod] of Object.entries(mdxModules)) {
    const m = mod as any;
    if (!m?.frontmatter) continue;

    const slug = filePath.replace(/^\.\//, '').replace(/\.mdx$/, '');
    const url = '/' + slug + '/';
    const title = m.frontmatter.title || slug;

    let raw = mdxRaw[filePath] as string || '';
    if (typeof raw !== 'string') {
      try { raw = (raw as any)?.default || ''; } catch { raw = ''; }
    }

    const content = stripToPlainText(raw);
    pages.push({ title, url, content });
  }

  for (const [filePath, rawContent] of Object.entries(astroRaw)) {
    const slug = filePath.replace(/^\.\//, '').replace(/\.astro$/, '');
    if (slug === 'index' || slug === '404') continue;

    const url = '/' + slug + '/';
    let raw = rawContent as string || '';
    if (typeof raw !== 'string') {
      try { raw = (raw as any)?.default || ''; } catch { raw = ''; }
    }

    const title = extractAstroTitle(raw);
    if (!title) continue;

    const content = stripToPlainText(raw);
    pages.push({ title, url, content });
  }

  return new Response(JSON.stringify(pages), {
    headers: { 'Content-Type': 'application/json' },
  });
};
