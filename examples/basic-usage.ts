import { WordPressClient } from '../src';

/**
 * Example: Basic WordPress API client usage
 */
async function example() {
  // Initialize client
  const wp = new WordPressClient({
    baseURL: 'https://sanny.test',
  });

  try {
    // Fetch recent posts
    console.log('Fetching posts...');
    const { data: posts, headers } = await wp.getPosts({
      per_page: 5,
      orderby: 'date',
      order: 'desc',
    });

    console.log(`Found ${posts.length} posts:`);
    posts.forEach((post) => {
      console.log(`- ${post.title.rendered} (ID: ${post.id})`);
    });

    // Show pagination info
    console.log('\nPagination:');
    console.log(`- Total posts: ${headers['x-wp-total']}`);
    console.log(`- Total pages: ${headers['x-wp-totalpages']}`);

    // Get a single post
    if (posts.length > 0) {
      const { data: post } = await wp.getPost(posts[0].id);
      console.log(`\nFull post content:`);
      console.log(`Title: ${post.title.rendered}`);
      console.log(`Excerpt: ${post.excerpt.rendered}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run example
if (require.main === module) {
  example();
}

export { example };
