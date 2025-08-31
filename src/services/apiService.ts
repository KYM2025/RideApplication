/**
 * Base API service with common functionality for all services
 */

// Simulate API delay
export const simulateDelay = (ms: number = 500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Base API service class
export class ApiService {
  protected baseUrl: string;

  constructor(baseUrl: string = 'https://api.example.com') {
    this.baseUrl = baseUrl;
  }

  // Generic GET request
  protected async get<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    // In a real app, this would make an actual API call
    // For now, we'll just simulate a delay and return mock data
    await simulateDelay();
    
    console.log(`GET ${this.baseUrl}${endpoint}`, params);
    
    // The actual implementation would return data from the API
    // This will be overridden by the specific service implementations
    throw new Error('Method not implemented');
  }

  // Generic POST request
  protected async post<T>(endpoint: string, data: any): Promise<T> {
    // In a real app, this would make an actual API call
    // For now, we'll just simulate a delay and return mock data
    await simulateDelay();
    
    console.log(`POST ${this.baseUrl}${endpoint}`, data);
    
    // The actual implementation would return data from the API
    // This will be overridden by the specific service implementations
    throw new Error('Method not implemented');
  }

  // Generic error handler
  protected handleError(error: any): never {
    // Log the error
    console.error('API Error:', error);
    
    // In a real app, you might want to do more sophisticated error handling
    throw error;
  }
}