import { createRoot } from 'react-dom/client'
import { ShipmentContextProvider } from './ShipmentContext'
import App from './App'

createRoot(document.getElementById('root')).render(
    <ShipmentContextProvider>
        <App />
    </ShipmentContextProvider>
)

