# Contributing to wp-headless-client

Thank you for your interest in contributing! 🎉

## Getting Started

1. **Fork the repository**
2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/wp-headless-client.git
   cd wp-headless-client
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Build the project:**
   ```bash
   npm run build
   ```

## Development Workflow

### Making Changes

1. **Create a new branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** in the `src/` directory

3. **Build and test:**
   ```bash
   npm run build
   npm run watch  # For development
   ```

4. **Test your changes:**
   - Run the test suite (once implemented)
   - Test with a real WordPress site
   - Verify TypeScript types compile

### Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Run `npm run build` to ensure no TypeScript errors
- Keep bundle size small (current: 7KB)

### Commit Messages

Use clear, descriptive commit messages:
```
feat: add support for custom post types
fix: correct pagination header extraction
docs: update README with new examples
```

## Pull Request Process

1. **Update documentation** if needed (README.md, examples/)
2. **Update CHANGELOG.md** with your changes
3. **Ensure the build passes:** `npm run build`
4. **Push to your fork** and submit a pull request
5. **Wait for review** - we'll try to respond within 48 hours

### PR Guidelines

- Title: Clear description of what the PR does
- Description: 
  - What changed?
  - Why was this change needed?
  - How was it tested?
- Link any related issues

## What to Contribute

### High Priority
- [ ] Additional WordPress endpoints (pages, media, categories, tags)
- [ ] React hooks (usePost, usePosts, useAuth)
- [ ] Test suite (Jest or Vitest)
- [ ] Better error handling and retry logic
- [ ] Caching layer

### Medium Priority
- [ ] Custom post type support
- [ ] Media upload helpers
- [ ] Batch request support
- [ ] Request interceptors

### Documentation
- [ ] More usage examples
- [ ] TypeScript best practices guide
- [ ] Migration guide from wpapi
- [ ] Video tutorials

## Reporting Issues

Found a bug? Have a feature request?

1. **Search existing issues** first
2. **Create a new issue** with:
   - Clear title
   - Detailed description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Your environment (Node version, OS, etc.)

## Questions?

- Open a GitHub Discussion
- Tag issues with `question` label
- Email: contact@sanny.dev

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for helping make wp-headless-client better!** 🚀
