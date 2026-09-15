import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';
import NuevoAforoScreen from './src/screens/NuevoAforoScreen';
import HistorialScreen from './src/screens/HistorialScreen';
import DetalleAforoScreen from './src/screens/DetalleAforoScreen';
import ReportesScreen from './src/screens/ReportesScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#1976d2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: 'Aforador - Método del Flotador' }}
      />
      <Stack.Screen
        name="NuevoAforo"
        component={NuevoAforoScreen}
        options={{ title: 'Nuevo Aforo' }}
      />
    </Stack.Navigator>
  );
}

function HistorialStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#1976d2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="HistorialScreen"
        component={HistorialScreen}
        options={{ title: 'Historial de Aforos' }}
      />
      <Stack.Screen
        name="DetalleAforo"
        component={DetalleAforoScreen}
        options={{ title: 'Detalle del Aforo' }}
      />
    </Stack.Navigator>
  );
}

function ReportesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#1976d2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="ReportesScreen"
        component={ReportesScreen}
        options={{ title: 'Reportes' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Historial') {
                iconName = focused ? 'history' : 'history';
              } else if (route.name === 'Reportes') {
                iconName = focused ? 'file-chart' : 'file-chart-outline';
              }

              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#1976d2',
            tabBarInactiveTintColor: '#999',
            tabBarStyle: {
              backgroundColor: '#f5f5f5',
              borderTopColor: '#ddd',
            },
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              title: 'Inicio',
              tabBarLabel: 'Inicio',
            }}
          />
          <Tab.Screen
            name="Historial"
            component={HistorialStack}
            options={{
              title: 'Historial',
              tabBarLabel: 'Historial',
            }}
          />
          <Tab.Screen
            name="Reportes"
            component={ReportesStack}
            options={{
              title: 'Reportes',
              tabBarLabel: 'Reportes',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
