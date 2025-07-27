# Configuración de Mapas para Web

Este proyecto incluye múltiples opciones para mostrar mapas en la plataforma web, ya que `react-native-maps` no funciona en web.

## Opciones Disponibles

### 1. Google Maps (Recomendado)
- **Ventajas**: API robusta, buena documentación, integración con Google Services
- **Desventajas**: Requiere API key, tiene límites de uso
- **Costo**: $200 de crédito gratuito mensual

### 2. Leaflet + OpenStreetMap (Gratuito)
- **Ventajas**: Completamente gratuito, sin límites de uso
- **Desventajas**: Menos funcionalidades avanzadas
- **Costo**: Gratuito

### 3. Mapbox (Profesional)
- **Ventajas**: API muy potente, excelente rendimiento, muchas funcionalidades
- **Desventajas**: Requiere API key
- **Costo**: 50,000 cargas de mapa gratuitas mensuales

## Configuración

### Para Google Maps:

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Maps JavaScript
4. Crea credenciales (API Key)
5. Edita `constants/MapConfig.ts` y reemplaza `YOUR_GOOGLE_MAPS_API_KEY` con tu clave

### Para Mapbox:

1. Ve a [Mapbox](https://account.mapbox.com/)
2. Crea una cuenta gratuita
3. Obtén tu Access Token
4. Edita `constants/MapConfig.ts` y reemplaza `YOUR_MAPBOX_ACCESS_TOKEN` con tu token

### Para Leaflet:

No requiere configuración adicional, funciona inmediatamente.

## Uso

En tu componente de mapa, puedes especificar qué tipo de mapa usar:

```tsx
// Usar Google Maps
<UnifiedMap mapType="google" />

// Usar Leaflet (gratuito)
<UnifiedMap mapType="leaflet" />

// Usar Mapbox
<UnifiedMap mapType="mapbox" />
```

## Variables de Entorno (Opcional)

Para mayor seguridad, puedes usar variables de entorno:

1. Crea un archivo `.env` en la raíz del proyecto:
```
GOOGLE_MAPS_API_KEY=tu_clave_aqui
MAPBOX_ACCESS_TOKEN=tu_token_aqui
```

2. Instala `react-native-dotenv`:
```bash
npm install react-native-dotenv
```

3. Actualiza `constants/MapConfig.ts`:
```tsx
export const MAP_CONFIG = {
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY',
  MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN || 'YOUR_MAPBOX_ACCESS_TOKEN',
  // ...
};
```

## Notas Importantes

- **Seguridad**: Nunca subas tus API keys a GitHub. Usa variables de entorno o archivos de configuración locales.
- **Límites**: Google Maps y Mapbox tienen límites de uso. Revisa sus políticas de precios.
- **Rendimiento**: Leaflet es más ligero pero menos funcional que las otras opciones.
- **Compatibilidad**: Todos los componentes funcionan en web, mientras que móviles usan `react-native-maps`.

## Troubleshooting

### Error: "Google Maps API key is invalid"
- Verifica que tu API key sea correcta
- Asegúrate de que la API de Maps JavaScript esté habilitada
- Revisa que no haya restricciones de dominio en tu API key

### Error: "Mapbox access token is invalid"
- Verifica que tu access token sea correcto
- Asegúrate de que tu cuenta esté activa

### El mapa no se carga
- Verifica la conexión a internet
- Revisa la consola del navegador para errores
- Asegúrate de que las coordenadas sean válidas 