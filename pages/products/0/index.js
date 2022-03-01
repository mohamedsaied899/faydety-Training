import { Form, Alert, Input, Button } from 'antd';
import { createProduct } from '../../../apis/productsApis';
import Router from 'next/router';
import { useState } from 'react';

const FormItem = Form.Item;

function addProduct(props) {
  const [backendErrors, setBackendErrors] = useState([])

 const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async(err, values) => {
      if (!err) {
            let body = {
                nameEn:values.nameEn, 
                nameAr:values.nameAr
            }
          let result = await createProduct(body)
          if(result.errors){
            setBackendErrors([...result.errors])
          }else{
            Router.push('/products');
          }
      }
    });
  };

const { getFieldDecorator } = props.form;
return (
  <Form onSubmit={handleSubmit}>
    {backendErrors.map(err => {
      return(
        <Alert 
          message="Error"
          description={err}
          type="error"
          className="mb-3"
          showIcon
        />
      )
    })}
    <FormItem label="NameEn" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
      {getFieldDecorator('nameEn', {
        rules: [{ required: true, message: 'Please input your Name!' }]
      })(<Input />)}
    </FormItem>
    <FormItem label="NameAr" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
      {getFieldDecorator('nameAr', {
        rules: [{ required: true, message: 'Please input your Name!' }]
      })(<Input />)}
    </FormItem>
    <FormItem wrapperCol={{ span: 12, offset: 4 }}>
      <Button type="primary" htmlType="submit">
        Create
      </Button>
    </FormItem>
  </Form>
);
}

export default Form.create()(addProduct);
