import { Button, Table, Icon } from 'antd';
import { Resizable } from 'react-resizable';
import React, {useEffect, useState} from 'react';
import { getCompanies } from '../apis/companyApis';
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
  Router.push('/companies/0')
}

const tableColumns = [
    {   
        title: 'id',
        dataIndex: 'id',
        width: 100
    },
      {
        title: 'companyNameAr',
        dataIndex: 'nameAr',
        width: 100 
      },
      {
        title: 'companyNameEn',
        dataIndex: 'nameEn',
        width: 100 
      },
      {
        title: 'Admin Name',
        width: 100,
        dataIndex: 'companyAdminName' 
      },
      {
        title: 'ExpirationDate',
        width: 100,
        dataIndex: 'expirationDate' 
      },
      {
        title: 'Name',
        width: 100,
        render: data=>data.plan.name,
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          return (
            <div>
              <Button onClick={()=>redirectToEditPage(record.id)}>
                <Icon type="edit" />
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

function showCompanies() {
 const [saveCompanies, setSaveCompanies] = useState([])

 useEffect(async() => {
    const response = await getCompanies()
    setSaveCompanies(response)
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
          dataSource={saveCompanies}
        />
      </>
    );
}

export default showCompanies;
