import { useState } from 'react';
import PopupSect from './Components/PopupSect'
import {DatePicker, Select} from 'antd';
import {Container, Row, Col} from 'react-bootstrap';

function App() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [operator, setOperator] = useState('');
  const [popupData, setPopupData] = useState([]);
  const [popUpVisibility, setPopUpVisibility] = useState(false);
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
            value={fromDate}
            onChange={(date)=>{
              setFromDate(date);
            }}
            format = 'DD/MM/YYYY'
            placeholder="Select a date"
          />
        </Col>
        <Col>
          <h4>Operator:</h4> 
        </Col>
        <Col >{operator}</Col>
        <Col>
          <h4>ToDate:</h4>
        </Col>
        <Col>
          <DatePicker 
            value={toDate}
            onChange={(date)=>setToDate(date)}
            format = 'DD/MM/YYYY'
            placeholder="Select a date"
          />
        </Col>
        <button style={{width:'2rem', marginBlock:'1rem'}} onClick={()=>{
          if(!popUpVisibility && fromDate && toDate){
              setPopupData(prev => {
                const newPopupData = [...prev];
                newPopupData.splice(0,1,{
                  operator:'', value:[fromDate, toDate] 
                })
                return newPopupData;
            })
          }
          setPopUpVisibility(prev => !prev)
        }}>link</button>
        {console.log({popupDataApp:popupData})}
        {popUpVisibility && <PopupSect setPopupData={setPopupData} popUpVisibility={popUpVisibility} setPopUpVisibility={setPopUpVisibility} operatorMap={operatorMap} fromDate={fromDate} toDate={toDate} setFromDate={setFromDate} setToDate={setToDate} setOperator={setOperator} popupData={popupData}/>}
        <p>{JSON.stringify(popupData)}</p>
      </Row>
    </Container>
  )
}

export default App
