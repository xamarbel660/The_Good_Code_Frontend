/**
 * Configuración global de la aplicación.
 * Este archivo se carga en tiempo de ejecución (runtime) y permite modificar la URL del backend
 * sin necesidad de recompilar la aplicación React.
 * 
 * @global
 * @property {Object} __APP_CONFIG__ - Objeto global de configuración accesible vía window.
 * @property {string} __APP_CONFIG__.API_URL - URL base de la API del backend.
 */
// Esto es para cuando el proyecto se despliegue en un servidor web sea mas facil cambiar la url del backend
window.__APP_CONFIG__ = {
    // API_URL: "http://localhost:3000/api"
    API_URL: 'http://44.219.137.83:3000/api'
}