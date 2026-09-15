# Guía de Uso - Aforador Método del Flotador

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Instalación](#instalación)
3. [Guía de Uso](#guía-de-uso)
4. [Pantallas de la Aplicación](#pantallas-de-la-aplicación)
5. [Preguntas Frecuentes](#preguntas-frecuentes)
6. [Solución de Problemas](#solución-de-problemas)

## Introducción

El método del flotador es una técnica simple y económica para medir el caudal en canales abiertos. Esta aplicación automatiza el proceso de medición y cálculo.

### ¿Cómo funciona el método del flotador?

1. Se suelta un objeto flotante (corcho, bola de espuma) en el canal
2. Se mide el tiempo que tarda en recorrer una distancia conocida
3. Se calcula la velocidad: V = Distancia / Tiempo
4. Se determina el área de la sección transversal del canal
5. Se aplica un factor de corrección (0.8 - 0.9)
6. Se calcula el caudal: Q = A × V × Fc

## Instalación

### Sistema de Requisitos

**Mínimos:**
- Android 6.0 o superior / iOS 12.0 o superior
- 50 MB de espacio disponible
- Conexión a internet (para la primera instalación)

**Recomendados:**
- Android 8.0 o superior / iOS 14.0 o superior
- 100 MB de espacio disponible
- Conexión de datos para compartir reportes

### Instalación desde el Código Fuente

```bash
# Clonar repositorio
git clone https://github.com/Lebrime/flotador-aforador-app.git

# Navegar al directorio
cd flotador-aforador-app

# Instalar dependencias
npm install

# Ejecutar en Android
npm run android

# O ejecutar en iOS
npm run ios
```

## Guía de Uso

### Paso 1: Preparación en Campo

Antes de usar la aplicación:

1. **Selecciona una sección estable del canal**
   - Sin turbulencias excesivas
   - Con flujo uniforme
   - Alejada de obstáculos

2. **Mide los parámetros del canal**
   - Distancia del recorrido del flotador (mínimo 5 metros)
   - Ancho superior del canal (espejo de agua)
   - Profundidad del agua (tirante)
   - Ancho inferior del canal (base menor)

### Paso 2: Registro en la Aplicación

#### Pantalla de Inicio

1. Abre la aplicación
2. Selecciona "Nuevo Aforo"

#### Ingreso de Parámetros del Canal

1. **Distancia del Flotador (m)**
   - Distancia que recorrerá el objeto flotante
   - Ej: 10 metros

2. **Espejo de Agua (m)**
   - Ancho del canal en la superficie
   - Medida horizontal en la parte superior

3. **Tirante (m)**
   - Profundidad máxima del agua en esa sección
   - Medida vertical desde la superficie al fondo

4. **Base Menor (m)**
   - Ancho del canal en el fondo
   - Medida horizontal en la parte inferior

5. **Factor de Corrección**
   - Valor entre 0.8 y 0.9
   - Típicamente 0.85
   - Depende del tipo de flotador y condiciones

#### Información Adicional (Opcional)

1. **Ubicación**
   - Nombre del río, arroyo o canal
   - Sección específica
   - Ej: "Río XYZ - Sección 1"

2. **Observaciones**
   - Condiciones especiales del agua
   - Presencia de obstrucciones
   - Variaciones de flujo

### Paso 3: Lecturas de Tiempo

#### Utilizando el Cronómetro

1. **Preparar el flotador**
   - Posiciónalo en la posición inicial
   - Ten el cronómetro listo

2. **Iniciar la medición**
   - Presiona "Iniciar" cuando sueltes el flotador
   - El cronómetro comenzará a contar

3. **Detener la medición**
   - Presiona "Parar" cuando el flotador llegue a la distancia final
   - El tiempo se capturará automáticamente

4. **Guardar la lectura**
   - Presiona "Agregar" para registrar esta medición
   - La lectura aparecerá en la lista

5. **Realizar múltiples lecturas**
   - Repite los pasos 1-4 al menos 3 veces
   - Se recomienda 5-10 lecturas para mayor precisión
   - La aplicación calculará automáticamente el promedio

### Paso 4: Guardar el Aforo

1. Verifica que todas las lecturas se hayan registrado
2. Presiona "Guardar Aforo"
3. La aplicación calculará automáticamente:
   - El área de la sección
   - La velocidad promedio
   - El caudal final
4. Se confirmará que el aforo fue guardado

## Pantallas de la Aplicación

### 🏠 Pantalla de Inicio

**Funciones:**
- Acceso rápido a nuevas mediciones
- Visualización del historial
- Acceso a reportes
- Información del método

### 📝 Pantalla Nuevo Aforo

**Funciones:**
- Ingreso de parámetros del canal
- Cronómetro integrado
- Registro de múltiples lecturas
- Guardado automático de datos

**Campos:**
- Distancia, Espejo de agua, Tirante, Base menor
- Factor de corrección
- Ubicación y observaciones
- Cronómetro con inicio/parada

### 📊 Pantalla Historial

**Funciones:**
- Visualización de todos los aforos realizados
- Ordenamiento por fecha (más recientes primero)
- Visualización rápida de caudales
- Acceso a detalles completos
- Eliminación de mediciones

**Información mostrada:**
- Ubicación
- Fecha y hora
- Caudal calculado
- Parámetros principales

### 🔍 Pantalla Detalle del Aforo

**Funciones:**
- Visualización completa de todos los datos
- Tabla de todas las lecturas realizadas
- Generación de PDF
- Compartir reportes

**Información disponible:**
- Todos los parámetros ingresados
- Observaciones
- Listado detallado de lecturas
- Resultados finales del cálculo

### 📈 Pantalla Reportes

**Funciones:**
- Estadísticas generales
- Análisis de datos históricos
- Gráficos comparativos
- Tendencias de caudal

**Datos mostrados:**
- Total de aforos realizados
- Caudal promedio, mínimo y máximo
- Promedios de parámetros
- Últimos aforos realizados

## Preguntas Frecuentes

### P: ¿Cuál es la distancia mínima para el flotador?
**R:** Se recomienda una distancia mínima de 5 metros para mayor precisión en la medición del tiempo.

### P: ¿Cuántas lecturas debo realizar?
**R:** Mínimo 3 lecturas, pero se recomienda 5-10 para mayor precisión estadística.

### P: ¿Qué factor de corrección debo usar?
**R:** Típicamente 0.85, pero depende de:
- Tipo de flotador (corcho, espuma, botella)
- Condiciones de turbulencia
- Profundidad del flujo
Consulta normativas locales para mayor precisión.

### P: ¿Puedo usar la aplicación sin internet?
**R:** Sí, todos los datos se guardan localmente. Solo necesitarás internet para compartir reportes.

### P: ¿Cómo exporto los datos?
**R:** Desde la pantalla de detalle de cada aforo, presiona "Generar PDF" para crear un reporte.

### P: ¿Dónde se guardan los datos?
**R:** Los datos se almacenan en una base de datos local SQLite del dispositivo.

### P: ¿Puedo eliminar un aforo?
**R:** Sí, desliza hacia la izquierda o presiona el ícono de eliminar en el historial.

## Solución de Problemas

### El cronómetro no funciona

**Soluciones:**
1. Reinicia la aplicación
2. Cierra otras aplicaciones que usen cronómetro
3. Verifica los permisos de la aplicación
4. Reinicia el dispositivo

### Los datos no se guardan

**Soluciones:**
1. Verifica que haya espacio disponible en el dispositivo
2. Comprueba los permisos de almacenamiento
3. Intenta nuevamente después de reiniciar
4. Desinstala y reinstala la aplicación

### No puedo generar PDF

**Soluciones:**
1. Verifica permisos de almacenamiento
2. Asegúrate que haya espacio disponible
3. Intenta con un aforo diferente
4. Reinicia el dispositivo

### La aplicación se cierra inesperadamente

**Soluciones:**
1. Actualiza el sistema operativo
2. Libera memoria (cierra otras apps)
3. Desinstala y reinstala la aplicación
4. Reporta el error con detalles en GitHub

## Consejos de Campo

1. **Selecciona condiciones óptimas**
   - Evita días ventosos
   - Busca secciones con flujo uniforme
   - Evita turbulencias

2. **Realiza mediciones precisas**
   - Usa cinta métrica o flexómetro
   - Marca claramente los puntos inicial y final
   - Repite mediciones para verificar

3. **Usa flotadores apropiados**
   - Corcho natural
   - Bola de espuma
   - Botellas selladas
   - Deben ser neutralmente flotantes

4. **Registra condiciones**
   - Anota la hora del aforo
   - Describe el estado del agua
   - Nota cualquier anomalía

## Contacto y Soporte

Para reportar problemas o sugerencias:
- Abre un issue en: https://github.com/Lebrime/flotador-aforador-app/issues
- Email: lebrime@gmail.com

---

**Versión de documento:** 1.0  
**Última actualización:** 2024  
**Aplicación compatible:** v1.0.0+
