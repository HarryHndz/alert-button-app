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
  console.log("MapboxMapWeb - Props recibidas:", {
    latitude,
    longitude,
    zoom,
    alertLocation,
    accessToken: accessToken ? 'SÍ' : 'NO'
  });

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const isMapInitializedRef = useRef(false);

  // Efecto para inicializar el mapa (solo una vez)
  useEffect(() => {
    if (isMapInitializedRef.current) return;

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
      if (mapRef.current && (window as any).mapboxgl && !isMapInitializedRef.current) {
        const mapboxgl = (window as any).mapboxgl;
        
        const map = new mapboxgl.Map({
          container: mapRef.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [longitude, latitude],
          zoom: zoom,
          accessToken: accessToken
        });

        // Guardar referencia del mapa
        mapInstanceRef.current = map;
        isMapInitializedRef.current = true;

        // Marcador de ubicación actual
        new mapboxgl.Marker({ color: '#3B82F6' })
          .setLngLat([longitude, latitude])
          .setPopup(new mapboxgl.Popup().setHTML('<h3>Tu ubicación</h3>'))
          .addTo(map);

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
  }, []); // Solo se ejecuta una vez al montar el componente

  // Efecto separado para manejar cambios en alertLocation
  useEffect(() => {
    console.log("useEffect alertLocation ejecutado", {
      alertLocation,
      mapInstanceRef: mapInstanceRef.current,
      isMapInitialized: isMapInitializedRef.current
    });

    if (alertLocation && mapInstanceRef.current && isMapInitializedRef.current) {
      const map = mapInstanceRef.current;
      console.log("alertLocation en el mapa", alertLocation);
      console.log("Coordenadas a usar:", {
        lat: Number(alertLocation.latitude),
        lng: Number(alertLocation.longitude)
      });
      
      // Limpiar marcadores anteriores de alerta
      const existingMarkers = document.querySelectorAll('.mapboxgl-marker');
      console.log("Marcadores existentes encontrados:", existingMarkers.length);
      existingMarkers.forEach(marker => {
        if (marker.getAttribute('data-type') === 'alert') {
          console.log("Eliminando marcador de alerta anterior");
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

      console.log("Marcador de alerta agregado al mapa");

      // Mover el mapa a la ubicación de la alerta
      console.log("Moviendo mapa a nueva ubicación");
      map.flyTo({
        center: [Number(alertLocation.longitude), Number(alertLocation.latitude)],
        zoom: 15,
        duration: 2000
      });
    } else {
      console.log("No se pudo procesar alertLocation:", {
        reason: !alertLocation ? "No hay alertLocation" : 
                !mapInstanceRef.current ? "No hay referencia al mapa" : 
                !isMapInitializedRef.current ? "Mapa no inicializado" : "Desconocido"
      });
    }
  }, [alertLocation]);

  return (
    <View style={style}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    </View>
  );
} 