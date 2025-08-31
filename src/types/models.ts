/**
 * Type definitions for the Book a Ride application
 */

// Location interface for pickup and dropoff points
export interface Location {
  lat: number;
  lng: number;
  address?: string;
  name?: string;
}

// Driver interface for nearby drivers
export interface Driver {
  id: string;
  lat: number;
  lng: number;
  type: RideType;
  name?: string;
  rating?: number;
  vehicle?: string;
  eta?: number;
}

// Route interface for the path between pickup and dropoff
export interface Route {
  polyline: string;
  eta: number;
  distance: number;
  duration: number;
}

// Fare interface for price estimation
export interface Fare {
  total: number;
  breakdown: {
    base: number;
    distance: number;
    time: number;
    surge?: number;
  };
  currency: string;
}

// RideType enum for different ride options
export enum RideType {
  STANDARD = 'Standard',
  BLESSED_XL = 'Blessed XL',
  LOCAL_LO = 'Local Lo'
}

// RideRequest interface for booking a ride
export interface RideRequest {
  pickup: Location;
  dropoff: Location;
  rideType: RideType;
  notes?: string;
  fare?: Fare;
  route?: Route;
}

// Response interface for ride request
export interface RideResponse {
  rideId: string;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  driver?: Driver;
  estimatedPickupTime?: Date;
}

// Notes analysis interface
export interface NotesAnalysis {
  flags: string[];
  accessibility: boolean;
  specialNeeds: string[];
}