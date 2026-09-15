# Guía de Desarrollo

## Configuración del Entorno de Desarrollo

### Requisitos Previos

- Node.js >= 14.x
- npm >= 6.x o yarn >= 1.x
- Android Studio (para Android)
- Xcode (para iOS)
- React Native CLI

### Instalación Inicial

```bash
# Clonar el repositorio
git clone https://github.com/Lebrime/flotador-aforador-app.git
cd flotador-aforador-app

# Instalar dependencias
npm install

# o con yarn
yarn install
```

## Estructura del Proyecto

```
flotador-aforador-app/
├── src/
│   ├── screens/              # Pantallas principales
│   │   ├── HomeScreen.js
│   │   ├── NuevoAforoScreen.js
│   │   ├── HistorialScreen.js
│   │   ├── DetalleAforoScreen.js
│   │   └── ReportesScreen.js
│   ├── database/             # Configuración de base de datos
│   │   └── db.js
│   ├── utils/                # Funciones utilitarias
│   │   ├── calculations.js   # Cálculos matemáticos
│   │   └── pdfExport.js      # Exportación a PDF
│   └── components/           # Componentes reutilizables (futuro)
├── App.js                    # Configuración principal
├── index.js                  # Punto de entrada
├── package.json
├── babel.config.js
└── README.md
```

## Scripts Disponibles

```bash
# Iniciar servidor de desarrollo
npm start

# Ejecutar en Android
npm run android

# Ejecutar en iOS
npm run ios

# Ejecutar tests
npm test

# Linter
npm run lint
```

## Componentes Principales

### App.js - Configuración de Navegación

Configura la estructura de navegación con:
- Stack Navigator para cada tab
- Bottom Tab Navigator para navegación principal
- Estilos y colores consistentes

### src/database/db.js - Base de Datos

**Funciones principales:**
- `initDatabase()`: Inicializa la BD y crea tablas
- `saveAforo(aforoData)`: Guarda un aforo completo
- `saveLectura(aforoId, lectura)`: Guarda una lectura individual
- `getAllAforos()`: Obtiene todos los aforos
- `getAforoById(aforoId)`: Obtiene un aforo específico
- `getLecturasByAforoId(aforoId)`: Obtiene lecturas de un aforo
- `deleteAforo(aforoId)`: Elimina un aforo

**Tablas:**

```sql
CREATE TABLE aforos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  fecha TEXT NOT NULL,
  hora TEXT NOT NULL,
  ubicacion TEXT,
  observaciones TEXT,
  distancia REAL,
  espejo_agua REAL,
  tirante REAL,
  base_menor REAL,
  factor_correccion REAL,
  caudal_calculado REAL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE lecturas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  aforo_id INTEGER NOT NULL,
  numero_lectura INTEGER,
  tiempo REAL,
  velocidad REAL,
  FOREIGN KEY(aforo_id) REFERENCES aforos(id)
);
```

### src/utils/calculations.js - Funciones de Cálculo

**Funciones disponibles:**

- `calcularArea(tirante, base_menor, espejo_agua)`: Calcula el área trapezoidal
- `calcularVelocidadPromedio(distancia, tiempos)`: Velocidad media
- `calcularCaudal(area, velocidad, factorCorreccion)`: Caudal final
- `calcularEstadisticas(velocidades)`: Estadísticas de velocidades
- `calcularVelocidad(distancia, tiempo)`: Velocidad instantánea
- `formatoTiempo(segundos)`: Formatea tiempo a mm:ss

### src/utils/pdfExport.js - Exportación PDF

**Funciones:**

- `generarPDFAforo(aforo, lecturas)`: Genera PDF del aforo
- `imprimirAforo(aforo, lecturas)`: Imprime el PDF

## Flujo de Datos

```
NuevoAforoScreen
    ↓
Ingresa parámetros
    ↓
Registra lecturas con cronómetro
    ↓
Calcula valores (calculations.js)
    ↓
Guarda en BD (db.js)
    ↓
HistorialScreen muestra datos
    ↓
DetalleAforoScreen permite exportar PDF
    ↓
ReportesScreen muestra estadísticas
```

## Agregar Nuevas Funcionalidades

### Agregar una nueva pantalla

1. Crear archivo en `src/screens/MiPantalla.js`
2. Importar en `App.js`
3. Agregar Stack Navigator
4. Agregar Tab Navigator si es necesario

### Agregar nueva función de cálculo

1. Implementar en `src/utils/calculations.js`
2. Exportar la función
3. Importar en la pantalla que la necesite
4. Usar la función

### Agregar campos a la BD

1. Modificar SQL en `src/database/db.js`
2. Actualizar la versión de BD
3. Usar migraciones si hay datos existentes

## Estilos y Temas

### Colores Principales

```javascript
const colors = {
  primary: '#1976d2',      // Azul principal
  success: '#4CAF50',      // Verde de éxito
  warning: '#FF9800',      // Naranja de advertencia
  error: '#d32f2f',        // Rojo de error
  info: '#2196F3',         // Azul info
  background: '#f5f5f5',   // Gris de fondo
  text: '#333',            // Texto oscuro
  textLight: '#999',       // Texto claro
};
```

### Espaciado Estándar

- Pequeño: 5px
- Medio: 10px
- Grande: 15px
- Extra grande: 20px

## Testing

### Ejecutar Tests

```bash
npm test
```

### Escribir un Test

```javascript
import { calcularCaudal } from '../utils/calculations';

describe('Cálculos', () => {
  it('debería calcular el caudal correctamente', () => {
    const resultado = calcularCaudal(10, 1.5, 0.85);
    expect(resultado).toBeCloseTo(12.75, 2);
  });
});
```

## Debugging

### Logs

```javascript
console.log('Información:', data);
console.warn('Advertencia:', data);
console.error('Error:', data);
```

### React DevTools

```bash
npm install -g react-devtools
react-devtools
```

### Android

```bash
# Abrir menú de desarrollo
adb shell input keyevent 82
```

### iOS

```bash
# Cmd+D para abrir menú
# Cmd+M para volver
```

## Generación de Build

### Android APK

```bash
cd android
./gradlew assembleRelease
```

El APK estará en: `android/app/build/outputs/apk/release/`

### iOS IPA

```bash
xcodebuild -workspace ios/AforaApp.xcworkspace \
  -scheme AforaApp \
  -configuration Release \
  -derivedDataPath ios/build
```

## Variables de Entorno

Crea un archivo `.env` en la raíz:

```
DEBUG_MODE=true
API_URL=http://localhost:3000
```

Accede con:

```javascript
import { Config } from 'react-native';
```

## Contribución

### Rama de Desarrollo

Todo desarrollo se realiza en `develop`, luego se hace PR a `main`:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/mi-feature
# Hacer cambios
git add .
git commit -m "feat: descripción de cambios"
git push origin feature/mi-feature
# Crear PR en GitHub
```

### Estándares de Código

- Usar camelCase para variables y funciones
- Usar PascalCase para componentes y clases
- Agregar comentarios para funciones complejas
- Máximo 80 caracteres por línea

## Solución de Problemas

### La aplicación no inicia

```bash
# Limpiar caché
rm -rf node_modules
npm install

# Limpiar gradle (Android)
cd android && ./gradlew clean && cd ..

# Limpiar build (iOS)
cd ios && rm -rf build && cd ..
```

### Error de dependencias

```bash
npm install --legacy-peer-deps
```

### Puerto en uso

```bash
# Por defecto usa puerto 8081
npm start -- --port 8082
```

## Recursos y Referencias

- [Documentación React Native](https://reactnative.dev)
- [React Navigation](https://reactnavigation.org)
- [SQLite Storage](https://github.com/andpor/react-native-sqlite-storage)
- [PDF Lib](https://github.com/jspdf-community/pdf-lib)

## Licencia

MIT - Ver LICENSE
