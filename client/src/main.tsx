import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './main.css'
import { AuthenticationProvider } from './contexts/AuthenticationContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthenticationProvider>
            <App />
        </AuthenticationProvider>
    </React.StrictMode>,
)
