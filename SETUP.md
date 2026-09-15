# Guía de Configuración para Desarrolladores

## Primeros Pasos

### 1. Clonar y Configurar el Proyecto

```bash
# Clonar el repositorio
git clone https://github.com/Lebrime/flotador-aforador-app.git
cd flotador-aforador-app

# Cambiar a rama develop
git checkout develop

# Instalar dependencias
npm install
```

### 2. Configurar Variables de Entorno

```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar según sea necesario
vi .env
```

### 3. Configurar el Dispositivo/Emulador

**Para Android:**
```bash
# Iniciar emulador
emulator -avd <nombre_del_emulador>

# O conectar dispositivo físico
adb devices
```

**Para iOS:**
```bash
# Abrir en Xcode
open ios/AforaApp.xcworkspace
```

### 4. Ejecutar la Aplicación

```bash
# Terminal 1: Iniciar Metro bundler
npm start

# Terminal 2: Ejecutar en Android
npm run android

# O ejecutar en iOS
npm run ios
```

## Estructura de Directorios

Explica qué va en cada carpeta:

```
flotador-aforador-app/
├── src/
│   ├── screens/         ← Componentes de pantalla
│   ├── database/        ← Acceso a datos
│   ├── utils/           ← Funciones de utilidad
│   └── components/      ← Componentes reutilizables (futuro)
├── App.js               ← Componente raíz
├── index.js             ← Punto de entrada
└── package.json         ← Dependencias y scripts
```

## Flujo de Desarrollo

### Crear una Nueva Característica

1. **Crear rama de feature**
   ```bash
   git checkout -b feature/nombre-feature
   ```

2. **Desarrollar**
   - Escribir código en la rama
   - Hacer commits frecuentes
   - Probar en emulador/dispositivo

3. **Enviar cambios**
   ```bash
   git add .
   git commit -m "feat: descripción de cambios"
   git push origin feature/nombre-feature
   ```

4. **Crear Pull Request**
   - Ir a GitHub
   - Crear PR desde feature hacia develop
   - Describir cambios
   - Esperar revisión

5. **Merge a develop**
   ```bash
   git checkout develop
   git merge feature/nombre-feature
   git push origin develop
   ```

## Comandos Útiles

### Desarrollo
```bash
# Limpiar caches
npm start -- --reset-cache

# Ejecutar en modo debug
DEBUG=* npm start

# Ver logs
npm start -- --verbose
```

### Android
```bash
# Limpiar build
cd android && ./gradlew clean && cd ..

# Build de desarrollo
npm run android -- --reset-cache

# Ver logs
adb logcat

# Instalar APK manualmente
adb install app.apk
```

### iOS
```bash
# Limpiar build
cd ios && xcodebuild -scheme AforaApp clean && cd ..

# Ejecutar con logs
npm run ios -- --verbose

# Ver logs en dispositivo
log stream --predicate 'process == "AforaApp"'
```

## Testing

### Ejecutar Tests
```bash
npm test
```

### Escribir Tests
```javascript
// __tests__/calculations.test.js
import { calcularCaudal } from '../src/utils/calculations';

test('calcula caudal correctamente', () => {
  expect(calcularCaudal(10, 1.5, 0.85)).toBeCloseTo(12.75, 2);
});
```

## Debugging

### React Native Debugger
```bash
# Instalar
brew install react-native-debugger

# Ejecutar
react-native-debugger

# En la app: Cmd+M (iOS) o Cmd+D (Android)
# Seleccionar "Debug JS Remotely"
```

### Console Logs
```javascript
import { YellowBox } from 'react-native';

// Ignorar warnings específicos
YellowBox.ignoreWarnings(['Non-serializable values']);
```

## Versionado

Usamos [Semantic Versioning](https://semver.org/):
- MAJOR: cambios incompatibles
- MINOR: nuevas características
- PATCH: correcciones de bugs

**Versión actual:** 1.0.0

## Build para Producción

### Android
```bash
cd android
./gradlew assembleRelease
# APK en: app/build/outputs/apk/release/app-release.apk
```

### iOS
```bash
xcodebuild -workspace ios/AforaApp.xcworkspace \
  -scheme AforaApp \
  -configuration Release \
  -archivePath build/AforaApp \
  archive
```

## Solución de Problemas

### Port 8081 ya en uso
```bash
npm start -- --port 8082
```

### Problemas con módulos nativos
```bash
rm -rf node_modules
npm install
cd android && ./gradlew clean && cd ..
npm run android
```

### Error de certificados (iOS)
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

## Recursos

- [Documentación React Native](https://reactnative.dev/docs/getting-started)
- [React Navigation Docs](https://reactnavigation.org/docs/getting-started)
- [SQLite Storage](https://github.com/andpor/react-native-sqlite-storage)
- [Metro Bundler](https://facebook.github.io/metro/)

## Contacto

Para dudas o problemas:
- Crear un issue en GitHub
- Contactar al team
- Revisar la documentación

---

**Última actualización:** 2024
