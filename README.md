# Aforador - Método del Flotador

## Descripción

Aplicación móvil multiplataforma (iOS y Android) desarrollada con React Native para realizar mediciones de caudal en canales y ríos utilizando el método del flotador. La aplicación incluye un cronómetro integrado, cálculos automáticos, almacenamiento local en base de datos SQLite y exportación de reportes en formato PDF.

## Características Principales

### 📊 Medición de Aforos
- **Entrada de parámetros del canal:**
  - Distancia recorrida por el flotador
  - Espejo de agua (ancho superior del canal)
  - Tirante (profundidad del agua)
  - Base menor (ancho inferior del canal)
  - Factor de corrección (0.8-0.9)

### ⏱️ Cronómetro Integrado
- Cronómetro preciso con centésimas de segundo
- Registro múltiple de lecturas de tiempo
- Visualización en tiempo real
- Controles de inicio/parada

### 🧮 Cálculos Automáticos
- Cálculo del área de la sección transversal
- Velocidad media del flujo
- Caudal (Q = A × V × Fc)
- Estadísticas de velocidades (promedio, mínima, máxima, desviación estándar)

### 💾 Almacenamiento Local
- Base de datos SQLite local
- Almacenamiento de todos los aforos realizados
- Historial completo de mediciones
- Sincronización automática

### 📄 Exportación a PDF
- Generación automática de reportes en PDF
- Información completa del aforo
- Tabla de lecturas
- Resultados finales
- Fecha y hora de generación

### 📈 Reportes y Estadísticas
- Vista de historial de aforos
- Estadísticas generales (promedio, mínimo, máximo)
- Gráficos de datos
- Tendencias de caudal

## Estructura del Proyecto

```
flotador-aforador-app/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js           # Pantalla de inicio
│   │   ├── NuevoAforoScreen.js     # Captura de nuevo aforo
│   │   ├── HistorialScreen.js      # Historial de aforos
│   │   ├── DetalleAforoScreen.js   # Detalles y exportación
│   │   └── ReportesScreen.js       # Reportes y estadísticas
│   ├── database/
│   │   └── db.js                   # Configuración de SQLite
│   ├── utils/
│   │   ├── calculations.js         # Funciones de cálculo
│   │   └── pdfExport.js            # Generación de PDF
├── App.js                          # Navegación principal
├── index.js                        # Punto de entrada
├── package.json                    # Dependencias
├── babel.config.js                 # Configuración de Babel
└── README.md                       # Este archivo
```

## Instalación

### Requisitos Previos
- Node.js >= 14.x
- npm o yarn
- Android Studio (para Android)
- Xcode (para iOS)
- React Native CLI

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Lebrime/flotador-aforador-app.git
   cd flotador-aforador-app
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Para Android**
   ```bash
   npm run android
   # o
   yarn android
   ```

4. **Para iOS**
   ```bash
   npm run ios
   # o
   yarn ios
   ```

## Uso de la Aplicación

### Realizar un Nuevo Aforo

1. Desde la pantalla de inicio, presiona "Nuevo Aforo"
2. Ingresa los parámetros del canal:
   - Distancia que recorre el flotador
   - Ancho del espejo de agua
   - Profundidad del agua (tirante)
   - Ancho de la base menor del canal
   - Factor de corrección
3. Ingresa información adicional (ubicación, observaciones)
4. Utiliza el cronómetro:
   - Presiona "Iniciar" para comenzar la medición
   - Presiona "Parar" cuando termine
   - Presiona "Agregar" para registrar la lectura
5. Repite el proceso de medición las veces que desees
6. Presiona "Guardar Aforo" para almacenar los datos

### Ver Historial

1. Desde la pestaña "Historial"
2. Se muestran todos los aforos realizados
3. Presiona sobre un aforo para ver detalles completos
4. Desde el detalle puedes:
   - Generar un PDF del reporte
   - Compartir el archivo
   - Ver todas las lecturas realizadas

### Consultar Reportes

1. Desde la pestaña "Reportes"
2. Se muestran estadísticas generales:
   - Total de aforos realizados
   - Caudal promedio, mínimo y máximo
   - Promedios de distancia y tirante
   - Últimos aforos realizados

## Fórmulas Utilizadas

### Cálculo del Área (Sección Trapezoidal)
```
A = h × (b₁ + b₂) / 2

Donde:
- h = tirante (altura del agua)
- b₁ = base menor
- b₂ = espejo de agua
```

### Cálculo de Velocidad
```
V = d / t

Donde:
- d = distancia recorrida por el flotador
- t = tiempo promedio de las lecturas
```

### Cálculo de Caudal
```
Q = A × V × Fc

Donde:
- A = área de la sección transversal
- V = velocidad media del flujo
- Fc = factor de corrección (típicamente 0.85)
```

## Dependencias Principales

- **react-native**: Framework para desarrollo móvil
- **@react-navigation**: Sistema de navegación
- **@react-native-async-storage**: Almacenamiento local
- **react-native-sqlite-storage**: Base de datos local
- **rn-pdf-lib**: Generación de PDF
- **react-native-fs**: Acceso al sistema de archivos
- **react-native-share**: Compartir archivos
- **moment**: Manejo de fechas

## Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Autor

**Lebrime** - [GitHub](https://github.com/Lebrime)

## Soporte

Para reportar problemas o sugerencias, por favor abre un issue en el repositorio.

## Roadmap

- [ ] Gráficos de datos más avanzados
- [ ] Sincronización en la nube
- [ ] Múltiples usuarios
- [ ] Exportación a Excel
- [ ] Integración con mapas
- [ ] Cálculos adicionales de hidráulica
- [ ] Modo offline mejorado
- [ ] Autenticación de usuarios

## Cambios de Versión

### v1.0.0 (2024)
- Versión inicial
- Funcionalidades básicas de aforo
- Cronómetro integrado
- Generación de PDF
- Almacenamiento local
- Reportes y estadísticas
