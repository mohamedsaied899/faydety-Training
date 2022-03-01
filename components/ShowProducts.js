import { Button, Table, Icon } from 'antd';
import { Resizable } from 'react-resizable';
import React, {useEffect, useState} from 'react';
import { getProducts } from '../apis/productsApis';
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
  Router.push('/products/0')
}

const tableColumns = [
    {   
      title: 'id',
      dataIndex: 'id',
      width: 100
    },
    {   
      title: 'Product NameAr',
      dataIndex: 'nameAr',
      width: 100
    },
    {   
      title: 'Product NameEn',
      dataIndex: 'nameEn',
      width: 100
    },
  ]

  const components = {
    header: {
      cell: ResizeableTitle
    }
  };

function showProducts() {
 const [saveProducts, setSaveProducts] = useState([])

 useEffect(async() => {
  console.log('hvasdhvahjsdvjahsjdasdasd')
  const response = await getProducts()
  console.log('sssss:  ',response)
  setSaveProducts(response.data)
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
          dataSource={saveProducts}
        />
      </>
    );
}

export default showProducts;
