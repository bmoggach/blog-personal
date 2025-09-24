import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
  const posts = await getCollection('blog');
  return rss({
    title: 'Bradley Moggach Blog',
    description: 'Thoughts on web development, cycling, sourdough, and craft',
    site: context.site || 'https://blog.moggach.dev',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      categories: post.data.tags || [],
      author: 'bradley@moggach.dev (Bradley Moggach)',
    })),
    customData: `<language>en-us</language>
<copyright>Copyright ${new Date().getFullYear()} Bradley Moggach</copyright>
<webMaster>bradley@moggach.dev (Bradley Moggach)</webMaster>
<managingEditor>bradley@moggach.dev (Bradley Moggach)</managingEditor>
<generator>Astro</generator>
<docs>https://www.rssboard.org/rss-specification</docs>`,
  });
}