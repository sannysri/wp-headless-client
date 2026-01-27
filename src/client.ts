import {
  WPClientConfig,
  WPAPIResponse,
  WPAPIError,
  WPPost,
  WPPostsQuery,
} from './types';

/**
 * WordPress REST API Client
 */
export class WordPressClient {
  private config: WPClientConfig;

  constructor(config: WPClientConfig) {
    this.config = {
      timeout: 30000,
      ...config,
      baseURL: config.baseURL.replace(/\/$/, ''), // Remove trailing slash
    };
  }

  /**
   * Make authenticated request to WordPress API
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<WPAPIResponse<T>> {
    const url = `${this.config.baseURL}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...this.config.headers,
      ...(options.headers as Record<string, string>),
    };

    // Add authentication
    if (this.config.auth) {
      if (this.config.auth.token) {
        headers['Authorization'] = `Bearer ${this.config.auth.token}`;
      } else if (this.config.auth.username && this.config.auth.password) {
        const credentials = btoa(
          `${this.config.auth.username}:${this.config.auth.password}`
        );
        headers['Authorization'] = `Basic ${credentials}`;
      }
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        this.config.timeout
      );

      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Extract headers
      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      // Handle error responses
      if (!response.ok) {
        const error = await response.json() as WPAPIError;
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      const data = await response.json() as T;

      return {
        data,
        headers: responseHeaders,
        status: response.status,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`WordPress API Error: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Build query string from parameters
   */
  private buildQueryString(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((v) => searchParams.append(key, String(v)));
        } else {
          searchParams.append(key, String(value));
        }
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : '';
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<WPAPIResponse<T>> {
    const queryString = params ? this.buildQueryString(params) : '';
    return this.request<T>(`${endpoint}${queryString}`, { method: 'GET' });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data: any): Promise<WPAPIResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data: any): Promise<WPAPIResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<WPAPIResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // === Posts Endpoints ===

  /**
   * Get all posts with optional filters
   */
  async getPosts(query?: WPPostsQuery): Promise<WPAPIResponse<WPPost[]>> {
    return this.get<WPPost[]>('/wp-json/wp/v2/posts', query);
  }

  /**
   * Get a single post by ID
   */
  async getPost(id: number): Promise<WPAPIResponse<WPPost>> {
    return this.get<WPPost>(`/wp-json/wp/v2/posts/${id}`);
  }

  /**
   * Create a new post
   */
  async createPost(data: Partial<WPPost>): Promise<WPAPIResponse<WPPost>> {
    return this.post<WPPost>('/wp-json/wp/v2/posts', data);
  }

  /**
   * Update an existing post
   */
  async updatePost(id: number, data: Partial<WPPost>): Promise<WPAPIResponse<WPPost>> {
    return this.put<WPPost>(`/wp-json/wp/v2/posts/${id}`, data);
  }

  /**
   * Delete a post
   */
  async deletePost(id: number, force: boolean = false): Promise<WPAPIResponse<WPPost>> {
    const endpoint = `/wp-json/wp/v2/posts/${id}${force ? '?force=true' : ''}`;
    return this.delete<WPPost>(endpoint);
  }
}
