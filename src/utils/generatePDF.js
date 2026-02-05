/**
 * @fileoverview Función para generar archivos PDF a partir de contenido HTML.
 * 
 * Utiliza html2canvas para capturar el contenido visual y jsPDF para generar el documento.
 * Ideal para listas, tablas o reportes visibles en pantalla.
 * 
 * @module utils/generatePDF
 */

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Genera y descarga un archivo PDF a partir de un elemento del DOM.
 * 
 * @param {string} zonaImpresion - El ID del elemento HTML que se desea convertir a PDF.
 * @param {string} nombreDocumento - El nombre deseado para el archivo PDF (sin la extensión .pdf).
 * 
 * @description
 * 1. Busca el elemento por ID.
 * 2. Captura el contenido visual usando html2canvas con escala 2x para mejor resolución.
 * 3. Crea un PDF en formato A4.
 * 4. Calcula las dimensiones para ajustar la imagen al ancho del PDF manteniendo la proporción.
 * 5. Descarga automáticamente el archivo generado.
 */
const generatePDF = (zonaImpresion, nombreDocumento) => {
  // Obtener el elemento HTML a convertir
  const input = document.getElementById(zonaImpresion);

  // Capturar el elemento como imagen canvas
  // scale: 2 mejora la resolución de la captura para el PDF
  html2canvas(input, {
    scale: 2,
    // Ignorar elementos con clase 'omitir-pdf' (ej: botones de acciones)
    ignoreElements: (el) => el.classList.contains("omitir-pdf"),
  }).then((canvas) => {
    // Convertir el canvas a imagen PNG
    const imgData = canvas.toDataURL("image/png");

    // Crear un nuevo documento PDF en formato A4 (horizontal)
    const pdf = new jsPDF("p", "mm", "a4");

    // Dimensiones del PDF A4 en orientación 'portrait' (vertical)
    const imgWidth = 210; // Ancho estándar de A4 en milímetros

    // Calcular altura proporcional basada en el ancho del canvas y el ancho de la página A4
    // Esto asegura que la imagen no se distorsione al ajustarse al ancho del PDF
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Agregar imagen al PDF sin márgenes
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

    // Descargar el PDF con el nombre especificado
    pdf.save(nombreDocumento + ".pdf");
  });
};

export default generatePDF;
