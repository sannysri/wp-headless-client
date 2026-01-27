# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-27

### Added
- Initial release of wp-headless-client
- TypeScript-first WordPress REST API client
- Zero dependencies, 7KB bundle size
- Full type definitions for WordPress REST API
- Authentication support (Basic Auth, JWT Bearer tokens)
- Posts API endpoints (GET, POST, PUT, DELETE)
- Pagination header extraction
- Native fetch API with timeout support
- Comprehensive error handling
- Usage examples for Node.js, React, and Next.js
- Full documentation and README

### Features
- `WordPressClient` class with configurable options
- `getPosts(query?)` - Fetch posts with filters
- `getPost(id)` - Get single post by ID
- `createPost(data)` - Create new post (requires auth)
- `updatePost(id, data)` - Update existing post (requires auth)
- `deletePost(id, force?)` - Delete post (requires auth)
- TypeScript interfaces: `WPPost`, `WPPostsQuery`, `WPAPIResponse`, `WPAPIError`
- Query filtering: pagination, search, ordering, categories, tags
- Custom headers support
- Configurable timeout (default 30s)

### Documentation
- Complete README with installation and usage guide
- API reference
- TypeScript examples
- React component examples
- Next.js Server Component example
- CONTRIBUTING.md for contributors
- MIT LICENSE

[1.0.0]: https://github.com/sannysri/wp-headless-client/releases/tag/v1.0.0
