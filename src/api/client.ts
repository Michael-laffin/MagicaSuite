import { handleApiError } from '@utils/error-handler';

interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
}

class ApiClient {
  private baseUrl: string;
  private getAuthToken: () => Promise<string | null>;

  constructor(baseUrl: string, getAuthToken: () => Promise<string | null>) {
    this.baseUrl = baseUrl;
    this.getAuthToken = getAuthToken;
  }

  private async getHeaders(): Promise<Headers> {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    const token = await this.getAuthToken();
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  private buildUrl(endpoint: string, params?: Record<string, string>): string {
    const url = new URL(endpoint, this.baseUrl);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    return url.toString();
  }

  async get<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { params, ...requestConfig } = config;
    const url = this.buildUrl(endpoint, params);
    const headers = await this.getHeaders();

    const response = await fetch(url, {
      method: 'GET',
      headers,
      ...requestConfig,
    });

    await handleApiError(response);
    return response.json();
  }

  async post<T>(endpoint: string, data?: unknown, config: RequestConfig = {}): Promise<T> {
    const { params, ...requestConfig } = config;
    const url = this.buildUrl(endpoint, params);
    const headers = await this.getHeaders();

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: data ? JSON.stringify(data) : undefined,
      ...requestConfig,
    });

    await handleApiError(response);
    return response.json();
  }

  async put<T>(endpoint: string, data?: unknown, config: RequestConfig = {}): Promise<T> {
    const { params, ...requestConfig } = config;
    const url = this.buildUrl(endpoint, params);
    const headers = await this.getHeaders();

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: data ? JSON.stringify(data) : undefined,
      ...requestConfig,
    });

    await handleApiError(response);
    return response.json();
  }

  async delete<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { params, ...requestConfig } = config;
    const url = this.buildUrl(endpoint, params);
    const headers = await this.getHeaders();

    const response = await fetch(url, {
      method: 'DELETE',
      headers,
      ...requestConfig,
    });

    await handleApiError(response);
    return response.json();
  }
}

// Create API client instance
export const createApiClient = (getAuthToken: () => Promise<string | null>) => {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8888';

  return new ApiClient(baseUrl, getAuthToken);
};

// Export types
export type { RequestConfig };
