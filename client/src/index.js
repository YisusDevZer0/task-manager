import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter } from 'react-router-dom';  // Asegúrate de importar esto

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>   {/* Agregar BrowserRouter alrededor de tu App */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
