/**
 * @fileoverview Punto de entrada principal de la aplicación React.
 * Inicializa el renderizado del árbol de componentes en el DOM.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

/**
 * Renderiza el componente raíz de la aplicación dentro del elemento HTML con ID 'root'.
 * Utiliza StrictMode para destacar problemas potenciales en la aplicación durante el desarrollo.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
