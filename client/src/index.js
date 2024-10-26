import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
// axios.defaults.baseURL = 'https://3c2a-103-155-118-225.ngrok-free.app/api/v1';
axios.defaults.baseURL = 'http://localhost:8080/api/v1';
// axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'true';
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Toaster position="top-center" />
    <App />
  </Provider>
);

reportWebVitals();