import { createContext, useState } from "react";

export const ShipmentContext = createContext({
    
});

export function ShipmentContextProvider({children}){
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [operator, setOperator] = useState('');
    const [popUpVisibility, setPopUpVisibility] = useState(false);
    const contextProps = {
        fromDate, setFromDate, toDate, setToDate, operator, setOperator, popUpVisibility, setPopUpVisibility
    }
    return (
        <ShipmentContext.Provider value={contextProps}>
            {children}
        </ShipmentContext.Provider>
    )
}

