import { Button, Checkbox, Form, Input, Alert, Row } from 'antd';
import { Eye, Mail } from 'react-feather';
import { login } from '../apis/authApis';
import { setItem } from '../services/local-storage.service'
import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';
import { useState } from 'react';

const FormItem = Form.Item;

const Content = styled.div`
  max-width: 400px;
  z-index: 2;
  min-width: 300px;
`;

const Signin = ({ form }) => {
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
          form.validateFields(async(err, values) => {
            if (!err) {
              const { errors, status } = await login(values.email,values.password)
              if(status){
                setItem('email', values.email)
                Router.push('/otp');
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
        <FormItem label="Email">
          {form.getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              },
              {
                required: true,
                message: 'Please input your E-mail!'
              }
            ]
          })(
            <Input
              prefix={
                <Mail
                  size={16}
                  strokeWidth={1}
                  style={{ color: 'rgba(0,0,0,.25)' }}
                />
              }
              type="email"
              placeholder="Email"
            />
          )}
        </FormItem>

        <FormItem label="Password">
          {form.getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={
                <Eye
                  size={16}
                  strokeWidth={1}
                  style={{ color: 'rgba(0,0,0,.25)' }}
                />
              }
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>

        <FormItem>
          {form.getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <Link href="/forgot">
            <a className="text-xs-right">
              <small>Forgot password</small>
            </a>
          </Link>
          <Button type="primary" htmlType="submit" block className="mt-3">
            Log in
          </Button>
        </FormItem>
      </Form>
    </Content>
  </Row>
  )
};

export default Form.create()(Signin);