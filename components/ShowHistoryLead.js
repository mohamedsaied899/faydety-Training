import { Table } from 'antd';
import { Resizable } from 'react-resizable';
import React, {useEffect, useState} from 'react';
import { getHistoryLead } from '../apis/leadHistoriesApis';

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
        width: 70
    },
      {
        title: 'Name',
        width: 70,
        render: data=>data.lead.name,
      },
      {
        title: 'Status',
        width: 70,
        render: data=>data.status.status,
      },
      {
        title: 'Comment',
        dataIndex: 'comment',
        width: 70 
      },
      {
        title: 'CallDuration',
        dataIndex: 'callDuration',
        width: 70 
      },
      {
        title: 'CallStartDate',
        dataIndex: 'callStartDate',
        width: 70 
      },
      {
        title: 'callEndDate',
        dataIndex: 'callEndDate',
        width: 70 
      },
  ]

  const components = {
    header: {
      cell: ResizeableTitle
    }
  };

function showHistoryLeads() {
 const [saveHistory, setSaveHistory] = useState([])

 useEffect(async() => {
  const response = await getHistoryLead()
  console.log(response);
  setSaveHistory(response)
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
          dataSource={saveHistory}
        />
      </>
    );
}

export default showHistoryLeads;
