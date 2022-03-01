import { Button, Table, Icon } from 'antd';
import { Resizable } from 'react-resizable';
import React, {useEffect, useState} from 'react';
import { getSources } from '../apis/sourcesApis';
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
  Router.push('/sources/0')
}

const tableColumns = [
    {   
      title: 'id',
      dataIndex: 'id',
      width: 100
    },
    {   
      title: 'Sources NameAr',
      dataIndex: 'nameAr',
      width: 100
    },
    {   
      title: 'Sources NameEn',
      dataIndex: 'nameEn',
      width: 100
    },
  ]

  const components = {
    header: {
      cell: ResizeableTitle
    }
  };

function showSources() {
 const [saveSources, setSaveSources] = useState([])

 useEffect(async() => {
  console.log('hvasdhvahjsdvjahsjdasdasd')
  const response = await getSources()
  console.log('sssss:  ',response)
  setSaveSources(response.data)
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
          dataSource={saveSources}
        />
      </>
    );
}

export default showSources;
