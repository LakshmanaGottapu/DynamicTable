import { createContext, useState } from "react";

export const ShipmentContext = createContext({
    
});

export function ShipmentContextProvider({children}){
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [operator, setOperator] = useState('');
    const [popUpVisibility, setPopUpVisibility] = useState(false);
    const operatorMap = {
        '[]' : 'In Between', '<' : 'Less Than', '=' : 'Equal To', '>' : 'Greater Than', '<=' : 'Less Than Or Equal To', '>=' : 'Greater Than Or Equal To'
    }
    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    const contextProps = {
        fromDate, setFromDate, toDate, setToDate, operator, setOperator, popUpVisibility, setPopUpVisibility, operatorMap, formatDate
    }
    return (
        <ShipmentContext.Provider value={contextProps}>
            {children}
        </ShipmentContext.Provider>
    )
}

