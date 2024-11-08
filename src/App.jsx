import { useContext } from 'react';
import Popupsection from './Components/Popupsection'
import {DatePicker, Select} from 'antd';
import { ShipmentContext } from './ShipmentContext';
import {Container, Row, Col} from 'react-bootstrap';

function App() {
  const { popupData,fromDate, setFromDate, toDate, setToDate, operator, setPopUpVisibility, countries, legalEntities } = useContext(ShipmentContext);
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
            onChange={(date)=>setFromDate(date)}
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
        <button style={{width:'2rem', marginBlock:'1rem'}} onClick={()=>{setPopUpVisibility(prev => !prev)}}>link</button>
        {<Popupsection />}
        {<div>
            {
              console.log(popupData)
            }
          </div>}
      </Row>
    </Container>
  )
}

export default App
