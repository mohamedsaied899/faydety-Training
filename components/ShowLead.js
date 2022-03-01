import { Table, Button } from 'antd';
import { Resizable } from 'react-resizable';
import React, {useEffect, useState} from 'react';
import { getLeads } from '../apis/leadsApis';

const ResizeableTitle = props => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} height={0} onResize={onResize}>
      <th {...restProps} />
    </Resizable>
  );
};

const tableColumns = [
    {   
        title: 'id',
        dataIndex: 'id',
        width: 100
    },
      {
        title: 'fullName',
        dataIndex: 'fullName',
        width: 100 
      },
  ]

  const components = {
    header: {
      cell: ResizeableTitle
    }
  };

function showLead() {
 const [saveLeads, setSaveLeads] = useState([])

 useEffect(async() => {
  const response = await getLeads()
  setSaveLeads(response)
},[])

const handleResize = index => (e, { size }) => {
    setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width
      };
      return { columns: nextColumns };
    });
  };
    const columns = tableColumns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: handleResize(index)
      })
    }));

    return (
      <>
        <Table
          bordered
          components={components}
          columns={columns}
          dataSource={saveLeads}
        />
      </>
    );
}

export default showLead;
