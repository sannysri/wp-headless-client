# WP Headless Client

Modern, TypeScript-first WordPress REST API client for headless applications.

## Features

- ✅ **TypeScript First** - Full type safety with auto-completion
- ✅ **Lightweight** - Zero dependencies, ~5-10KB bundle size
- ✅ **Modern** - Uses native `fetch` API
- ✅ **Authentication** - Supports JWT, Basic Auth, Application Passwords
- ✅ **Framework Agnostic** - Works with React, Next.js, Vue, or vanilla JS
- ✅ **Pagination** - Built-in support for WordPress pagination headers
- ✅ **Error Handling** - Typed error responses

## Installation

```bash
npm install wp-headless-client
```

## Quick Start

```typescript
import { WordPressClient } from 'wp-headless-client';

// Initialize client
const wp = new WordPressClient({
  baseURL: 'https://your-wordpress-site.com',
});

// Fetch posts
const { data: posts } = await wp.getPosts({
  per_page: 10,
  orderby: 'date',
});

console.log(posts);
```

## Authentication

### Application Password (Recommended)

```typescript
const wp = new WordPressClient({
  baseURL: 'https://your-site.com',
  auth: {
    username: 'your-username',
    password: 'xxxx xxxx xxxx xxxx xxxx xxxx', // Application password
  },
});
```

### JWT Token

```typescript
const wp = new WordPressClient({
  baseURL: 'https://your-site.com',
  auth: {
    token: 'your-jwt-token',
  },
});
```

## Usage Examples

### Get Posts with Filters

```typescript
const { data: posts, headers } = await wp.getPosts({
  per_page: 10,
  page: 1,
  categories: [5, 10],
  orderby: 'date',
  order: 'desc',
  search: 'headless',
});

// Pagination info from headers
const totalPages = parseInt(headers['x-wp-totalpages']);
const totalPosts = parseInt(headers['x-wp-total']);
```

### Get Single Post

```typescript
const { data: post } = await wp.getPost(123);

console.log(post.title.rendered);
console.log(post.content.rendered);
```

### Create Post

```typescript
const { data: newPost } = await wp.createPost({
  title: { rendered: 'My New Post' },
  content: { rendered: '<p>Post content</p>' },
  status: 'publish',
});
```

### Update Post

```typescript
const { data: updated } = await wp.updatePost(123, {
  title: { rendered: 'Updated Title' },
});
```

### Delete Post

```typescript
// Move to trash
await wp.deletePost(123);

// Permanently delete
await wp.deletePost(123, true);
```

## Configuration Options

```typescript
interface WPClientConfig {
  baseURL: string;          // WordPress site URL (required)
  auth?: {
    username?: string;      // WordPress username
    password?: string;      // Application password
    token?: string;         // JWT token
  };
  timeout?: number;         // Request timeout in ms (default: 30000)
  headers?: Record<string, string>;  // Custom headers
}
```

## TypeScript Support

All WordPress REST API types are included:

```typescript
import type { WPPost, WPPostsQuery, WPAPIResponse } from 'wp-headless-client';

const posts: WPPost[] = [];
const query: WPPostsQuery = {
  per_page: 10,
  orderby: 'date',
};
```

## Error Handling

```typescript
try {
  const { data } = await wp.getPost(999);
} catch (error) {
  console.error('WordPress API Error:', error.message);
}
```

## Roadmap

- [ ] React hooks (`usePost`, `usePosts`, `useAuth`)
- [ ] Support for custom post types
- [ ] Media upload helpers
- [ ] Caching layer
- [ ] Request retry logic

## Why This Package?

The popular `wpapi` package (52K+ weekly downloads) hasn't been updated in 5+ years and lacks TypeScript support. This package provides:

- Modern TypeScript types
- Native `fetch` (no axios dependency)
- Smaller bundle size
- Active maintenance
- Better developer experience

## Contributing

Contributions welcome! Please open an issue or PR on [GitHub](https://github.com/sannysri/wp-headless-client).

## License

MIT © [Sanny Srivastava](https://sanny.dev)

## Links

- [npm package](https://www.npmjs.com/package/wp-headless-client)
- [GitHub repository](https://github.com/sannysri/wp-headless-client)
- [WordPress REST API Docs](https://developer.wordpress.org/rest-api/)
