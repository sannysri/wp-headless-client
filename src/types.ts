/**
 * WordPress REST API Client Configuration
 */
export interface WPClientConfig {
  baseURL: string;
  auth?: {
    username?: string;
    password?: string;
    token?: string;
  };
  timeout?: number;
  headers?: Record<string, string>;
}

/**
 * WordPress Post object
 */
export interface WPPost {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: 'publish' | 'future' | 'draft' | 'pending' | 'private';
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: 'open' | 'closed';
  ping_status: 'open' | 'closed';
  sticky: boolean;
  template: string;
  format: string;
  meta: Record<string, any>;
  categories: number[];
  tags: number[];
}

/**
 * Query parameters for posts
 */
export interface WPPostsQuery {
  page?: number;
  per_page?: number;
  search?: string;
  after?: string;
  author?: number | number[];
  author_exclude?: number | number[];
  before?: string;
  exclude?: number | number[];
  include?: number | number[];
  offset?: number;
  order?: 'asc' | 'desc';
  orderby?: 'author' | 'date' | 'id' | 'include' | 'modified' | 'parent' | 'relevance' | 'slug' | 'title';
  slug?: string | string[];
  status?: string | string[];
  categories?: number | number[];
  categories_exclude?: number | number[];
  tags?: number | number[];
  tags_exclude?: number | number[];
  sticky?: boolean;
}

/**
 * API Response wrapper
 */
export interface WPAPIResponse<T> {
  data: T;
  headers: Record<string, string>;
  status: number;
}

/**
 * Error response from WordPress API
 */
export interface WPAPIError {
  code: string;
  message: string;
  data: {
    status: number;
  };
}
