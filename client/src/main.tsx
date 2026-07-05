import './main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import { AuthenticationProvider } from './contexts/AuthenticationProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthenticationProvider>
            <App />
        </AuthenticationProvider>
    </React.StrictMode>,
)
