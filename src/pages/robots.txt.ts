import type { APIRoute } from 'astro';

const blockedBots = [
  'GPTBot',
  'GPTBot-Trusted',
  'ChatGPT-User',
  'Claude-Web',
  'anthropic-ai',
  'Google-Extended',
  'CCBot',
  'PerplexityBot',
  'Meta-ExternalAgent',
];

export const GET: APIRoute = ({ site }) => {
  const domain = site?.origin || 'https://secimguvenligi.org';
  const lines = [
    ...blockedBots.flatMap((bot) => [`User-agent: ${bot}`, 'Disallow: /', '']),
    'User-agent: *',
    'Allow: /',
    'Allow: /pagefind/',
    '',
    `Sitemap: ${domain}/sitemap-index.xml`,
    '',
  ];
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
