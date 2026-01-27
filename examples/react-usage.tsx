import { useState, useEffect } from 'react';
import { WordPressClient, WPPost } from 'wp-headless-client';

/**
 * Example: React component using the WordPress client
 * Note: This is a demo - React hooks will be built into the package in Phase 2
 */

const wp = new WordPressClient({
  baseURL: 'https://your-wordpress-site.com',
});

export function BlogPosts() {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data } = await wp.getPosts({
          per_page: 10,
          orderby: 'date',
        });
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Recent Posts</h1>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title.rendered}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          <a href={post.link}>Read more →</a>
        </article>
      ))}
    </div>
  );
}

/**
 * Example: Next.js Server Component (App Router)
 */
export async function BlogPostsServer() {
  const { data: posts } = await wp.getPosts({
    per_page: 10,
  });

  return (
    <div>
      <h1>Recent Posts</h1>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title.rendered}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
        </article>
      ))}
    </div>
  );
}
