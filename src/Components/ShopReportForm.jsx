import {useState, useEffect} from 'react'
import { Select, Form } from 'antd';
function ShopReportForm({form}) {
    const [siteList, setSiteList] = useState([]);
    const [companycodeList, setCompanyCodeList] = useState([]);

    async function populateSiteList(){
        const siteData = await fetch('./src/API/sites.json')
        const jsonData = await siteData.json();
        setSiteList(jsonData);
    }
    async function populateCompanyCodeList(){
        const companyCodeData = await fetch('./src/API/companycodes.json')
        const jsonData = await companyCodeData.json();
        setCompanyCodeList(jsonData);
    }
    useEffect(()=>{
        populateSiteList();
        populateCompanyCodeList();
    },[])
    return (
        <>
            <Form.Item name="site" label="Site"
                onChange={(value)=>{form.setFieldValue("site", value)}}
            >
                <Select style={{width:'50%'}} allowClear>
                    {siteList.map(site => <Select.Option key={site.id}>{site.site}</Select.Option>)}
                </Select>
            </Form.Item>
            <Form.Item name="companycode" label="Company Code"
                onChange={(value)=>{form.setFieldValue("companycode", value)}}
            >
                <Select style={{width:'50%'}} allowClear>
                    {companycodeList.map(companycode => <Select.Option key={companycode.id}>{companycode.code}</Select.Option>)}
                </Select>
            </Form.Item>           
        </>
    )
}

export default ShopReportForm
