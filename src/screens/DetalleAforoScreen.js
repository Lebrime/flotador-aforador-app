import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getAforoById, getLecturasByAforoId } from '../database/db';
import { generarPDFAforo } from '../utils/pdfExport';
import { Share } from 'react-native';
import moment from 'moment';

const DetalleAforoScreen = ({ route }) => {
  const { aforoId, aforoData } = route.params;
  const [aforo, setAforo] = useState(aforoData || null);
  const [lecturas, setLecturas] = useState([]);
  const [loading, setLoading] = useState(!aforoData);
  const [generatingPDF, setGeneratingPDF] = useState(false);

  useEffect(() => {
    cargarDetalles();
  }, []);

  const cargarDetalles = async () => {
    setLoading(true);
    try {
      if (!aforoData) {
        const aforoDetail = await getAforoById(aforoId);
        setAforo(aforoDetail);
      }

      const lecturasData = await getLecturasByAforoId(aforoId);
      setLecturas(lecturasData);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los detalles del aforo');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerarPDF = async () => {
    setGeneratingPDF(true);
    try {
      const pdfPath = await generarPDFAforo(aforo, lecturas);
      Alert.alert('Éxito', `PDF generado en: ${pdfPath}`);
    } catch (error) {
      Alert.alert('Error', 'No se pudo generar el PDF: ' + error.message);
    } finally {
      setGeneratingPDF(false);
    }
  };

  const handleCompartir = async () => {
    try {
      const pdfPath = await generarPDFAforo(aforo, lecturas);
      Share.share({
        url: pdfPath,
        type: 'application/pdf',
        message: `Reporte de Aforo - ${aforo.ubicacion}`,
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo compartir el archivo');
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#1976d2" />
        <Text style={styles.loadingText}>Cargando detalles...</Text>
      </View>
    );
  }

  if (!aforo) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>No se encontró el aforo</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.title}>{aforo.ubicacion || 'Aforo sin ubicación'}</Text>
        <Text style={styles.subtitle}>
          {moment(aforo.fecha).format('DD [de] MMMM [de] YYYY')}
        </Text>
      </View>

      {/* Resultado Principal */}
      <View style={styles.resultSection}>
        <Text style={styles.resultLabel}>Caudal Calculado</Text>
        <Text style={styles.resultValue}>{aforo.caudal_calculado.toFixed(4)}</Text>
        <Text style={styles.resultUnit}>m³/s</Text>
      </View>

      {/* Parámetros del Canal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Parámetros del Canal</Text>
        <View style={styles.parameterGrid}>
          <View style={styles.parameterItem}>
            <Text style={styles.parameterLabel}>Distancia</Text>
            <Text style={styles.parameterValue}>{aforo.distancia}</Text>
            <Text style={styles.parameterUnit}>m</Text>
          </View>
          <View style={styles.parameterItem}>
            <Text style={styles.parameterLabel}>Espejo de Agua</Text>
            <Text style={styles.parameterValue}>{aforo.espejo_agua}</Text>
            <Text style={styles.parameterUnit}>m</Text>
          </View>
          <View style={styles.parameterItem}>
            <Text style={styles.parameterLabel}>Tirante</Text>
            <Text style={styles.parameterValue}>{aforo.tirante}</Text>
            <Text style={styles.parameterUnit}>m</Text>
          </View>
          <View style={styles.parameterItem}>
            <Text style={styles.parameterLabel}>Base Menor</Text>
            <Text style={styles.parameterValue}>{aforo.base_menor}</Text>
            <Text style={styles.parameterUnit}>m</Text>
          </View>
          <View style={styles.parameterItem}>
            <Text style={styles.parameterLabel}>Factor Corrección</Text>
            <Text style={styles.parameterValue}>{aforo.factor_correccion}</Text>
            <Text style={styles.parameterUnit}>-</Text>
          </View>
        </View>
      </View>

      {/* Información Adicional */}
      {aforo.observaciones && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Observaciones</Text>
          <Text style={styles.observaciones}>{aforo.observaciones}</Text>
        </View>
      )}

      {/* Lecturas */}
      {lecturas.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lecturas Registradas</Text>
          {lecturas.map((lectura, index) => (
            <View key={index} style={styles.lecturaCard}>
              <View style={styles.lecturaHeader}>
                <Text style={styles.lecturaNumber}>Lectura #{lectura.numero_lectura}</Text>
                <Text style={styles.lecturaTime}>{lectura.tiempo.toFixed(2)}s</Text>
              </View>
              <View style={styles.lecturaData}>
                <View style={styles.dataItem}>
                  <Text style={styles.dataLabel}>Velocidad</Text>
                  <Text style={styles.dataValue}>{lectura.velocidad.toFixed(4)} m/s</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Botones de Acción */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.button, styles.pdfButton]}
          onPress={handleGenerarPDF}
          disabled={generatingPDF}
        >
          {generatingPDF ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <>
              <MaterialCommunityIcons name="file-pdf-box" size={20} color="#fff" />
              <Text style={styles.buttonText}>Generar PDF</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.shareButton]}
          onPress={handleCompartir}
        >
          <MaterialCommunityIcons name="share-variant" size={20} color="#fff" />
          <Text style={styles.buttonText}>Compartir</Text>
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
  },
  header: {
    backgroundColor: '#1976d2',
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 12,
    color: '#e3f2fd',
    marginTop: 5,
  },
  resultSection: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginBottom: 15,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    borderTopWidth: 4,
    borderTopColor: '#4CAF50',
  },
  resultLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  resultValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  resultUnit: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  parameterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  parameterItem: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    borderLeftWidth: 3,
    borderLeftColor: '#2196F3',
  },
  parameterLabel: {
    fontSize: 10,
    color: '#999',
    marginBottom: 3,
  },
  parameterValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  parameterUnit: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
  observaciones: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  lecturaCard: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 5,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#FF9800',
  },
  lecturaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  lecturaNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  lecturaTime: {
    fontSize: 11,
    color: '#999',
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
  },
  lecturaData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataItem: {
    flex: 1,
  },
  dataLabel: {
    fontSize: 10,
    color: '#999',
  },
  dataValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    gap: 10,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    gap: 8,
  },
  pdfButton: {
    backgroundColor: '#d32f2f',
  },
  shareButton: {
    backgroundColor: '#1976d2',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default DetalleAforoScreen;
