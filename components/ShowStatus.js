import { Button, Table, Icon } from 'antd';
import { Resizable } from 'react-resizable';
import React, {useEffect, useState} from 'react';
import { getStatuses } from '../apis/statusesApis';
import Router from 'next/router';

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

const redirectToCreatePage = () => {
  Router.push('/statuses/0')
}

const tableColumns = [
    {   
      title: 'id',
      dataIndex: 'id',
      width: 100
    },
    {   
      title: 'Sataus NameAr',
      dataIndex: 'nameAr',
      width: 100
    },
    {   
      title: 'Status NameEn',
      dataIndex: 'nameEn',
      width: 100
    },
  ]

  const components = {
    header: {
      cell: ResizeableTitle
    }
  };

function showStatuses() {
 const [saveStatus, setSaveStatus] = useState([])

 useEffect(async() => {
  console.log('hvasdhvahjsdvjahsjdasdasd')
  const response = await getStatuses()
  console.log('sssss:  ',response)
  setSaveStatus(response.data)
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
        <Button onClick={redirectToCreatePage} type="primary" htmlType="submit" className="mb-3">Create</Button>
        <Table
          bordered
          components={components}
          columns={columns}
          dataSource={saveStatus}
        />
      </>
    );
}

export default showStatuses;
