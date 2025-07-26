// Configuración para las APIs de mapas
// IMPORTANTE: Reemplaza estas claves con tus propias API keys

export const MAP_CONFIG = {
  // Google Maps API Key
  // Obtén tu clave en: https://console.cloud.google.com/
  GOOGLE_MAPS_API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY',
  
  // Mapbox Access Token
  // Obtén tu token en: https://account.mapbox.com/
  MAPBOX_ACCESS_TOKEN: 'pk.eyJ1IjoiaGFycnloZHplMSIsImEiOiJjbTk2OGU3b2gxZnZjMmtvaHJxM3VzZ3diIn0.5GBNaTKCKTgtxd_JmKG31A',
  
  // Coordenadas por defecto (Ciudad de México)
  DEFAULT_LATITUDE: 19.4326,
  DEFAULT_LONGITUDE: -99.1332,
  DEFAULT_ZOOM: 12,
} as const;

// Función para obtener la configuración según la plataforma
export const getMapConfig = (platform: 'web' | 'ios' | 'android') => {
  if (platform === 'web') {
    return {
      type: 'google', // o 'leaflet', 'mapbox'
      apiKey: MAP_CONFIG.GOOGLE_MAPS_API_KEY,
      latitude: MAP_CONFIG.DEFAULT_LATITUDE,
      longitude: MAP_CONFIG.DEFAULT_LONGITUDE,
      zoom: MAP_CONFIG.DEFAULT_ZOOM,
    };
  }
  
  return {
    type: 'react-native-maps',
    latitude: MAP_CONFIG.DEFAULT_LATITUDE,
    longitude: MAP_CONFIG.DEFAULT_LONGITUDE,
    zoom: MAP_CONFIG.DEFAULT_ZOOM,
  };
}; 