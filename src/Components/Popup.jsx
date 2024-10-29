import { useRef, useState } from "react";

const Popup = () => {
    // const { checkboxes, setCheckbox, dropdown, setDropdown, fromDate, toDate, setFromDate, setToDate, togglePopup, updateCheckbox,
    //   updateDropdown,
    //   updateFromDate,
    //   updateDescription,
    //   dropDownMap,
    //   updateToDate, updateDatesForSmallestIndex, smallestIndexObject } = useStore();
    const formRef = useRef(null);

    // console.log("section", section)
    // console.log("fromDate", fromDate)
    // console.log("toDate", toDate)
    // console.log("smallestIndexObject", smallestIndexObject)
    const SECTIONS_COUNT = 5
    const sections = useState(Array.from({length:SECTIONS_COUNT}, (_,i)=>i+1));
    console.log(sections);

    const handleOk = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObj = {};
        formData.entries().forEach(entry => {
            formObj[entry[0]] = entry[1];
            // console.log(entry);
        })
        console.log(formObj);
      // togglePopup();
    };

    return (
        <div className="popup" style={{ width: '900px' }}>
            <h2>MultipleSelection</h2>
            <form  onSubmit={handleOk} ref={formRef}>
                <table>
                    <thead>
                        <tr>
                            <th>Checkbox</th>
                            <th>Option</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sections.map(value => (
                                <tr key={value}>
                                    <td>
                                        <input type="checkbox" name={`checkbox_${value}`}/>
                                    </td>
                                    <td>
                                        <select name={`dropdown_${value}`}>
                                            <option value="" defaultValue={""}>Select</option>
                                            <option value="[]">[]</option>
                                            <option value="<">{'<'}</option>
                                            <option value=">">{'>'}</option>
                                            <option value="<=">{'<='}</option>
                                            <option value="=">{'='}</option>
                                            <option value=">=">{'>='}</option>
                                        </select>
                                    </td>
                                </tr>
                            ))      
                        }
                    </tbody>
                </table>
                <button type="submit">Ok</button>
            </form>
        </div>
    );
};

  export default Popup;
