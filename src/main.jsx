import { createRoot } from 'react-dom/client';
import App from './App';
import Datepicker from "./Components/Datepicker";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import TableWrapper from "./Components/TableWrapper";
import CitizenTable from "./Pages/CitizenTable";
const router = createBrowserRouter([
    {
        path: "/table",
        element: <TableWrapper/> 
    },
    {
        path:"/",
        element:<CitizenTable/>
    },
    {
        path: "/date",
        element: <Datepicker/>
    }
])

createRoot(document.getElementById('root')).render(<RouterProvider router={router}/>)

