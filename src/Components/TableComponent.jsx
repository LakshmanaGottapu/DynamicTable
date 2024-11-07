import {useState} from 'react'
import {Table} from 'antd'
function TableComponent() {
    const [selectedRows, setSelectedRows] = useState([]);
    const columns = [
        {
            title: 'Naamam',
            dataIndex:'peru',
            render: (text)=><a href='#'>{text}</a>
        },
        {
            title: 'Age',
            dataIndex:'vayasu'
        }
    ]
    const dataSource = [
        {
            key: 0,
            peru: 'thanu',
            vayasu: '21'
        },
        {
            key: 1,
            peru: 'lakshman',
            vayasu: '28'
        }
    ]
    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            rowSelection={{selectedRows, type:'checkbox', onChange:(selectedRowKeys, selectedRows, info)=>{
                console.log(info);
            }}}
        >

        </Table>
    )
}

export default TableComponent
