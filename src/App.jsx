import { useEffect, useState } from 'react';
import PopupSect from './Components/PopupSect'
import {DatePicker, Select} from 'antd';
import {Container, Row, Col} from 'react-bootstrap';

function App() {
  const [popupData, setPopupData] = useState([{operator:'',value:[null, null]}]);
  const [popUpVisibility, setPopUpVisibility] = useState(false);
  // useEffect(()=>{
  //   if(popUpVisibility){
  //     setPopupData(prev => {
  //       const newPopupData = [...prev];
  //       newPopupData.splice(0,1,{
  //         operator: operator? operator : '', value:[fromDate, toDate] 
  //       })
  //       return newPopupData;
  //   })
  // }
  // },[popUpVisibility])
  console.log('app');
  function updateFromDate(date){
    setPopupData(data => {
      data[0].value[0] = date;
      return [...data]
    })
  }
  function updateToDate(date){
    setPopupData(data => {
      data[0].value[1] = date;
      return [...data]
    })
  }
  const operatorMap = {
      '[]' : 'In Between', '<' : 'Less Than', '=' : 'Equal To', '>' : 'Greater Than', '<=' : 'Less Than Or Equal To', '>=' : 'Greater Than Or Equal To'
  }
  const countries = ['USA', 'AUSTRALIA', 'INDIA', 'CHINA', 'KOREA']
  const legalEntities = ['USA', 'AUSTRALIA', 'INDIA', 'CHINA', 'KOREA'];
  return (
    <Container>
      <Row>
        <Col className="col-md-2">
          <Select
          >
              {
                countries.map((country, index) => <Select.Option key={index} value={country}>{country}</Select.Option>)
              }
          </Select>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <Select
          >
              {
                legalEntities.map((entity, index) => <Select.Option key={index} value={entity}>{entity}</Select.Option>)
              }
          </Select>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>POC:</h4>
        </Col>
        <Col>
          <DatePicker 
            value={popupData[0].value[0]}
            onChange={updateFromDate}
            format = 'DD/MM/YYYY'
            placeholder="Select a date"
          />
        </Col>
        <Col>
          <h4>Operator:</h4> 
        </Col>
        <Col >{popupData[0].operator}</Col>
        <Col>
          <h4>ToDate:</h4>
        </Col>
        <Col>
          <DatePicker 
            value={popupData[0].value[1]}
            onChange={updateToDate}
            format = 'DD/MM/YYYY'
            placeholder="Select a date"
          />
        </Col>
        <button style={{width:'2rem', marginBlock:'1rem'}} onClick={()=>setPopUpVisibility(true)}>link</button>
        {/* {console.log({popupDataApp:popupData})} */}
        {<PopupSect popupData={popupData} setPopupData={setPopupData} popUpVisibility={popUpVisibility} setPopUpVisibility={setPopUpVisibility} operatorMap={operatorMap} />}
        <p>{JSON.stringify(popupData)}</p>
      </Row>
    </Container>
  )
}

export default App
