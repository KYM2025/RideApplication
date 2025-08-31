/**
 * Ride Request Service for booking rides
 */

import { ApiService, simulateDelay } from './apiService';
import { 
  Driver, 
  Fare, 
  Location, 
  RideRequest, 
  RideResponse, 
  RideType 
} from '../types/models';
import { driversService } from './driversService';

export class RideRequestService extends ApiService {
  constructor() {
    super();
  }

  /**
   * Submit a ride request
   * @param request The ride request data
   * @returns Promise with ride response
   */
  async requestRide(request: RideRequest): Promise<RideResponse> {
    try {
      await simulateDelay(1500); // Simulate network delay
      
      // In a real app, this would submit the request to a backend API
      // For mock purposes, we'll create a simulated response
      
      // Generate a unique ride ID
      const rideId = `ride-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      
      // Get a random driver near the pickup location
      const nearbyDrivers = await driversService.getNearbyDrivers(
        request.pickup, 
        request.rideType
      );
      
      // Select the closest driver (in a real app, this would be done by the backend)
      const driver = nearbyDrivers.length > 0 ? 
        nearbyDrivers[0] : 
        await this.createFallbackDriver(request.pickup, request.rideType);
      
      // Calculate estimated pickup time
      const estimatedPickupTime = new Date();
      estimatedPickupTime.setMinutes(
        estimatedPickupTime.getMinutes() + (driver.eta || 5)
      );
      
      const response: RideResponse = {
        rideId,
        status: 'accepted',
        driver,
        estimatedPickupTime
      };
      
      console.log('Ride request submitted:', request);
      console.log('Ride response:', response);
      
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get the status of a ride
   * @param rideId The ride ID
   * @returns Promise with ride response
   */
  async getRideStatus(rideId: string): Promise<RideResponse> {
    try {
      await simulateDelay(500);
      
      // In a real app, this would fetch the ride status from a backend API
      // For mock purposes, we'll create a simulated response
      
      // Generate a random status based on the ride ID
      // This ensures consistent responses for the same ride ID
      const statusOptions: RideResponse['status'][] = [
        'pending', 'accepted', 'in_progress', 'completed'
      ];
      
      const rideIdSum = rideId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
      const statusIndex = rideIdSum % statusOptions.length;
      const status = statusOptions[statusIndex];
      
      // Create a driver if the ride is accepted or in progress
      const driver = (status === 'accepted' || status === 'in_progress') ? 
        await this.createFallbackDriver({ lat: 40.7128, lng: -74.0060 }) : 
        undefined;
      
      // Calculate estimated pickup time
      const estimatedPickupTime = new Date();
      if (status === 'pending' || status === 'accepted') {
        estimatedPickupTime.setMinutes(
          estimatedPickupTime.getMinutes() + (driver?.eta || 5)
        );
      }
      
      const response: RideResponse = {
        rideId,
        status,
        driver,
        estimatedPickupTime: (status === 'pending' || status === 'accepted') ? 
          estimatedPickupTime : 
          undefined
      };
      
      console.log('Ride status:', response);
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Cancel a ride
   * @param rideId The ride ID
   * @returns Promise with success status
   */
  async cancelRide(rideId: string): Promise<{ success: boolean }> {
    try {
      await simulateDelay(800);
      
      // In a real app, this would send a cancellation request to a backend API
      // For mock purposes, we'll simulate a successful cancellation
      
      console.log('Ride cancelled:', rideId);
      return { success: true };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Create a fallback driver when no nearby drivers are available
   * @param location The pickup location
   * @param rideType The ride type
   * @returns A driver object
   */
  private async createFallbackDriver(
    location: Location, 
    rideType: RideType = RideType.STANDARD
  ): Promise<Driver> {
    // Create a driver near the pickup location
    const driver: Driver = {
      id: `driver-fallback-${Date.now()}`,
      lat: location.lat + (Math.random() - 0.5) * 0.02,
      lng: location.lng + (Math.random() - 0.5) * 0.02,
      type: rideType,
      name: 'Available Driver',
      rating: 4.8,
      vehicle: 'Toyota Camry',
      eta: 5 + Math.floor(Math.random() * 5) // 5-10 minutes
    };
    
    return driver;
  }
}

// Create a singleton instance
export const rideRequestService = new RideRequestService();