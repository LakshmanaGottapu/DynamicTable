import { createRoot } from 'react-dom/client';
import App from './App';
import Datepicker from "./Components/Datepicker";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/> 
    },
    {
        path: "/date",
        element: <Datepicker/>
    }
])

createRoot(document.getElementById('root')).render(<RouterProvider router={router}/>)

