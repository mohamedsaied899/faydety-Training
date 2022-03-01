import { Form, Alert, Input, Button } from 'antd';
import { createStatus } from '../../../apis/statusesApis';
import Router from 'next/router';
import { useState,useEffect } from 'react';

const FormItem = Form.Item;

function addStatus(props) {
// state to handle error
 const [backendErrors, setBackendErrors] = useState([])

 useEffect(async() => {
    console.log(backendErrors)
  },[])

 const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async(err, values) => {
      if (!err) {
        let body = {
            nameEn:values.nameEn, 
            nameAr:values.nameAr
        }
        let result = await createStatus(body)
        if(result.errors){
        setBackendErrors([...result.errors])
        }else {
          Router.push('/statuses');
        }
      }
    });
  };
 const {getFieldDecorator}  = props.form;
return (
  <>
    {backendErrors.map(err=> {
      return(
        <Alert
          message="Error"
          description={err}
          type="error"
          className="mb-3"
          showIcon
        />
      )
      }
    )}
      <Form onSubmit={handleSubmit}>
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
  </>
);
}

export default Form.create()(addStatus) 