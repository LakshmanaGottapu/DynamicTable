import { createRoot } from 'react-dom/client'
import { ShipmentContextProvider } from './ShipmentContext'
import App from './App'
import TableComponent from './Components/TableComponent'
createRoot(document.getElementById('root')).render(
    <ShipmentContextProvider>
        <App />
        <TableComponent/>
    </ShipmentContextProvider>
)

