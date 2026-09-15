import React, { useState, useFocusEffect } from 'react';
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
import { getAllAforos } from '../database/db';
import { calcularEstadisticas } from '../utils/calculations';
import moment from 'moment';

const ReportesScreen = () => {
  const [aforos, setAforos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [estadisticas, setEstadisticas] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      cargarReportes();
    }, [])
  );

  const cargarReportes = async () => {
    setLoading(true);
    try {
      const aforosData = await getAllAforos();
      setAforos(aforosData);
      calcularEstadisticasReportes(aforosData);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los reportes');
    } finally {
      setLoading(false);
    }
  };

  const calcularEstadisticasReportes = (aforosData) => {
    if (aforosData.length === 0) {
      setEstadisticas(null);
      return;
    }

    const caudales = aforosData.map((a) => a.caudal_calculado);
    const distancias = aforosData.map((a) => a.distancia);
    const tirantes = aforosData.map((a) => a.tirante);

    const stats = {
      totalAforos: aforosData.length,
      caudal: {
        promedio: caudales.reduce((a, b) => a + b, 0) / caudales.length,
        minimo: Math.min(...caudales),
        maximo: Math.max(...caudales),
      },
      distancia: {
        promedio: distancias.reduce((a, b) => a + b, 0) / distancias.length,
      },
      tirante: {
        promedio: tirantes.reduce((a, b) => a + b, 0) / tirantes.length,
      },
    };

    setEstadisticas(stats);
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#1976d2" />
        <Text style={styles.loadingText}>Cargando reportes...</Text>
      </View>
    );
  }

  if (aforos.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <MaterialCommunityIcons
          name="chart-box-outline"
          size={64}
          color="#ccc"
        />
        <Text style={styles.emptyText}>No hay datos para reportes</Text>
        <Text style={styles.emptySubText}>
          Realiza aforos para ver estadísticas
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Estadísticas Generales */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estadísticas Generales</Text>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="counter" size={30} color="#2196F3" />
            <Text style={styles.statLabel}>Total de Aforos</Text>
            <Text style={styles.statValue}>{estadisticas.totalAforos}</Text>
          </View>

          <View style={styles.statCard}>
            <MaterialCommunityIcons name="water" size={30} color="#4CAF50" />
            <Text style={styles.statLabel}>Caudal Promedio</Text>
            <Text style={styles.statValue}>
              {estadisticas.caudal.promedio.toFixed(4)}
            </Text>
            <Text style={styles.statUnit}>m³/s</Text>
          </View>

          <View style={styles.statCard}>
            <MaterialCommunityIcons name="water-opacity" size={30} color="#FF9800" />
            <Text style={styles.statLabel}>Caudal Mínimo</Text>
            <Text style={styles.statValue}>
              {estadisticas.caudal.minimo.toFixed(4)}
            </Text>
            <Text style={styles.statUnit}>m³/s</Text>
          </View>

          <View style={styles.statCard}>
            <MaterialCommunityIcons name="wave" size={30} color="#d32f2f" />
            <Text style={styles.statLabel}>Caudal Máximo</Text>
            <Text style={styles.statValue}>
              {estadisticas.caudal.maximo.toFixed(4)}
            </Text>
            <Text style={styles.statUnit}>m³/s</Text>
          </View>
        </View>
      </View>

      {/* Datos Promedios */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Promedios de Mediciones</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Distancia Promedio</Text>
            <Text style={styles.infoValue}>
              {estadisticas.distancia.promedio.toFixed(2)} m
            </Text>
          </View>
          <View style={[styles.infoRow, styles.borderTop]}>
            <Text style={styles.infoLabel}>Tirante Promedio</Text>
            <Text style={styles.infoValue}>
              {estadisticas.tirante.promedio.toFixed(2)} m
            </Text>
          </View>
        </View>
      </View>

      {/* Últimos Aforos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Últimos Aforos Realizados</Text>

        {aforos.slice(0, 5).map((aforo, index) => (
          <View key={index} style={styles.recordCard}>
            <View style={styles.recordHeader}>
              <View>
                <Text style={styles.recordTitle}>
                  {aforo.ubicacion || 'Ubicación sin especificar'}
                </Text>
                <Text style={styles.recordDate}>
                  {moment(aforo.fecha).format('DD/MM/YYYY HH:mm')}
                </Text>
              </View>
              <View style={styles.recordCaudal}>
                <Text style={styles.recordValue}>
                  {aforo.caudal_calculado.toFixed(4)}
                </Text>
                <Text style={styles.recordUnit}>m³/s</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  emptyText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999',
  },
  emptySubText: {
    marginTop: 5,
    fontSize: 12,
    color: '#ccc',
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
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    borderTopWidth: 3,
    borderTopColor: '#2196F3',
  },
  statLabel: {
    fontSize: 10,
    color: '#999',
    marginTop: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 3,
  },
  statUnit: {
    fontSize: 9,
    color: '#666',
    marginTop: 2,
  },
  infoCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
  },
  recordCard: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 5,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#1976d2',
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recordTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  recordDate: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
  recordCaudal: {
    alignItems: 'center',
  },
  recordValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  recordUnit: {
    fontSize: 9,
    color: '#999',
  },
});

export default ReportesScreen;
