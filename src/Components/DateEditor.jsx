import moment from 'moment';
import MomentDatePicker from './MomentDatePicker';
import { useState } from 'react';

export default function DateEditor({ row, value, onValueChange, onBlur, displayFormat="MM/DD/YYYY", saveFormat="YYYY-MM-DD", alternateInputFormats = ["M/D/YYYY", "M/DD/YYYY", "MM/D/YYYY", "MM/DD/YYYY"] }) {

    const [open, setOpen] = useState(false);
    const displayFormats = [displayFormat, ...alternateInputFormats]

    const parsedValue = value ? moment(value, displayFormats) : null

    const handleBlur = (forceClose = false) => {
        if ((!open || forceClose) && onBlur) setTimeout(() => onBlur(), 100)
    }

    return(
        <MomentDatePicker
            value={parsedValue}
            onChange={newValue => newValue ? onValueChange(newValue.format(row ? saveFormat : displayFormat)) : onValueChange(undefined)} 
            onOpenChange={(newOpenVal) => {setOpen(newOpenVal); if(!newOpenVal) {handleBlur(true)}}}
            autoFocus={row && true}
            format={displayFormats}
            onBlur={() => handleBlur(false)}
        />
    )
}