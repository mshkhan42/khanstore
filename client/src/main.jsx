import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './context/CartContext';
import { Analytics } from '@vercel/analytics/react'; // ✅ Add this line

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter>
        <App />
        <Analytics /> {/* ✅ Add this component */}
      </BrowserRouter>
    </CartProvider>
  </StrictMode>
);
