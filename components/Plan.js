import { Button, Table } from 'antd';
import { Resizable } from 'react-resizable';
import React, {useEffect, useState} from 'react';
import { plans } from '../apis/plansApis';
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

const redirectToCreatePage = ()=>{
  Router.push('/plans/0')
}
const tableColumns = [
    {
      title: 'id',
      dataIndex: 'id',
      width: 100
    },
    {
      title: 'nameAr',
      dataIndex: 'nameAr',
      width: 100
    },
    {
      title: 'nameEn',
      dataIndex: 'nameEn',
      width: 100
    },
    {
      title: 'descriptionAr',
      dataIndex: 'descriptionAr',
      width: 100
    },
    {
      title: 'descriptionEn',
      dataIndex: 'descriptionEn',
      width: 100
    },
    {
      title: 'duration',
      dataIndex: 'duration',
      width: 100
    },
    {
      title: 'price',
      dataIndex: 'price',
      width: 100
    },
    {
      title: 'salesPersonNumber',
      dataIndex: 'salesPersonNumber',
      width: 100
    },
  ]

  const components = {
    header: {
      cell: ResizeableTitle
    }
  };

function Plan() {
 const [savePlans, setSavePlans] = useState([])

 useEffect(async() => {
  const response = await plans()
    setSavePlans(response.data)
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
          dataSource={savePlans}
        />
      </>
    );
}

export default Plan;
