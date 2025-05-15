import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { init } from '@telegram-apps/sdk';

const initializeTelegramSDK = async () => {
  try {
    await init();
  } 
  catch (error) {
    console.error('Ошибка инициализации:', error);
  }
};

initializeTelegramSDK();

const rootElement = document.getElementById('root');
if (rootElement){
  createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
    
  )
}