import SQLite from 'react-native-sqlite-storage';

const database_name = 'aforador.db';
const database_version = '1.0';
const database_displayname = 'Base de Datos Aforador';
const database_size = 200000;

let db;

const initDatabase = async () => {
  try {
    db = await SQLite.openDatabase(
      {
        name: database_name,
        location: 'default',
        createFromLocation: '~aforador.db',
      },
      () => {
        console.log('Base de datos abierta correctamente');
      },
      (error) => {
        console.log('Error al abrir la base de datos: ', error);
      }
    );

    // Crear tablas si no existen
    await createTables();
  } catch (error) {
    console.log('Error inicializando la base de datos: ', error);
  }
};

const createTables = async () => {
  try {
    await db.transaction((tx) => {
      // Tabla de aforos
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS aforos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          fecha TEXT NOT NULL,
          hora TEXT NOT NULL,
          ubicacion TEXT,
          observaciones TEXT,
          distancia REAL,
          espejo_agua REAL,
          tirante REAL,
          base_menor REAL,
          factor_correccion REAL,
          caudal_calculado REAL,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
      );

      // Tabla de lecturas (para cada aforo)
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS lecturas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          aforo_id INTEGER NOT NULL,
          numero_lectura INTEGER,
          tiempo REAL,
          velocidad REAL,
          FOREIGN KEY(aforo_id) REFERENCES aforos(id) ON DELETE CASCADE
        )`
      );

      console.log('Tablas creadas correctamente');
    });
  } catch (error) {
    console.log('Error creando tablas: ', error);
  }
};

const getDatabase = () => {
  return db;
};

const saveAforo = async (aforoData) => {
  try {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO aforos (fecha, hora, ubicacion, observaciones, distancia, espejo_agua, tirante, base_menor, factor_correccion, caudal_calculado)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            aforoData.fecha,
            aforoData.hora,
            aforoData.ubicacion || '',
            aforoData.observaciones || '',
            aforoData.distancia,
            aforoData.espejo_agua,
            aforoData.tirante,
            aforoData.base_menor,
            aforoData.factor_correccion,
            aforoData.caudal_calculado,
          ],
          (_, result) => {
            resolve(result.insertId);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  } catch (error) {
    console.log('Error guardando aforo: ', error);
    throw error;
  }
};

const saveLectura = async (aforoId, lectura) => {
  try {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO lecturas (aforo_id, numero_lectura, tiempo, velocidad)
           VALUES (?, ?, ?, ?)`,
          [aforoId, lectura.numero, lectura.tiempo, lectura.velocidad],
          (_, result) => {
            resolve(result.insertId);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  } catch (error) {
    console.log('Error guardando lectura: ', error);
    throw error;
  }
};

const getAllAforos = async () => {
  try {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM aforos ORDER BY createdAt DESC`,
          [],
          (_, { rows }) => {
            const aforos = [];
            for (let i = 0; i < rows.length; i++) {
              aforos.push(rows.item(i));
            }
            resolve(aforos);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  } catch (error) {
    console.log('Error obteniendo aforos: ', error);
    throw error;
  }
};

const getAforoById = async (aforoId) => {
  try {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM aforos WHERE id = ?`,
          [aforoId],
          (_, { rows }) => {
            if (rows.length > 0) {
              resolve(rows.item(0));
            } else {
              resolve(null);
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  } catch (error) {
    console.log('Error obteniendo aforo: ', error);
    throw error;
  }
};

const getLecturasByAforoId = async (aforoId) => {
  try {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM lecturas WHERE aforo_id = ? ORDER BY numero_lectura`,
          [aforoId],
          (_, { rows }) => {
            const lecturas = [];
            for (let i = 0; i < rows.length; i++) {
              lecturas.push(rows.item(i));
            }
            resolve(lecturas);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  } catch (error) {
    console.log('Error obteniendo lecturas: ', error);
    throw error;
  }
};

const deleteAforo = async (aforoId) => {
  try {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `DELETE FROM aforos WHERE id = ?`,
          [aforoId],
          (_, result) => {
            resolve(result);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  } catch (error) {
    console.log('Error eliminando aforo: ', error);
    throw error;
  }
};

export {
  initDatabase,
  getDatabase,
  saveAforo,
  saveLectura,
  getAllAforos,
  getAforoById,
  getLecturasByAforoId,
  deleteAforo,
};
