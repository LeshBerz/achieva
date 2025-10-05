// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { init } from '@telegram-apps/sdk';

// const initializeTelegramSDK = async () => {
//   try {
//     await init();
//   } 
//   catch (error) {
//     console.error('Ошибка инициализации:', error);
//   }
// };

// initializeTelegramSDK();

// const rootElement = document.getElementById('root');
// if (rootElement){
//   createRoot(rootElement).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
    
//   )
// }

// src/main.tsx (пример, если ReactDOM там)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initTelegram } from './services/telegramService'; // Импорт

// Инициализируем Telegram перед рендером
initTelegram().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});