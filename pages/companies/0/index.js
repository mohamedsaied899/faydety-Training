import { Form, Alert, Select, Input, Button, Icon ,Upload } from 'antd';
import { createCompanies } from '../../../apis/companyApis';
import Router from 'next/router';
import { useState,useEffect } from 'react';
import { plans } from '../../../apis/lookupsApis';

const FormItem = Form.Item;
const Option = Select.Option;

const onFileUpload = (values) => {
  console.log('jjjjjjjjjj', values)
    let formData = new FormData();
    const companyAdmin = {
      firstName:values.firstName,
      lastName:values.lastName,
      phone:values.phone,
      email:values.email,
    }
    formData.append('companyAdmin',JSON.stringify(companyAdmin))
    formData.append('nameEn', values.nameEn)
    formData.append('nameAr', values.nameAr)
    formData.append('planId', values.planId)
    formData.append('logo', values.logo[0].originFileObj)
    return formData
}

function addCompany(props) {
 const [backendErrors, setBackendErrors] = useState([])
 const [savePlans, setSavePlans] = useState([])

 useEffect(async() => {
   const data = await plans()
   setSavePlans(data)
  },[])

 const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async(err, values) => {     
  if (!err) {
     let result = await createCompanies(onFileUpload(values)) 
      if(result.errors){
      setBackendErrors([...result.errors])
      }else{
        Router.push('/companies');
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
  <Form encType='multipart/form-data' onSubmit={handleSubmit}>
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
    <FormItem label="planId" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
    {getFieldDecorator('planId', {
        rules: [{ required: true, message: 'Please input your planId!' }]
    })(
      <Select>
        {savePlans.map(plan=> {
            return(
            <Option value={plan.id}>{plan.name}</Option>
            // <Option value={plan.id} name={plan.name} />
            )
        })}
    </Select>
    )}
    </FormItem>

    <FormItem label="logo" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
      {getFieldDecorator('logo', {   
        valuePropName: 'fileList',
        getValueFromEvent: e => {
          console.log('Upload event:', e);
          if (Array.isArray(e)) {
            return e;
          }
          return e && e.fileList;
        }
        })(
        <Upload name="logo" listType="picture">
          <Button>
            <Icon type="upload" /> Click to upload
          </Button>
        </Upload>
        )}
    </FormItem>

    <FormItem label="firstName" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
    {getFieldDecorator('firstName', {
        rules: [{ required: true, message: 'Please input your Name!' }]
    })(<Input />)}
    </FormItem>
    <FormItem label="lastName" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
    {getFieldDecorator('lastName', {
        rules: [{ required: true, message: 'Please input your Name!' }]
    })(<Input />)}
    </FormItem>
    <FormItem label="phone" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
    {getFieldDecorator('phone', {
        rules: [{ required: true, message: 'Please input your Phone!' }]
    })(<Input />)}
    </FormItem>
    <FormItem label="email" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
    {getFieldDecorator('email', {
        rules: [{ required: true, message: 'Please input your Email!' }]
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

export default  Form.create()(addCompany) 