/**
 * @fileoverview Componente personalizado para barras de gráficos Recharts.
 * Asigna un color diferente a cada barra basado en su índice.
 */
import { Rectangle } from "recharts";

/**
 * Componente BarraDeColor.
 * Renderiza un rectángulo con un color específico seleccionado de una paleta predefinida.
 * Utilizado como 'shape' personalizado en componentes Bar de Recharts.
 * 
 * @param {Object} props - Propiedades pasadas por Recharts (x, y, width, height, index).
 * @returns {JSX.Element} Rectángulo coloreado.
 */
function BarraDeColor(props) {
    const { x, y, width, height, index } = props;
    // Array de colores hexadecimales para asignar a las barras
    const COLORS = [
        "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28BFE",
        "#FF4567", "#32CD32", "#8B008B", "#FF1493", "#00FFFF",
        "#7FFF00", "#D2691E", "#DC143C", "#FFD700", "#ADFF2F",
        "#8A2BE2", "#FF6347", "#40E0D0", "#DA70D6", "#FF4500",
        "#1E90FF", "#3CB371", "#9932CC", "#FF8C00", "#66CDAA",
        "#B22222", "#FF00FF", "#FFDEAD", "#4B0082", "#20B2AA",
        "#E6E6FA", "#8B4513", "#48D1CC", "#FF69B4", "#CD5C5C",
        "#4682B4", "#EE82EE", "#FF7F50", "#9ACD32", "#BA55D3",
        "#6495ED", "#2E8B57", "#FFB6C1", "#DB7093", "#5F9EA0",
        "#FFDAB9", "#FF0000", "#8FBC8F", "#7B68EE", "#FA8072",
    ];
    return (
        <Rectangle x={x} y={y} width={width} height={height} fill={COLORS[index % COLORS.length]} />
    );
}

export default BarraDeColor;
