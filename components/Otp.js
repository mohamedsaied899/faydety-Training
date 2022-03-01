import { Button, Form, Input, Alert, Row } from 'antd';
import { Eye } from 'react-feather';
import Router from 'next/router';
import styled from 'styled-components';
import { verifyOtp } from '../apis/authApis';
import { getItem, setItem } from '../services/local-storage.service';
import { useState } from 'react';

const FormItem = Form.Item;

const Content = styled.div`
  max-width: 400px;
  z-index: 2;
  min-width: 300px;
`;

const Otp = ({ form }) => {
  const [backendErrors, setBackendErrors] = useState([])
  return(
  <Row
    type="flex"
    align="middle"
    justify="center"
    className="px-3 bg-white mh-page"
    style={{ minHeight: '100vh' }}
   >
    <Content>
      <Form
        layout="vertical"
        onSubmit={ e => {
          e.preventDefault();
          form.validateFields(async (err, values) => {
            if (!err) {
              const { result, errors, status } = await verifyOtp(getItem('email'),values.otp)
              if(status){
                setItem('token', result.data.data.token)
                setItem('userData', JSON.stringify(result.data.data.userData))
                Router.push('/');  
              }else{
                // handle errors
                setBackendErrors(errors)
              }     
              }
          });
        }}
      >
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
        <FormItem label="Otp">
          {form.getFieldDecorator('otp', {
            rules: [{ required: true, message: 'Please input the Otp!' }]
          })(
            <Input
              prefix={
                <Eye
                  size={16}
                  strokeWidth={1}
                  style={{ color: 'rgba(0,0,0,.25)' }}
                />
              }
              type="text"
              placeholder="Otp"
            />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" block className="mt-3">
            Send
          </Button>
        </FormItem>
      </Form>
    </Content>
  </Row>
  )
}

export default Form.create()(Otp);
