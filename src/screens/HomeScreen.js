import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="water-opacity" size={64} color="#1976d2" />
        <Text style={styles.headerText}>Aforador Método del Flotador</Text>
        <Text style={styles.subtitleText}>Medición de caudal en canales</Text>
      </View>

      <View style={styles.cardsContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('NuevoAforo')}
        >
          <View style={[styles.cardIcon, { backgroundColor: '#4CAF50' }]}>
            <MaterialCommunityIcons name="plus-circle" size={40} color="#fff" />
          </View>
          <Text style={styles.cardTitle}>Nuevo Aforo</Text>
          <Text style={styles.cardDescription}>
            Realizar una nueva medición de caudal
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Historial')}
        >
          <View style={[styles.cardIcon, { backgroundColor: '#2196F3' }]}>
            <MaterialCommunityIcons name="history" size={40} color="#fff" />
          </View>
          <Text style={styles.cardTitle}>Historial</Text>
          <Text style={styles.cardDescription}>
            Ver aforos anteriores realizados
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Reportes')}
        >
          <View style={[styles.cardIcon, { backgroundColor: '#FF9800' }]}>
            <MaterialCommunityIcons name="file-chart" size={40} color="#fff" />
          </View>
          <Text style={styles.cardTitle}>Reportes</Text>
          <Text style={styles.cardDescription}>
            Generar reportes y estadísticas
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Información del Método</Text>
        <Text style={styles.infoText}>
          • Distancia: Distancia que recorre el flotador (m){"\n"}
          • Espejo de agua: Ancho superior del canal (m){"\n"}
          • Tirante: Profundidad del agua (m){"\n"}
          • Base menor: Ancho inferior del canal (m){"\n"}
          • Factor de corrección: 0.8-0.9 (típicamente 0.85){"\n"}
          • Fórmula: Q = A × V × Fc
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#1976d2',
    paddingVertical: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  subtitleText: {
    fontSize: 14,
    color: '#e3f2fd',
    marginTop: 5,
  },
  cardsContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  infoSection: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginBottom: 30,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
});

export default HomeScreen;
