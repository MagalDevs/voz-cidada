import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// Função de inicialização do app
const startApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error("Elemento 'root' não encontrado!");
  createRoot(rootElement).render(<App />);
};

// Verifica se é Cordova ou navegador
if (typeof window.cordova === 'undefined') {
  startApp(); // Executa imediatamente no navegador
} else {
  document.addEventListener('deviceready', startApp, false); // Espera o Cordova no mobile
}