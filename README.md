# 🚨 SafePulse App

Una aplicación móvil multiplataforma para gestión de contactos de emergencia y alertas en tiempo real con integración MQTT y mapa para mostrar la ubicación de los contactos que generen alertas.

## 📱 Características

### 🔐 Autenticación y Usuarios
- Sistema de login y registro de usuarios
- Gestión de sesiones seguras
- Cambio de contraseñas
- Perfiles de usuario

### 👥 Gestión de Contactos
- Agregar, editar y eliminar contactos de emergencia
- Búsqueda por nombre o apellido
- Almacenamiento local seguro con contex
- Interfaz intuitiva con acciones contextuales

### 🗺️ Mapas Interactivos
- **Mobile**: Integración con Google Maps nativo
- **Web**: Integración con Mapbox
- Visualización de alertas en tiempo real
- Selección de ubicaciones por tap/clic
- Indicadores de estado de conexión MQTT

### 📡 Comunicación en Tiempo Real
- Conexión MQTT para alertas de emergencia
- Suscripción a tópicos específicos por ID de usuarios
- Recepción de coordenadas GPS en tiempo real

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
- **Context** - Gestión de estado global
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
- **Editar y Eliminar**: Mantén presionada una tarjeta de contacto
- **Buscar**: Utiliza el campo de búsqueda para filtrar

### 3. Visualización de Mapas
- Navega a la pestaña de mapas
- Visualiza tu ubicación actual
- Recibe alertas en tiempo real por sms, con un link para abrir la app y llevarte al mapa.
- Selecciona ubicaciones tocando el mapa

### 4. Configuración MQTT
- Configura tu broker MQTT
- Ajusta el tópico y credenciales según tu configuración
- Monitorea el estado de conexión con el indicador visual

## 🏗️ Estructura del Proyecto

```
alert-button-app/
├── app/                        # Páginas y rutas principales (Expo Router)
│   ├── _layout.tsx             # Layout principal
│   ├── login.tsx               # Pantalla de login
│   ├── register.tsx            # Pantalla de registro
│   ├── (tabs)/                 # Navegación por pestañas
│   │   ├── _layout.tsx         # Layout de tabs
│   │   ├── contact.tsx         # Pantalla de contactos
│   │   ├── index.tsx           # Home principal
│   │   ├── map.tsx             # Pantalla de mapa
│   ├── account/                # Sección de cuenta de usuario
│   │   ├── _layout.tsx         # Layout de cuenta
│   │   ├── alerts.tsx          # Alertas del usuario
│   │   ├── index.tsx           # Perfil de usuario
│   │   └── password.tsx        # Cambio de contraseña
│   ├── addcontact/             # Sección para agregar/editar contactos
│   │   ├── _layout.tsx         # Layout de agregar contacto
│   │   └── [id].tsx            # Formulario de contacto (dinámico)
├── assets/                     # Recursos estáticos (imágenes, fuentes)
│   ├── fonts/
│   └── images/
├── components/                 # Componentes reutilizables
│   ├── ButtonLoader.tsx
│   ├── HapticTab.tsx
│   ├── HeaderMenu.tsx
│   ├── InputSearch.tsx
│   ├── Loader.tsx
│   ├── MapboxMapWeb.tsx
│   ├── MapGoogleWeb.tsx
│   ├── SplashScreen.tsx
│   ├── ThemedInput.tsx
│   ├── ToastError.tsx
│   ├── Account/
│   ├── Alerts/
│   ├── Contact/
│   ├── Home/
│   ├── Map/
│   └── ui/                     # Sistema de diseño y utilidades UI
├── constants/                  # Configuraciones y constantes globales
├── context/                    # Contextos de React (Auth, Contactos)
├── data/                       # Interfaces, tipos y validaciones
│   ├── interfaces/
│   ├── types/
│   └── validations/
├── hooks/                      # Hooks personalizados
├── service/                    # Servicios de API, autenticación y contactos
├── utils/                      # Utilidades y helpers
├── app.json                    # Configuración de Expo
├── package.json                # Dependencias y scripts
├── tailwind.config.js          # Configuración de Tailwind CSS
├── tsconfig.json               # Configuración de TypeScript
└── README.md                   # Documentación principal
```

## 🔧 Configuración

### Variables de Entorno
```env
# API
EXPO_PUBLIC_URL_SERVER=https://tu-api.com
EXPO_PUBLIC_PORT=1000

# MQTT
EXPO_PUBLIC_BROKER_HOST=192.168.1.70
EXPO_PUBLIC_PORT=8083
EXPO_PUBLIC_TOPIC=emergency/location

# Mapas
EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN=tu_token_mapbox
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
- `POST /alerts` - Crear una alerta 
- `POST /alerts/user/:id` - Obtener las alertas de un usuario
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


## 🙏 Agradecimientos

- [Expo](https://expo.dev/) por la plataforma de desarrollo
- [React Native](https://reactnative.dev/) por el framework
- [Tailwind CSS](https://tailwindcss.com/) por los estilos
- [Mapbox](https://www.mapbox.com/) y [Google Maps](https://developers.google.com/maps) por los servicios de mapas

---

**Proyecto universitario, para la asignatura Desarrollo para Dispositivos Inteligentes**
**Contribuidores:**
**Harry Hernández Arias**
**Leonardo Daniel Chan Mendez**
