import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { initDatabase } from './src/database/db';
import { name as appName } from './app.json';

// Inicializar base de datos
initDatabase()
  .then(() => {
    console.log('Base de datos inicializada correctamente');
  })
  .catch((error) => {
    console.log('Error al inicializar la base de datos:', error);
  });

AppRegistry.registerComponent(appName, () => App);
