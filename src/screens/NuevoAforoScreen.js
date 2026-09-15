import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Stopwatch from 'react-native-stopwatch-timer';
import { saveAforo, saveLectura } from '../database/db';
import {
  calcularArea,
  calcularVelocidadPromedio,
  calcularCaudal,
  calcularVelocidad,
} from '../utils/calculations';
import moment from 'moment';

const NuevoAforoScreen = ({ navigation }) => {
  // Parámetros del canal
  const [distancia, setDistancia] = useState('');
  const [espejo_agua, setEspejoAgua] = useState('');
  const [tirante, setTirante] = useState('');
  const [base_menor, setBaseMenor] = useState('');
  const [factorCorreccion, setFactorCorreccion] = useState('0.85');
  const [ubicacion, setUbicacion] = useState('');
  const [observaciones, setObservaciones] = useState('');

  // Control del cronómetro y lecturas
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [lecturas, setLecturas] = useState([]);
  const [numeroLecturasPlaneadas, setNumeroLecturasPlaneadas] = useState('5');
  const [loading, setLoading] = useState(false);

  const handleStartStopwatch = () => {
    setIsStopwatchStart(true);
    setStopwatchTime(0);
  };

  const handleStopStopwatch = () => {
    setIsStopwatchStart(false);
  };

  const handleAddLectura = () => {
    const tiempoSegundos = stopwatchTime / 1000; // Convertir a segundos
    
    if (!distancia) {
      Alert.alert('Error', 'Por favor ingresa la distancia del flotador');
      return;
    }

    const velocidad = calcularVelocidad(parseFloat(distancia), tiempoSegundos);
    const nuevaLectura = {
      numero_lectura: lecturas.length + 1,
      tiempo: tiempoSegundos,
      velocidad: velocidad,
    };

    setLecturas([...lecturas, nuevaLectura]);
    setIsStopwatchStart(false);
    setStopwatchTime(0);
  };

  const handleRemoveLectura = (index) => {
    const nuevasLecturas = lecturas.filter((_, i) => i !== index);
    setLecturas(nuevasLecturas.map((l, i) => ({ ...l, numero_lectura: i + 1 })));
  };

  const handleGuardarAforo = async () => {
    if (!distancia || !espejo_agua || !tirante || !base_menor) {
      Alert.alert('Error', 'Por favor completa todos los parámetros del canal');
      return;
    }

    if (lecturas.length === 0) {
      Alert.alert('Error', 'Por favor realiza al menos una lectura de tiempo');
      return;
    }

    setLoading(true);
    try {
      // Calcular área y velocidad promedio
      const area = calcularArea(
        parseFloat(tirante),
        parseFloat(base_menor),
        parseFloat(espejo_agua)
      );

      const tiempos = lecturas.map((l) => l.tiempo);
      const velocidadPromedio = calcularVelocidadPromedio(parseFloat(distancia), tiempos);

      // Calcular caudal
      const caudal = calcularCaudal(area, velocidadPromedio, parseFloat(factorCorreccion));

      // Guardar en base de datos
      const aforoData = {
        fecha: moment().format('YYYY-MM-DD'),
        hora: moment().format('HH:mm:ss'),
        ubicacion,
        observaciones,
        distancia: parseFloat(distancia),
        espejo_agua: parseFloat(espejo_agua),
        tirante: parseFloat(tirante),
        base_menor: parseFloat(base_menor),
        factor_correccion: parseFloat(factorCorreccion),
        caudal_calculado: caudal,
      };

      const aforoId = await saveAforo(aforoData);

      // Guardar lecturas
      for (const lectura of lecturas) {
        await saveLectura(aforoId, lectura);
      }

      Alert.alert(
        'Éxito',
        `Aforo guardado correctamente\nCaudal: ${caudal.toFixed(4)} m³/s`,
        [
          {
            text: 'Ver Detalle',
            onPress: () => navigation.navigate('Historial'),
          },
          {
            text: 'Nuevo Aforo',
            onPress: () => limpiarFormulario(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el aforo: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const limpiarFormulario = () => {
    setDistancia('');
    setEspejoAgua('');
    setTirante('');
    setBaseMenor('');
    setFactorCorreccion('0.85');
    setUbicacion('');
    setObservaciones('');
    setLecturas([]);
    setStopwatchTime(0);
    setIsStopwatchStart(false);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Sección de parámetros del canal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Parámetros del Canal</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Distancia del Flotador (m)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 10"
            keyboardType="decimal-pad"
            value={distancia}
            onChangeText={setDistancia}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Espejo de Agua (m)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 5"
            keyboardType="decimal-pad"
            value={espejo_agua}
            onChangeText={setEspejoAgua}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tirante (m)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 1.5"
            keyboardType="decimal-pad"
            value={tirante}
            onChangeText={setTirante}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Base Menor (m)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 4"
            keyboardType="decimal-pad"
            value={base_menor}
            onChangeText={setBaseMenor}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Factor de Corrección</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 0.85"
            keyboardType="decimal-pad"
            value={factorCorreccion}
            onChangeText={setFactorCorreccion}
          />
        </View>
      </View>

      {/* Sección de información adicional */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información Adicional</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ubicación</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Río XYZ - Sección 1"
            value={ubicacion}
            onChangeText={setUbicacion}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Observaciones</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Notas adicionales sobre el aforo"
            multiline
            numberOfLines={3}
            value={observaciones}
            onChangeText={setObservaciones}
          />
        </View>
      </View>

      {/* Sección de cronómetro y lecturas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Lecturas de Tiempo</Text>

        {/* Cronómetro */}
        <View style={styles.stopwatchContainer}>
          <Text style={styles.stopwatchTime}>
            {String(Math.floor(stopwatchTime / 60000)).padStart(2, '0')}:
            {String(Math.floor((stopwatchTime % 60000) / 1000)).padStart(2, '0')}.
            {String(Math.floor((stopwatchTime % 1000) / 10)).padStart(2, '0')}
          </Text>

          <View style={styles.stopwatchButtons}>
            <TouchableOpacity
              style={[styles.button, styles.startButton]}
              onPress={handleStartStopwatch}
              disabled={isStopwatchStart}
            >
              <MaterialCommunityIcons name="play" size={20} color="#fff" />
              <Text style={styles.buttonText}>Iniciar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.stopButton]}
              onPress={handleStopStopwatch}
              disabled={!isStopwatchStart}
            >
              <MaterialCommunityIcons name="stop" size={20} color="#fff" />
              <Text style={styles.buttonText}>Parar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.addButton]}
              onPress={handleAddLectura}
            >
              <MaterialCommunityIcons name="plus" size={20} color="#fff" />
              <Text style={styles.buttonText}>Agregar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Lista de lecturas */}
        {lecturas.length > 0 && (
          <View style={styles.lecturasContainer}>
            <Text style={styles.lecturasTitle}>Lecturas Registradas</Text>
            {lecturas.map((lectura, index) => (
              <View key={index} style={styles.lecturaItem}>
                <View style={styles.lecturaInfo}>
                  <Text style={styles.lecturaNumber}>Lectura {lectura.numero_lectura}</Text>
                  <Text style={styles.lecturaData}>
                    Tiempo: {lectura.tiempo.toFixed(2)}s | Velocidad: {lectura.velocidad.toFixed(4)} m/s
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleRemoveLectura(index)}
                >
                  <MaterialCommunityIcons name="delete" size={20} color="#d32f2f" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Botón guardar */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={handleGuardarAforo}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <MaterialCommunityIcons name="content-save" size={20} color="#fff" />
              <Text style={styles.buttonText}>Guardar Aforo</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.clearButton]}
          onPress={limpiarFormulario}
        >
          <MaterialCommunityIcons name="refresh" size={20} color="#fff" />
          <Text style={styles.buttonText}>Limpiar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingBottom: 20,
  },
  section: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 10,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 12,
    backgroundColor: '#fafafa',
  },
  textArea: {
    textAlignVertical: 'top',
    paddingTop: 8,
  },
  stopwatchContainer: {
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  stopwatchTime: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1976d2',
    fontFamily: 'monospace',
    marginBottom: 15,
  },
  stopwatchButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    gap: 5,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
    gap: 5,
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    backgroundColor: '#FF5722',
  },
  addButton: {
    backgroundColor: '#2196F3',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: '#FF9800',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  lecturasContainer: {
    marginTop: 15,
  },
  lecturasTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  lecturaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  lecturaInfo: {
    flex: 1,
  },
  lecturaNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  lecturaData: {
    fontSize: 11,
    color: '#666',
    marginTop: 3,
  },
  deleteButton: {
    padding: 5,
  },
  actionButtons: {
    marginHorizontal: 10,
    marginTop: 10,
  },
});

export default NuevoAforoScreen;
