  
/** 
  * Configuración de mapas para la aplicación.
  * Incluye coordenadas por defecto.
**/
export const MAP_CONFIG = {
  /**
   * Mapbox Access Token
   * Obtén tu token en: https://account.mapbox.com/
   */
  MAPBOX_ACCESS_TOKEN: process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN ?? '',
  STYLE_CSS_MAPBOX: 'https://api.mapbox.com/mapbox-gl-js/v3.13.0/mapbox-gl.css',
  STYLE_JS_MAPBOX: 'https://api.mapbox.com/mapbox-gl-js/v3.13.0/mapbox-gl.js',
  DEFAULT_LATITUDE: 19.4326,
  DEFAULT_LONGITUDE: -99.1332,
  DEFAULT_ZOOM: 12,
} as const;
