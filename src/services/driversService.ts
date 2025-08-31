/**
 * Drivers Service for fetching nearby drivers
 */

import { ApiService, simulateDelay } from './apiService';
import { Driver, Location, RideType } from '../types/models';

export class DriversService extends ApiService {
  constructor() {
    super();
  }

  /**
   * Get nearby drivers based on location and ride type
   * @param location The user's location
   * @param rideType The selected ride type
   * @returns Promise with array of nearby drivers
   */
  async getNearbyDrivers(location: Location, rideType?: RideType): Promise<Driver[]> {
    try {
      await simulateDelay(800); // Simulate network delay
      
      // In a real app, this would call an API to get real driver locations
      // For mock purposes, we'll generate random drivers around the given location
      const drivers: Driver[] = [];
      const driverCount = Math.floor(Math.random() * 5) + 3; // 3-7 drivers
      
      for (let i = 0; i < driverCount; i++) {
        // Generate random coordinates around the user's location
        const lat = location.lat + (Math.random() - 0.5) * 0.02;
        const lng = location.lng + (Math.random() - 0.5) * 0.02;
        
        // Assign a random ride type if none specified
        const type = rideType || this.getRandomRideType();
        
        // Create a driver
        const driver: Driver = {
          id: `driver-${i}-${Date.now()}`,
          lat,
          lng,
          type,
          name: this.getRandomDriverName(),
          rating: Math.floor(Math.random() * 5) + 3.5, // Rating between 3.5 and 5
          vehicle: this.getRandomVehicle(type),
          eta: Math.floor(Math.random() * 10) + 1 // ETA between 1 and 10 minutes
        };
        
        drivers.push(driver);
      }
      
      // If ride type is specified, filter drivers by type
      const filteredDrivers = rideType 
        ? drivers.filter(driver => driver.type === rideType)
        : drivers;
      
      console.log('Nearby drivers:', filteredDrivers);
      return filteredDrivers;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get a specific driver by ID
   * @param driverId The driver ID
   * @returns Promise with driver data
   */
  async getDriver(driverId: string): Promise<Driver> {
    try {
      await simulateDelay(300);
      
      // In a real app, this would fetch the driver from an API
      // For mock purposes, we'll create a random driver
      const driver: Driver = {
        id: driverId,
        lat: 40.7128 + (Math.random() - 0.5) * 0.01,
        lng: -74.0060 + (Math.random() - 0.5) * 0.01,
        type: this.getRandomRideType(),
        name: this.getRandomDriverName(),
        rating: Math.floor(Math.random() * 5) + 3.5,
        vehicle: this.getRandomVehicle(),
        eta: Math.floor(Math.random() * 10) + 1
      };
      
      console.log('Driver details:', driver);
      return driver;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Update driver locations (simulate movement)
   * @param drivers Array of drivers to update
   * @returns Promise with updated drivers
   */
  async updateDriverLocations(drivers: Driver[]): Promise<Driver[]> {
    try {
      await simulateDelay(500);
      
      // In a real app, this would fetch updated locations from an API
      // For mock purposes, we'll slightly modify the existing locations
      const updatedDrivers = drivers.map(driver => ({
        ...driver,
        lat: driver.lat + (Math.random() - 0.5) * 0.005,
        lng: driver.lng + (Math.random() - 0.5) * 0.005,
        eta: Math.max(1, driver.eta ? driver.eta - 1 : 5) // Decrease ETA by 1 min (min 1)
      }));
      
      console.log('Updated driver locations:', updatedDrivers);
      return updatedDrivers;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Helper methods for generating random driver data
  private getRandomRideType(): RideType {
    const types = [RideType.STANDARD, RideType.BLESSED_XL, RideType.LOCAL_LO];
    return types[Math.floor(Math.random() * types.length)];
  }

  private getRandomDriverName(): string {
    const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia'];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    return `${firstName} ${lastName}`;
  }

  private getRandomVehicle(type?: RideType): string {
    if (type === RideType.STANDARD) {
      const cars = ['Toyota Camry', 'Honda Accord', 'Nissan Altima', 'Ford Fusion', 'Hyundai Sonata'];
      return cars[Math.floor(Math.random() * cars.length)];
    } else if (type === RideType.BLESSED_XL) {
      const suvs = ['Toyota Highlander', 'Honda Pilot', 'Ford Explorer', 'Chevrolet Tahoe', 'GMC Yukon'];
      return suvs[Math.floor(Math.random() * suvs.length)];
    } else {
      const economy = ['Toyota Corolla', 'Honda Civic', 'Nissan Sentra', 'Ford Focus', 'Hyundai Elantra'];
      return economy[Math.floor(Math.random() * economy.length)];
    }
  }
}

// Create a singleton instance
export const driversService = new DriversService();