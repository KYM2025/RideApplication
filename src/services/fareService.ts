/**
 * Fare Service for estimating ride costs
 */

import { ApiService, simulateDelay } from './apiService';
import { Fare, Location, RideType, Route } from '../types/models';
import { routeService } from './routeService';

// Base rates for different ride types
const BASE_RATES = {
  [RideType.STANDARD]: { base: 5.0, perKm: 1.5, perMinute: 0.2 },
  [RideType.BLESSED_XL]: { base: 8.0, perKm: 2.0, perMinute: 0.3 },
  [RideType.LOCAL_LO]: { base: 3.0, perKm: 1.0, perMinute: 0.15 }
};

// Surge multipliers for different times of day
const getSurgeMultiplier = (): number => {
  const hour = new Date().getHours();
  
  // Higher surge during rush hours (7-9 AM and 5-7 PM)
  if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19)) {
    return 1.5;
  }
  
  // Moderate surge during daytime (9 AM - 5 PM)
  if (hour > 9 && hour < 17) {
    return 1.2;
  }
  
  // Moderate surge during evening (7 PM - 11 PM)
  if (hour > 19 && hour < 23) {
    return 1.3;
  }
  
  // Base rate during late night/early morning
  return 1.0;
};

export class FareService extends ApiService {
  constructor() {
    super();
  }

  /**
   * Estimate fare for a ride
   * @param origin The starting location
   * @param destination The ending location
   * @param rideType The selected ride type
   * @param route Optional pre-calculated route
   * @returns Promise with fare data
   */
  async estimateFare(
    origin: Location, 
    destination: Location, 
    rideType: RideType = RideType.STANDARD,
    route?: Route
  ): Promise<Fare> {
    try {
      await simulateDelay(600); // Simulate network delay
      
      // Get route if not provided
      const routeData = route || await routeService.calculateRoute(origin, destination);
      
      // Get rate for the selected ride type
      const rate = BASE_RATES[rideType];
      
      // Calculate fare components
      const baseFare = rate.base;
      const distanceFare = routeData.distance * rate.perKm;
      const timeFare = routeData.duration * rate.perMinute;
      
      // Apply surge pricing if applicable
      const surgeMultiplier = getSurgeMultiplier();
      const surgeFare = surgeMultiplier > 1.0 ? 
        (baseFare + distanceFare + timeFare) * (surgeMultiplier - 1.0) : 
        0;
      
      // Calculate total fare
      const totalFare = baseFare + distanceFare + timeFare + surgeFare;
      
      // Round to 2 decimal places
      const roundToTwo = (num: number) => Math.round(num * 100) / 100;
      
      const fare: Fare = {
        total: roundToTwo(totalFare),
        breakdown: {
          base: roundToTwo(baseFare),
          distance: roundToTwo(distanceFare),
          time: roundToTwo(timeFare),
          surge: roundToTwo(surgeFare)
        },
        currency: 'USD'
      };
      
      console.log('Estimated fare:', fare);
      return fare;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Compare fares for different ride types
   * @param origin The starting location
   * @param destination The ending location
   * @returns Promise with fare comparison for all ride types
   */
  async compareFares(origin: Location, destination: Location): Promise<Record<RideType, Fare>> {
    try {
      await simulateDelay(800);
      
      // Get route once to reuse for all estimates
      const route = await routeService.calculateRoute(origin, destination);
      
      // Calculate fare for each ride type
      const standardFare = await this.estimateFare(origin, destination, RideType.STANDARD, route);
      const xlFare = await this.estimateFare(origin, destination, RideType.BLESSED_XL, route);
      const localFare = await this.estimateFare(origin, destination, RideType.LOCAL_LO, route);
      
      const comparison = {
        [RideType.STANDARD]: standardFare,
        [RideType.BLESSED_XL]: xlFare,
        [RideType.LOCAL_LO]: localFare
      };
      
      console.log('Fare comparison:', comparison);
      return comparison;
    } catch (error) {
      return this.handleError(error);
    }
  }
}

// Create a singleton instance
export const fareService = new FareService();