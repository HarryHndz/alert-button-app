  
/** 
  Configuración para las APIs de mapas
  IMPORTANTE: Reemplaza estas claves con tus propias API keys
**/
export const MAP_CONFIG = {
  // Google Maps API Key
  // Obtén tu clave en: https://console.cloud.google.com/
  GOOGLE_MAPS_API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY',
  
  // Mapbox Access Token
  // Obtén tu token en: https://account.mapbox.com/
  MAPBOX_ACCESS_TOKEN: process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN ?? '',
  
  // Coordenadas por defecto (Ciudad de México)
  DEFAULT_LATITUDE: 19.4326,
  DEFAULT_LONGITUDE: -99.1332,
  DEFAULT_ZOOM: 12,
} as const;
