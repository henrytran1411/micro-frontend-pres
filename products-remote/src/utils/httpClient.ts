export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
    return response.json();
  }
}

export const httpClient = new HttpClient(process.env.NEXT_PUBLIC_API_URL || '');
