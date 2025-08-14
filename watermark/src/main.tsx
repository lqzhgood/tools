import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './page/App.tsx';
import { AppProvider } from './store/index.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppProvider>
            <App />
        </AppProvider>
    </StrictMode>
);
