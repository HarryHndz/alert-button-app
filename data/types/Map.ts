export interface MapProps {
  /**
   * Información sobre la ubicación de la alerta
   */
  alertLocation?: {
    latitude: number;
    longitude: number;
    title?: string;
    description?: string;
  };

  /**
   * Estado de conexión a MQTT
   */
  isConnected?: boolean;
}
