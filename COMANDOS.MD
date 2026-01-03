# Comandos de creación de proyectos e instalación de librerias

## React.js

### Crear plantilla de proyecto Vite con React
npm create vite@latest nombre_proyecto -- --template react

cd nombre_proyecto
npm install
npm run dev

### Saltar error de tipos del Linter en validación de props - linea 19 configuración linter
"react/prop-types": 0

### Instalar React Router
npm install react-router-dom

### Instalar libreria MUI
npm install @mui/material @emotion/react @emotion/styled

### Fuente Roboto para MUI o MDBoostrap
npm install @fontsource/roboto

// Agregar en main.jsx
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

### Material icons MUI
npm install @mui/icons-material

### Instalar libreria MDBootstrap para React
npm install mdb-react-ui-kit
npm install @fortawesome/fontawesome-free

// Agregar importación en main.jsx para todo el proyecto
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

### Librería Kendo UI

npm install --save @progress/kendo-react-charts @progress/kendo-react-buttons

[Enlace para instalar más componentes de Kendo UI](https://www.telerik.com/kendo-react-ui/components/getting-started/add-to-existing-project/)

## Node.js

### Crear proyecto con Node.js
mkdir proyecto
cd proyecto
npm init

### Instalar servidor web Express
npm install express

### Instalar nodemon
npm install --save-dev nodemon

### Nodemon en el script de desarrollo (dev)
{
  // ..
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // ..
}

### Lanzar el proyecto de Node.js
npm run dev


### Crear proyecto de Expo Go (React Native)
npx create-expo-app AwesomeProject

cd AwesomeProject
npx expo start

