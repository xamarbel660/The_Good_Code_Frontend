import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  // Estilos de página: padding interno y tamaño de fuente base
  page: {
    padding: 20,
    fontSize: 10,
  },
  // Estilos del título: centrado, fuerte, con separación inferior
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  // Estilos de tabla: ancho completo, flexbox para filas
  table: {
    display: "table",
    width: "100%",
    // borderStyle: "solid",
    // borderWidth: 1,
    // borderColor: "#bfbfbf",
    marginTop: 20,
  },
  // Estilos de fila: dirección horizontal
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  // Estilos de encabezado: fondo gris, bordes, 25% ancho (4 columnas)
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    backgroundColor: "#f0f0f0",
    padding: 8,
    fontWeight: "bold",
  },
  // Estilos de columna de datos: bordes, ancho proporcional
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    padding: 8,
  },
  // Estilos de celda: tamaño de fuente reducido para tabla
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 9,
  },
});


function ListadoCampañasParametrizadoPDF({ data }) {
  return (
    // Documento PDF con página tamaño A4
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Título del documento PDF */}
        <View style={styles.title}>
          <Text>Listado de Campañas</Text>
        </View>

        {/* Tabla principal */}
        <View style={styles.table}>
          {/* Fila de encabezados */}
          <View style={styles.tableRow}>
            {/* Columna: Nombre Campaña */}
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Nombre Campaña</Text>
            </View>
            {/* Columna: Objetivo Litros Sangre */}
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Objetivo Litros Sangre</Text>
            </View>
            {/* Columna: Fecha Inicio */}
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Fecha Inicio</Text>
            </View>
            {/* Columna: Fecha Fin */}
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Fecha Fin</Text>
            </View>
            {/* Columna: Foto (comentada - no se utiliza actualmente) */}
            {/* <View style={styles.tableColHeader}>
              <Text style={styles.tableCell}>Foto</Text>
            </View> */}
          </View>

          {/* Renderizar filas de datos para cada campaña */}
          {data.map((campaña, index) => (
            <View style={styles.tableRow} key={index}>
              {/* Celda: Nombre de la campaña */}
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{campaña.nombre_campana}</Text>
              </View>
              {/* Celda: Objetivo Litros Sangre */}
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {campaña.objetivo_litros_campana}
                </Text>
              </View>
              {/* Celda: Fecha Inicio */}
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {new Date(campaña.fecha_inicio_campana).toLocaleDateString("es-ES")}
                </Text>
              </View>
              {/* Celda: Fecha Fin */}
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {new Date(campaña.fecha_fin_campana).toLocaleDateString("es-ES")}
                </Text>
              </View>
              {/* Celda: Foto (comentada - no se utiliza actualmente) */}
              {/* <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {director.photo_url ? "✓" : ""}
                </Text>
              </View> */}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

export default ListadoCampañasParametrizadoPDF;
