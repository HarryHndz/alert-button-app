export interface MapProps {
  // Props comunes para ambos (mobile y web)
  latitude?: number;
  longitude?: number;
  zoom?: number;
  
  // Props específicas para alertas
  alertLocation?: {
    latitude: number;
    longitude: number;
    title?: string;
    description?: string;
  };
  
  // Props para el estado de conexión MQTT
  isConnected?: boolean;
  
  // Callbacks
  onLocationSelect?: (latitude: number, longitude: number) => void;
}
