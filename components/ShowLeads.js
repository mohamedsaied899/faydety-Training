import { Table, Button, Icon } from 'antd';
import { Resizable } from 'react-resizable';
import React, { useEffect, useState } from 'react';
import { getFilterLeads } from '../apis/filterLeadsApis';
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

const redirectToFilterPage = () => {
  Router.push('/leadhistories')
}

const tableColumns = [
  {
    title: 'id',
    dataIndex: 'id',
    width: 70
  },
  {
    title: 'fullName',
    dataIndex: 'fullName',
    width: 70
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: 70
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    width: 70
  },
  {
    title: 'Company',
    dataIndex: 'company',
    width: 70
  },
  {
    title: 'Product',
    dataIndex: 'product',
    width: 70
  },
  {
    title: 'Source',
    dataIndex: 'source',
    width: 70
  },
  {
    title: 'Sales Person',
    dataIndex: 'salesPerson',
    width: 100
  },
  {
    title: 'CreatedAt',
    dataIndex: 'createdAt',
    width: 100
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    render: (text, record) => {
      return (
        <div>
          <Button onClick={() => showLeadHistories(record.id)}>
            <Icon type="arrow-right" />
          </Button>
        </div>
      );
    }
  }
]

const components = {
  header: {
    cell: ResizeableTitle
  }
};

function showLeadHistories(id){
  Router.push(`/leadHistories/${id}`)
}

function showLeads() {
  const [saveLeads, setSaveLeads] = useState([])

  useEffect(async () => {
    const response = await getFilterLeads()
    setSaveLeads(response)
  }, [])

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
      <Button onClick={redirectToFilterPage} type="primary" htmlType="submit" className="mb-3">Redirect to Histories</Button>
    </>
  );
}

export default showLeads;