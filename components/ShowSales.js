import { Button, Table, Icon } from 'antd';
import { Resizable } from 'react-resizable';
import React, {useEffect, useState} from 'react';
import {getSales} from '../apis/salesPersonApis';

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
        title: 'Company',
        render: data=>data.company.name,
        width: 100
      },
      {
        title: 'firstName',
        dataIndex: 'firstName',
        width: 100 
      },
      {
        title: 'lastName',
        dataIndex: 'lastName',
        width: 100 
      },
      {
        title: 'email',
        dataIndex: 'email',
        width: 100 
      },
  ]

  const components = {
    header: {
      cell: ResizeableTitle
    }
  };

function showSales() {
 const [saveShowSales, setSaveShowSales] = useState([])

 useEffect(async() => {
  const response = await getSales()
  setSaveShowSales(response.data)
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
          dataSource={saveShowSales}
        />
      </>
    );
}

export default showSales;
