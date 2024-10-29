import { useRef } from "react";

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
  
  
    const handleOk = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const formObj = {};
      formData.entries(entry => {
        console.log(entry);
      })
      
      // togglePopup();
    };
  
    return (
        <div className="popup" style={{ width: '900px' }}>
            <h2>MultipleSelection</h2>
            <form action="" method="post" ref={formRef}>
                <table>
                    <tr>
                        <th>Checkbox</th>
                        <th>Option</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Description</th>
                    </tr>
                    <tbody>
                    {
                        [1,2,3,4,5].map(value => (
                            <tr>
                                <td>
                                    
                                </td>
                            </tr>
                        ))
                            
                    }
                        <input type="text" />
                        <button type="submit" onSubmit={handleOk}>Ok</button>
                    </tbody>
                        
                </table>
            </form>
        </div>
    );
};

  export default Popup;
  {
    [1,2,3,4,5].map(value => (
        <tr key={value}>
            <td>
                <input type="checkbox" name={`checkbox_${value}`}/>
            </td>
            <td>
                <select name={`dropdown_${value`}} >
                    <option value="" defaultValue={""}>Select</option>
                    <option value="[]">[]</option>
                    <option value=">">{>}</option>
                    <option value="<">{<}</option>
                    <option value=">=">{>=}</option>
                    <option value="<=">{<=}</option>
                    <option value="!=">{!=}</option>
                </select>
            </td>
        </tr>))
}