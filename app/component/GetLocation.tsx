import React, { useState } from 'react';
import { useMap } from 'react-leaflet';
import { Navigation, Loader2, AlertCircle } from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
}

interface GetLocationProps {
  onLocationFound?: (pos: Location) => void;
}

const GetLocation: React.FC<GetLocationProps> = ({ onLocationFound }) => {
  const map = useMap();
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleGetLocation = () => {
    setStatus('loading');
    setErrorMessage('');

    if (!('geolocation' in navigator)) {
      setStatus('error');
      setErrorMessage("Geolocation is not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation: Location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        // 1. Pass location to parent if callback exists (for marker drawing)
        if (onLocationFound) {
          onLocationFound(newLocation);
        }

        // 2. Fly to the location (Targeting)
        map.flyTo([newLocation.lat, newLocation.lng], 16, { 
          duration: 1.5,
          easeLinearity: 0.25
        });

        setStatus('idle');
      },
      (error) => {
        console.error("Geolocation Error:", error);
        setStatus('error');
        // User-friendly error mapping
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setErrorMessage("Permission denied. Please enable GPS.");
            break;
          case error.POSITION_UNAVAILABLE:
            setErrorMessage("Location unavailable.");
            break;
          case error.TIMEOUT:
            setErrorMessage("Request timed out.");
            break;
          default:
            setErrorMessage("Unknown error.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col items-end gap-2">
      {/* Error Toast */}
      {status === 'error' && (
        <div className="bg-white text-red-600 px-3 py-2 rounded-lg shadow-md border-l-4 border-red-500 text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
          <AlertCircle size={14} />
          <span>{errorMessage}</span>
          <button onClick={() => setStatus('idle')} className="ml-1 hover:bg-gray-100 rounded-full p-0.5">×</button>
        </div>
      )}

      {/* Main Button */}
      <button
        onClick={handleGetLocation}
        disabled={status === 'loading'}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm shadow-md transition-all duration-200
          ${status === 'loading' 
            ? 'bg-gray-100 text-gray-400 cursor-wait' 
            : 'bg-white text-gray-800 hover:bg-gray-50 hover:text-blue-600 hover:ring-2 ring-blue-100 active:scale-95'
          }
        `}
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Locating...</span>
          </>
        ) : (
          <>
            <Navigation size={16} className={status === 'idle' ? "fill-current" : ""} />
            <span>Find My Location</span>
          </>
        )}
      </button>
    </div>
  );
};

export default GetLocation;