import { Form, Alert, Input, Button, InputNumber } from 'antd';
import { createPlan } from '../../../apis/plansApis';
import Router from 'next/router';
import { useState } from 'react';

const { TextArea } = Input;
const FormItem = Form.Item;

function addPlan(props) {
  const [backendErrors, setBackendErrors] = useState([])

  const handleSubmit = e => {
    e.preventDefault();
     props.form.validateFields(async(err, values) => {
      if (!err) {
            let body = {
                nameEn:values.nameEn, 
                nameAr:values.nameAr,
                descriptionEn: values.descriptionEn,
                descriptionAr: values.descriptionAr,
                salesPersonNumber: values.salesPersonNumber, 
                duration: values.duration,
                price: values.price
            }
            if(values.descriptionEn) {
                body.descriptionEn =  values.descriptionEn
            }
            if(values.descriptionAr){
                body.descriptionAr = values.descriptionAr
            }
          let result = await createPlan(body)
          if(result.errors){
            setBackendErrors([...result.errors])
          }else{
             Router.push('/plans');
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
    <FormItem label="DescriptionEn" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
      {getFieldDecorator('descriptionEn', {
        rules: [{ required: false}]
      })(<TextArea />)}
    </FormItem>
    <FormItem label="DescriptionAr" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
      {getFieldDecorator('descriptionAr', {
        rules: [{ required: false}]
      })(<TextArea />)}
    </FormItem>
    <FormItem label="Sales Person Number" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
      {getFieldDecorator('salesPersonNumber', {
        rules: [{ required: true, message: 'Please input your sales person number!' }]
    })(<InputNumber  style={{ width: 250 }} />)}
    </FormItem>
    <FormItem label="Duration" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
      {getFieldDecorator('duration', {
        rules: [{ required: true, message: 'Please input the Duration!' }]
    })(<InputNumber  style={{ width: 250 }} />)}
    </FormItem>
    <FormItem label="Price" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
      {getFieldDecorator('price', {
        rules: [{ required: true, message: 'Please input the Price!' }]
      })(<InputNumber  style={{ width: 250 }} />)}
    </FormItem>
    <FormItem wrapperCol={{ span: 12, offset: 4 }}>
      <Button type="primary" htmlType="submit">
        Create
      </Button>
    </FormItem>
  </Form>
);
}

export default Form.create()(addPlan);