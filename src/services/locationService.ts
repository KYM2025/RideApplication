/**
 * Location Service for geocoding functionality
 */

import { ApiService, simulateDelay } from './apiService';
import { Location } from '../types/models';

// Sample locations for suggestions
const SAMPLE_LOCATIONS: Location[] = [
  { lat: 40.7128, lng: -74.0060, address: '123 Broadway, New York, NY', name: 'Home' },
  { lat: 40.7580, lng: -73.9855, address: '30 Rockefeller Plaza, New York, NY', name: 'Work' },
  { lat: 40.7484, lng: -73.9857, address: '350 5th Ave, New York, NY', name: 'Empire State Building' },
  { lat: 40.7527, lng: -73.9772, address: '109 E 42nd St, New York, NY', name: 'Grand Central Terminal' },
  { lat: 40.7516, lng: -73.9776, address: '200 Park Ave, New York, NY', name: 'MetLife Building' }
];

export class LocationService extends ApiService {
  constructor() {
    super();
  }

  /**
   * Resolve an address to coordinates (geocoding)
   * @param address The address to geocode
   * @returns Promise with location data
   */
  async resolveAddress(address: string): Promise<Location> {
    try {
      await simulateDelay(700); // Simulate network delay
      
      // In a real app, this would call a geocoding API
      // For mock purposes, we'll return a random location with the address
      const randomIndex = Math.floor(Math.random() * SAMPLE_LOCATIONS.length);
      const baseLocation = SAMPLE_LOCATIONS[randomIndex];
      
      // Add some randomness to the coordinates to simulate different locations
      const location: Location = {
        lat: baseLocation.lat + (Math.random() - 0.5) * 0.01,
        lng: baseLocation.lng + (Math.random() - 0.5) * 0.01,
        address: address || baseLocation.address
      };
      
      console.log('Resolved address:', address, 'to coordinates:', location);
      return location;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get the current location using browser geolocation
   * @returns Promise with location data
   */
  async getCurrentLocation(): Promise<Location> {
    try {
      // In a real app, this would use the browser's geolocation API
      // For mock purposes, we'll return a fixed location
      await simulateDelay(500);
      
      const location: Location = {
        lat: 40.7128,
        lng: -74.0060,
        address: 'Current Location',
        name: 'Current Location'
      };
      
      console.log('Current location:', location);
      return location;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get location suggestions based on partial input
   * @param input Partial address input
   * @returns Promise with array of location suggestions
   */
  async getSuggestions(input: string): Promise<Location[]> {
    try {
      await simulateDelay(300);
      
      // Filter locations based on input
      // In a real app, this would call an autocomplete API
      const suggestions = SAMPLE_LOCATIONS.filter(location => 
        location.address?.toLowerCase().includes(input.toLowerCase()) ||
        location.name?.toLowerCase().includes(input.toLowerCase())
      );
      
      console.log('Location suggestions for:', input, suggestions);
      return suggestions;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get recent locations (from history)
   * @returns Promise with array of recent locations
   */
  async getRecentLocations(): Promise<Location[]> {
    try {
      await simulateDelay(200);
      
      // In a real app, this would fetch from local storage or user history API
      // For mock purposes, we'll return a subset of sample locations
      const recentLocations = SAMPLE_LOCATIONS.slice(0, 3);
      
      console.log('Recent locations:', recentLocations);
      return recentLocations;
    } catch (error) {
      return this.handleError(error);
    }
  }
}

// Create a singleton instance
export const locationService = new LocationService();