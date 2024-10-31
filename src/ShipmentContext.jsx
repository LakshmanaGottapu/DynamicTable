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
    const contextProps = {
        fromDate, setFromDate, toDate, setToDate, operator, setOperator, popUpVisibility, setPopUpVisibility, operatorMap
    }
    return (
        <ShipmentContext.Provider value={contextProps}>
            {children}
        </ShipmentContext.Provider>
    )
}

