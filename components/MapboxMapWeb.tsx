import { useEffect, useRef } from 'react';
import { View } from 'react-native';

interface MapboxMapProps {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  style?: any;
  accessToken?: string;
  alertLocation?: {
    latitude: number;
    longitude: number;
    title?: string;
    description?: string;
  };
  onLocationSelect?: (latitude: number, longitude: number) => void;
  onMapReady?: () => void;
}

export default function MapboxMapWeb({ 
  latitude = 19.4326, 
  longitude = -99.1332, 
  zoom = 10,
  style = { width: '100%', height: '100%' },
  accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN',
  alertLocation,
  onLocationSelect,
  onMapReady
}: MapboxMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cargar Mapbox CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.13.0/mapbox-gl.css';
    document.head.appendChild(link);

    // Cargar Mapbox JS
    const script = document.createElement('script');
    script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.13.0/mapbox-gl.js';
    script.async = true;

    script.onload = () => {
      if (mapRef.current && (window as any).mapboxgl) {
        const mapboxgl = (window as any).mapboxgl;
        
        const map = new mapboxgl.Map({
          container: mapRef.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [longitude, latitude],
          zoom: zoom,
          accessToken: accessToken
        });

        // Marcador de ubicación actual
        new mapboxgl.Marker({ color: '#3B82F6' })
          .setLngLat([longitude, latitude])
          .setPopup(new mapboxgl.Popup().setHTML('<h3>Tu ubicación</h3>'))
          .addTo(map);

        // Marcador de alerta si existe
        if (alertLocation) {
          new mapboxgl.Marker({ color: '#EF4444' })
            .setLngLat([alertLocation.longitude, alertLocation.latitude])
            .setPopup(new mapboxgl.Popup().setHTML(`
              <h3>${alertLocation.title || 'Alerta'}</h3>
              <p>${alertLocation.description || ''}</p>
            `))
            .addTo(map);
        }

        // Evento de clic en el mapa
        if (onLocationSelect) {
          map.on('click', (e: any) => {
            const { lng, lat } = e.lngLat;
            onLocationSelect(lat, lng);
          });
        }

        // Evento cuando el mapa está listo
        map.on('load', () => {
          onMapReady?.();
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      // Limpiar scripts cuando el componente se desmonte
      const existingScript = document.querySelector(`script[src*="mapbox-gl"]`);
      const existingLink = document.querySelector(`link[href*="mapbox-gl"]`);
      
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
      if (existingLink) {
        document.head.removeChild(existingLink);
      }
    };
  }, [latitude, longitude, zoom, accessToken, alertLocation, onLocationSelect, onMapReady]);

  return (
    <View style={style}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    </View>
  );
} 