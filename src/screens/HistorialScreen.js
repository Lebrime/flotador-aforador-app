import React, { useState, useFocusEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getAllAforos, deleteAforo } from '../database/db';
import moment from 'moment';

const HistorialScreen = ({ navigation }) => {
  const [aforos, setAforos] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      cargarAforos();
    }, [])
  );

  const cargarAforos = async () => {
    setLoading(true);
    try {
      const aforosData = await getAllAforos();
      setAforos(aforosData);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los aforos: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAforo = (aforoId) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar este aforo?',
      [
        { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              await deleteAforo(aforoId);
              cargarAforos();
              Alert.alert('Éxito', 'Aforo eliminado correctamente');
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el aforo');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('DetalleAforo', { aforoId: item.id, aforoData: item })
      }
    >
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.cardTitle}>
            {item.ubicacion || 'Ubicación sin especificar'}
          </Text>
          <Text style={styles.cardSubtitle}>
            {moment(item.fecha).format('DD/MM/YYYY')} - {item.hora}
          </Text>
        </View>
        <View style={styles.caudal}>
          <Text style={styles.caudalValue}>
            {item.caudal_calculado.toFixed(4)}
          </Text>
          <Text style={styles.caudalUnit}>m³/s</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.infoText}>
          <MaterialCommunityIcons name="ruler" size={12} color="#666" /> D:{' '}
          {item.distancia}m
        </Text>
        <Text style={styles.infoText}>
          <MaterialCommunityIcons name="water-opacity" size={12} color="#666" />{' '}
          T: {item.tirante}m
        </Text>
        <Text style={styles.infoText}>
          <MaterialCommunityIcons name="wave" size={12} color="#666" /> E:{' '}
          {item.espejo_agua}m
        </Text>
      </View>

      <TouchableOpacity
        style={styles.deleteIcon}
        onPress={() => handleDeleteAforo(item.id)}
      >
        <MaterialCommunityIcons name="delete" size={20} color="#d32f2f" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#1976d2" />
        <Text style={styles.loadingText}>Cargando aforos...</Text>
      </View>
    );
  }

  if (aforos.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <MaterialCommunityIcons
          name="inbox-multiple-outline"
          size={64}
          color="#ccc"
        />
        <Text style={styles.emptyText}>No hay aforos registrados</Text>
        <Text style={styles.emptySubText}>
          Comienza realizando un nuevo aforo
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={aforos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshing={loading}
        onRefresh={cargarAforos}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 10,
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#1976d2',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 11,
    color: '#999',
    marginTop: 3,
  },
  caudal: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  caudalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  caudalUnit: {
    fontSize: 10,
    color: '#1976d2',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  infoText: {
    fontSize: 11,
    color: '#666',
  },
  deleteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
});

export default HistorialScreen;
