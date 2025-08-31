import React, { useState } from 'react';
import './BookRide.css';
import mapImage from '../../assets/BookaRide.jpg';
import { RideType } from '../../types/models';

const BookRide: React.FC = () => {
  const [selectedRideType, setSelectedRideType] = useState<RideType>(RideType.STANDARD);

  const handleRideTypeSelect = (rideType: RideType) => {
    setSelectedRideType(rideType);
  };

  return (
    <div className="book-ride">
      {/* Header */}
      <div className="header">
        <div className="logo">Straight-Way</div>
      </div>

      {/* Pickup Location */}
      <div className="location-input">
        <div className="location-icon pickup-icon">
          <span>🔴</span>
        </div>
        <div className="location-details">
          <div className="location-label">Pickup Location</div>
        </div>
        <button className="location-action">Edit</button>
      </div>

      {/* Dropoff Location */}
      <div className="location-input">
        <div className="location-icon dropoff-icon">
          <span>🔵</span>
        </div>
        <div className="location-details">
          <div className="location-label">Dropoff Location</div>
        </div>
        <button className="location-action">Add</button>
      </div>

      {/* Map */}
      <div className="map-container">
        <img src={mapImage} alt="Route Map" className="map-image" />
      </div>

      {/* ETA Display */}
      <div className="eta-display">
        Estimated Time: 3-5 mins
      </div>

      {/* Ride Types */}
      <div className="ride-types">
        <button 
          className={`ride-type ${selectedRideType === RideType.STANDARD ? 'active' : ''}`}
          onClick={() => handleRideTypeSelect(RideType.STANDARD)}
        >
          Standard
        </button>
        <button 
          className={`ride-type ${selectedRideType === RideType.BLESSED_XL ? 'active' : ''}`}
          onClick={() => handleRideTypeSelect(RideType.BLESSED_XL)}
        >
          Blessed XL
        </button>
        <button 
          className={`ride-type ${selectedRideType === RideType.LOCAL_LO ? 'active' : ''}`}
          onClick={() => handleRideTypeSelect(RideType.LOCAL_LO)}
        >
          Local Lo
        </button>
      </div>

      {/* Notes */}
      <div className="notes-input">
        <div className="notes-label">Notes / Extras?</div>
        <button className="location-action">Add</button>
      </div>

      {/* Book Button */}
      <button className="book-button">
        Book This Ride
      </button>

      {/* Footer */}
      <div className="footer-text">
        Commit your way...
      </div>
    </div>
  );
};

export default BookRide;