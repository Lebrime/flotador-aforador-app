import RNPrint from 'react-native-print';
import RNFetchBlob from 'rn-fetch-blob';
import PDFLib from 'pdf-lib';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

/**
 * Genera un PDF con los datos del aforo
 * @param {object} aforo - Datos del aforo
 * @param {array} lecturas - Array de lecturas
 * @returns {Promise} Promesa que resuelve cuando se genera el PDF
 */
const generarPDFAforo = async (aforo, lecturas) => {
  try {
    const { PDFDocument, rgb, degrees } = PDFLib;

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // Tamaño A4
    const { height } = page.getSize();

    let yPosition = height - 50;

    // Título
    page.drawText('REPORTE DE AFORO - MÉTODO DEL FLOTADOR', {
      x: 50,
      y: yPosition,
      size: 16,
      color: rgb(25, 118, 210),
      maxWidth: 495.28,
    });

    yPosition -= 30;

    // Línea divisoria
    page.drawLine({
      start: { x: 50, y: yPosition },
      end: { x: 545.28, y: yPosition },
      thickness: 2,
      color: rgb(25, 118, 210),
    });

    yPosition -= 20;

    // Información general
    const infoGeneral = [
      { label: 'Fecha:', value: aforo.fecha },
      { label: 'Hora:', value: aforo.hora },
      { label: 'Ubicación:', value: aforo.ubicacion || 'N/A' },
      { label: 'Observaciones:', value: aforo.observaciones || 'N/A' },
    ];

    infoGeneral.forEach((item) => {
      page.drawText(`${item.label} ${item.value}`, {
        x: 50,
        y: yPosition,
        size: 10,
        maxWidth: 495.28,
      });
      yPosition -= 15;
    });

    yPosition -= 10;

    // Parámetros del canal
    page.drawText('PARÁMETROS DEL CANAL', {
      x: 50,
      y: yPosition,
      size: 12,
      color: rgb(25, 118, 210),
    });

    yPosition -= 15;

    const parametros = [
      { label: 'Distancia recorrida:', value: `${aforo.distancia} m` },
      { label: 'Espejo de agua:', value: `${aforo.espejo_agua} m` },
      { label: 'Tirante:', value: `${aforo.tirante} m` },
      { label: 'Base menor:', value: `${aforo.base_menor} m` },
      { label: 'Factor de corrección:', value: aforo.factor_correccion },
    ];

    parametros.forEach((item) => {
      page.drawText(`${item.label} ${item.value}`, {
        x: 50,
        y: yPosition,
        size: 9,
        maxWidth: 495.28,
      });
      yPosition -= 12;
    });

    yPosition -= 10;

    // Tabla de lecturas
    page.drawText('LECTURAS DE TIEMPO', {
      x: 50,
      y: yPosition,
      size: 12,
      color: rgb(25, 118, 210),
    });

    yPosition -= 15;

    // Encabezados de tabla
    const columnX = [50, 150, 250, 350, 450];
    const headers = ['Lectura', 'Tiempo (s)', 'Velocidad (m/s)', 'Caudal (m³/s)', ''];

    headers.forEach((header, index) => {
      page.drawText(header, {
        x: columnX[index],
        y: yPosition,
        size: 9,
        color: rgb(255, 255, 255),
      });
    });

    // Fondo para encabezados
    page.drawRectangle({
      x: 50,
      y: yPosition - 12,
      width: 495.28,
      height: 15,
      color: rgb(25, 118, 210),
    });

    yPosition -= 25;

    // Filas de datos
    lecturas.forEach((lectura, index) => {
      if (yPosition < 50) {
        // Nueva página si es necesario
        const newPage = pdfDoc.addPage([595.28, 841.89]);
        yPosition = newPage.getHeight() - 50;
      }

      page.drawText(`${lectura.numero_lectura}`, { x: 50, y: yPosition, size: 9 });
      page.drawText(`${lectura.tiempo.toFixed(2)}`, { x: 150, y: yPosition, size: 9 });
      page.drawText(`${lectura.velocidad.toFixed(4)}`, { x: 250, y: yPosition, size: 9 });
      page.drawText(`${(lectura.velocidad * 0.25).toFixed(4)}`, { x: 350, y: yPosition, size: 9 }); // Caudal aproximado

      yPosition -= 15;
    });

    yPosition -= 10;

    // Resultados finales
    page.drawText('RESULTADOS FINALES', {
      x: 50,
      y: yPosition,
      size: 12,
      color: rgb(25, 118, 210),
    });

    yPosition -= 20;

    page.drawText(`Caudal calculado: ${aforo.caudal_calculado.toFixed(4)} m³/s`, {
      x: 50,
      y: yPosition,
      size: 11,
      color: rgb(0, 128, 0),
    });

    yPosition -= 20;

    // Pie de página
    page.drawText(
      `Reporte generado el ${moment().format('DD [de] MMMM [de] YYYY [a las] HH:mm:ss')}`,
      {
        x: 50,
        y: 20,
        size: 8,
        color: rgb(128, 128, 128),
      }
    );

    const pdfBytes = await pdfDoc.save();
    const fileName = `Aforo_${moment().format('YYYY-MM-DD_HH-mm-ss')}.pdf`;
    const filePath = `${RNFetchBlob.fs.dirs.DocumentDir}/${fileName}`;

    await RNFetchBlob.fs.writeFile(filePath, pdfBytes, 'base64');

    return filePath;
  } catch (error) {
    console.log('Error generando PDF: ', error);
    throw error;
  }
};

/**
 * Imprime un PDF del aforo
 * @param {object} aforo - Datos del aforo
 * @param {array} lecturas - Array de lecturas
 * @returns {Promise} Promesa que resuelve cuando se imprime
 */
const imprimirAforo = async (aforo, lecturas) => {
  try {
    const pdfPath = await generarPDFAforo(aforo, lecturas);
    await RNPrint.print({ filePath: pdfPath });
  } catch (error) {
    console.log('Error imprimiendo: ', error);
    throw error;
  }
};

export { generarPDFAforo, imprimirAforo };
