export interface BlogPost {
  title: string;
  description: string;
  pubDate: Date;
  author: string;
  category: string;
  tags: string[];
  draft?: boolean;
  slug: string;
  Content: any;
}

const allBlogPosts = import.meta.glob<{ frontmatter: Omit<BlogPost, 'slug' | 'Content'> }>('../pages/blog/*.md', { eager: true });

export function getSortedPosts(): BlogPost[] {
  return Object.entries(allBlogPosts)
    .map(([path, module]) => {
      const filename = path.split('/').pop()?.replace('.md', '') || '';
      return {
        ...module.frontmatter,
        pubDate: new Date(module.frontmatter.pubDate),
        slug: filename,
        Content: null
      };
    })
    .filter(post => !post.draft)
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
}

export function getLatestPosts(count: number = 3): BlogPost[] {
  return getSortedPosts().slice(0, count);
}
