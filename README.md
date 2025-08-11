# 🚨 Alert Button App

Una aplicación móvil multiplataforma para gestión de contactos de emergencia y alertas en tiempo real con integración MQTT y mapas interactivos.

## 📱 Características

### 🔐 Autenticación y Usuarios
- Sistema de login y registro de usuarios
- Gestión de sesiones seguras
- Cambio de contraseñas
- Perfiles de usuario personalizables

### 👥 Gestión de Contactos
- Agregar, editar y eliminar contactos de emergencia
- Búsqueda por nombre o apellido
- Almacenamiento local seguro con zustand
- Interfaz intuitiva con acciones contextuales

### 🗺️ Mapas Interactivos
- **Mobile**: Integración con Google Maps nativo
- **Web**: Integración con Mapbox
- Visualización de alertas en tiempo real
- Selección de ubicaciones por tap/clic
- Indicadores de estado de conexión MQTT

### 📡 Comunicación en Tiempo Real
- Conexión MQTT para alertas de emergencia
- Suscripción a tópicos específicos por ID
- Recepción de coordenadas GPS en tiempo real
- Manejo de conexiones perdidas y reconexión

### 🎨 Interfaz de Usuario
- Diseño moderno con Tailwind CSS
- Componentes UI personalizables (Gluestack UI)
- Navegación intuitiva con Expo Router
- Indicadores visuales de estado

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React Native** - Framework multiplataforma
- **Expo** - Plataforma de desarrollo
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos
- **Gluestack UI** - Sistema de componentes

### Mapas
- **React Native Maps** - Mapas nativos para mobile
- **Mapbox GL JS** - Mapas para web
- **Google Maps API** - Servicios de mapas

### Estado y Comunicación
- **Zustand** - Gestión de estado global
- **Paho MQTT** - Cliente MQTT para comunicación
- **Expo Router** - Navegación y enrutamiento

### Almacenamiento
- **AsyncStorage** - Almacenamiento local
- **API REST** - Servicios backend
- **JWT** - Autenticación segura

## 🚀 Instalación

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn
- Expo CLI
- Android Studio (para desarrollo Android)
- Xcode (para desarrollo iOS, solo macOS)

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/alert-button-app.git
cd alert-button-app
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env en la raíz del proyecto
cp .env.example .env
```

4. **Configurar Mapbox (para web)**
```bash
# Editar constants/MapConfig.ts
export const MAP_CONFIG = {
  MAPBOX_ACCESS_TOKEN: 'tu_token_de_mapbox',
  DEFAULT_LATITUDE: 19.4326,
  DEFAULT_LONGITUDE: -99.1332,
  DEFAULT_ZOOM: 14
}
```

5. **Ejecutar la aplicación**
```bash
# Desarrollo
npm run start
# o
expo start

# Build para producción
npm run build
```

## 📱 Uso de la Aplicación

### 1. Autenticación
- Registra una nueva cuenta o inicia sesión
- La sesión se mantiene automáticamente
- Cambia tu contraseña desde el perfil

### 2. Gestión de Contactos
- **Agregar**: Toca el botón "+" en la pantalla de contactos
- **Editar**: Mantén presionada una tarjeta de contacto
- **Eliminar**: Usa el menú contextual de cada contacto
- **Buscar**: Utiliza el campo de búsqueda para filtrar

### 3. Visualización de Mapas
- Navega a la pestaña de mapas
- Visualiza tu ubicación actual
- Recibe alertas en tiempo real vía MQTT
- Selecciona ubicaciones tocando el mapa

### 4. Configuración MQTT
- Configura tu broker MQTT en `app/auth/(tabs)/map.tsx`
- Ajusta el tópico y credenciales según tu configuración
- Monitorea el estado de conexión con el indicador visual

## 🏗️ Estructura del Proyecto

```
alert-button-app/
├── app/                    # Páginas de la aplicación (Expo Router)
│   ├── auth/              # Rutas autenticadas
│   │   ├── (tabs)/        # Navegación por pestañas
│   │   ├── account/       # Gestión de cuenta
│   │   └── addcontact/    # Agregar/editar contactos
│   ├── index.tsx          # Página principal
│   └── register.tsx       # Registro de usuarios
├── components/             # Componentes reutilizables
│   ├── Contact/           # Componentes de contactos
│   ├── Map/               # Componentes de mapas
│   └── ui/                # Sistema de diseño
├── constants/              # Configuraciones y constantes
├── data/                   # Interfaces y tipos de datos
├── hooks/                  # Hooks personalizados
├── service/                # Servicios de API y MQTT
├── store/                  # Estado global (Zustand)
├── types/                  # Tipos TypeScript
├── utils/                  # Utilidades y helpers
└── validation/             # Validaciones de formularios
```

## 🔧 Configuración

### Variables de Entorno
```env
# API
API_BASE_URL=https://tu-api.com
API_TIMEOUT=10000

# MQTT
MQTT_BROKER_HOST=192.168.1.70
MQTT_BROKER_PORT=8083
MQTT_TOPIC=emergency/location

# Mapas
MAPBOX_ACCESS_TOKEN=tu_token_mapbox
GOOGLE_MAPS_API_KEY=tu_key_google_maps
```

### Configuración MQTT
```typescript
// app/auth/(tabs)/map.tsx
const topic = 'emergency/location';
const brokerHost = "192.168.1.70";
const port = 8083;
```

## 📊 API Endpoints

### Autenticación
- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar usuario
- `PUT /auth/password` - Cambiar contraseña

### Contactos
- `GET /contacts` - Obtener contactos
- `POST /contacts` - Crear contacto
- `PUT /contacts/:id` - Actualizar contacto
- `DELETE /contacts/:id` - Eliminar contacto

### Usuarios
- `GET /users/profile` - Obtener perfil
- `PUT /users/profile` - Actualizar perfil

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Tests con coverage
npm run test:coverage

# Tests en modo watch
npm run test:watch
```

## 📦 Build y Despliegue

### Android
```bash
# Build APK
expo build:android

# Build AAB
expo build:android -t app-bundle
```

### iOS
```bash
# Build IPA
expo build:ios

# Build para App Store
expo build:ios -t archive
```

### Web
```bash
# Build para web
expo build:web

# Servir build local
npx serve web-build
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

- **Issues**: [GitHub Issues](https://github.com/tu-usuario/alert-button-app/issues)
- **Documentación**: [Wiki del proyecto](https://github.com/tu-usuario/alert-button-app/wiki)
- **Contacto**: tu-email@ejemplo.com

## 🙏 Agradecimientos

- [Expo](https://expo.dev/) por la plataforma de desarrollo
- [React Native](https://reactnative.dev/) por el framework
- [Zustand](https://github.com/pmndrs/zustand) por la gestión de estado
- [Tailwind CSS](https://tailwindcss.com/) por los estilos
- [Mapbox](https://www.mapbox.com/) y [Google Maps](https://developers.google.com/maps) por los servicios de mapas

---

**Desarrollado con ❤️ para mantener a las personas seguras en emergencias**
