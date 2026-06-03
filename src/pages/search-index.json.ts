import type { APIRoute } from 'astro';

const mdxRaw = import.meta.glob('./*.mdx', {
  query: '?raw',
  eager: true,
  import: 'default',
});

const mdxModules = import.meta.glob('./*.mdx', { eager: true });

interface PageData {
  title: string;
  url: string;
  content: string;
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

    const content = raw
      .replace(/^---[\s\S]*?---\n?/m, '')
      .replace(/^import .*$/gm, '')
      .replace(/<(?:AudienceBadge|Alert|Accordion|DoDontTable|Checklist|Table)[^>]*\/?>/gi, ' ')
      .replace(/<\/?(?:ul|ol|li|div|span|table|thead|tbody|tr|th|td|caption|details|summary|strong|em|a|p|blockquote|h[1-6]|img|br|hr|mark|code|pre|sub|sup)[^>]*>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ')
      .replace(/\{["'].*?["']\}/g, ' ')
      .replace(/\{[^}]*\}/g, ' ')
      .replace(/[#*_`~|>\[\](){}!]/g, ' ')
      .replace(/https?:\/\/\S+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 4000);

    pages.push({ title, url, content });
  }

  return new Response(JSON.stringify(pages), {
    headers: { 'Content-Type': 'application/json' },
  });
};
