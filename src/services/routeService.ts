/**
 * Route Service for calculating routes between locations
 */

import { ApiService, simulateDelay } from './apiService';
import { Location, Route } from '../types/models';

// Utility function to calculate distance between two points using Haversine formula
const calculateDistance = (origin: Location, destination: Location): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (destination.lat - origin.lat) * Math.PI / 180;
  const dLon = (destination.lng - origin.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(origin.lat * Math.PI / 180) * Math.cos(destination.lat * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return distance;
};

// Utility function to generate a fake polyline
const generatePolyline = (origin: Location, destination: Location): string => {
  // In a real app, this would be an encoded polyline from a routing API
  // For mock purposes, we'll create a simple string representation
  const midpoint1 = {
    lat: origin.lat + (destination.lat - origin.lat) * 0.33 + (Math.random() - 0.5) * 0.01,
    lng: origin.lng + (destination.lng - origin.lng) * 0.33 + (Math.random() - 0.5) * 0.01
  };
  
  const midpoint2 = {
    lat: origin.lat + (destination.lat - origin.lat) * 0.66 + (Math.random() - 0.5) * 0.01,
    lng: origin.lng + (destination.lng - origin.lng) * 0.66 + (Math.random() - 0.5) * 0.01
  };
  
  // Create a simple polyline with origin, midpoints, and destination
  return `${origin.lat},${origin.lng}|${midpoint1.lat},${midpoint1.lng}|${midpoint2.lat},${midpoint2.lng}|${destination.lat},${destination.lng}`;
};

export class RouteService extends ApiService {
  constructor() {
    super();
  }

  /**
   * Calculate a route between origin and destination
   * @param origin The starting location
   * @param destination The ending location
   * @returns Promise with route data
   */
  async calculateRoute(origin: Location, destination: Location): Promise<Route> {
    try {
      await simulateDelay(1000); // Simulate network delay
      
      // In a real app, this would call a routing API like Google Directions
      // For mock purposes, we'll calculate a simple route
      
      // Calculate distance using Haversine formula
      const distance = calculateDistance(origin, destination);
      
      // Estimate duration based on distance (assuming average speed of 30 km/h)
      const duration = (distance / 30) * 60; // Convert to minutes
      
      // Generate a fake polyline
      const polyline = generatePolyline(origin, destination);
      
      const route: Route = {
        polyline,
        eta: Math.round(duration), // Round to nearest minute
        distance: Math.round(distance * 10) / 10, // Round to 1 decimal place
        duration: Math.round(duration)
      };
      
      console.log('Calculated route:', route);
      return route;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Decode a polyline into an array of coordinates
   * @param polyline The encoded polyline
   * @returns Array of coordinate pairs [lat, lng]
   */
  decodePolyline(polyline: string): [number, number][] {
    // In a real app, this would use a proper polyline decoder
    // For our mock polyline format, we'll just split and parse
    const points = polyline.split('|');
    return points.map(point => {
      const [lat, lng] = point.split(',').map(Number);
      return [lat, lng];
    });
  }

  /**
   * Get ETA for a route
   * @param origin The starting location
   * @param destination The ending location
   * @returns Promise with ETA in minutes
   */
  async getETA(origin: Location, destination: Location): Promise<number> {
    try {
      await simulateDelay(300);
      
      // In a real app, this would call a routing API
      // For mock purposes, we'll calculate a simple ETA
      const distance = calculateDistance(origin, destination);
      const duration = (distance / 30) * 60; // Convert to minutes
      
      const eta = Math.round(duration);
      console.log('Calculated ETA:', eta, 'minutes');
      return eta;
    } catch (error) {
      return this.handleError(error);
    }
  }
}

// Create a singleton instance
export const routeService = new RouteService();