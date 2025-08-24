import { MAP_CONFIG } from '@/constants/MapConfig';
import { useEffect, useRef } from 'react';
import { View } from 'react-native';

interface MapboxMapProps {
  style: any;
  accessToken: string;
  alertLocation?: {
    latitude: number;
    longitude: number;
    title?: string;
    description?: string;
  };
}

export default function MapboxMapWeb({ 
  style,
  accessToken,
  alertLocation,
}: MapboxMapProps) {
 
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const isMapInitializedRef = useRef(false);

  // Efecto para inicializar el mapa (solo una vez)
  useEffect(() => {
    if (isMapInitializedRef.current) return;

    // Cargar Mapbox CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = MAP_CONFIG.STYLE_CSS_MAPBOX;
    document.head.appendChild(link);

    // Cargar Mapbox JS
    const script = document.createElement('script');
    script.src = MAP_CONFIG.STYLE_JS_MAPBOX;
    script.async = true;

    script.onload = () => {
      if (mapRef.current && (window as any).mapboxgl && !isMapInitializedRef.current) {
        const mapboxgl = (window as any).mapboxgl;
        const map = new mapboxgl.Map({
          container: mapRef.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [MAP_CONFIG.DEFAULT_LONGITUDE, MAP_CONFIG],
          zoom: MAP_CONFIG.DEFAULT_ZOOM,
          accessToken: accessToken
        });

        // Guardar referencia del mapa
        mapInstanceRef.current = map;
        isMapInitializedRef.current = true;

        // Marcador de ubicación actual
        new mapboxgl.Marker({ color: '#3B82F6' })
          .setLngLat([MAP_CONFIG.DEFAULT_LONGITUDE, MAP_CONFIG.DEFAULT_LATITUDE])
          .setPopup(new mapboxgl.Popup().setHTML('<h3>Tu ubicación</h3>'))
          .addTo(map);

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
  }, [accessToken])

  // Efecto separado para manejar cambios en alertLocation
  useEffect(() => {
    
    if (alertLocation && mapInstanceRef.current && isMapInitializedRef.current) {
      const map = mapInstanceRef.current;
      // Limpiar marcadores anteriores de alerta
      const existingMarkers = document.querySelectorAll('.mapboxgl-marker');
      existingMarkers.forEach(marker => {
        if (marker.getAttribute('data-type') === 'alert') {
          marker.remove();
        }
      });

      // Agregar nuevo marcador de alerta
      const mapboxgl = (window as any).mapboxgl;
      
      new mapboxgl.Marker({ 
        color: '#3B82F6',
      }).setLngLat([Number(alertLocation.longitude), Number(alertLocation.latitude)])
        .setPopup(new mapboxgl.Popup().setHTML(`
          <h3 style="color: #000000;">${alertLocation.title || 'Alerta'}</h3>
          <p style="color: #000000;">${alertLocation.description || ''}</p>
        `)).addTo(map);


      map.flyTo({
        center: [Number(alertLocation.longitude), Number(alertLocation.latitude)],
        zoom: 15,
        duration: 2000
      });
    }
  }, [alertLocation]);

  return (
    <View style={style}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    </View>
  );
} 