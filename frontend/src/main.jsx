import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "../src/components/ui/toaster";

createRoot(document.getElementById('root')).render(
    <>
    <Toaster/>
    <App />
    </>
)
