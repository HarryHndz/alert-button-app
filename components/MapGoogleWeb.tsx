import { MAP_CONFIG } from '@/constants/MapConfig';
import { useEffect, useRef } from 'react';
import { View } from 'react-native';

interface WebMapProps {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  style?: any;
}

export default function WebMap({ 
  latitude = MAP_CONFIG.DEFAULT_LATITUDE, 
  longitude = MAP_CONFIG.DEFAULT_LONGITUDE, 
  zoom = MAP_CONFIG.DEFAULT_ZOOM,
  style = { width: '100%', height: '100%' }
}: WebMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cargar la API de Google Maps
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAP_CONFIG.GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (mapRef.current && (window as any).google) {
        const map = new (window as any).google.maps.Map(mapRef.current, {
          center: { lat: latitude, lng: longitude },
          zoom: zoom,
          styles: [
            {
              featureType: 'all',
              elementType: 'all',
              stylers: [
                { saturation: -100 }
              ]
            }
          ]
        });

        // Agregar marcador en el centro
        new (window as any).google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map: map,
          title: 'Tu ubicación'
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      // Limpiar el script cuando el componente se desmonte
      const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [latitude, longitude, zoom]);

  return (
    <View style={style}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    </View>
  );
} 