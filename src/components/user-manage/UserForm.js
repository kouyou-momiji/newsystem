/*
 * @Author: yanzhourong
 * @Date: 2022-08-04 23:29:56
 * @LastEditTime: 2022-08-04 23:56:41
 * @Description: 
 */
import React, { forwardRef, useState } from 'react'
import { Select, Form, Input } from 'antd';
const { Option } = Select;

const UserForm = forwardRef((props, ref) => {
  const { regionList, roleList } = props
  const [isDisable, setIsDisable] = useState(false)
  return (
    <Form
          ref={ref}
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: 'Please input the title of collection!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: 'Please input the title of collection!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="region"
            label="区域"
            rules={ isDisable ? [] : [{ required: true, message: 'Please input the title of collection!' }]}
          >
            <Select disabled={isDisable}>
              {
                regionList.map(item => 
                   <Option value={item.value} key={item.id}>{item.title}</Option>
                )
              }
            </Select>
          </Form.Item>
          <Form.Item
            name="roleId"
            label="角色"
            rules={[{ required: true, message: 'Please input the title of collection!' }]}
          >
            <Select onChange={(value) => {
              if(+value === 1){
                setIsDisable(true)
                ref.current.setFieldsValue({
                  region: ""
                })
              }else{
                setIsDisable(false)
              }
            }}>
              {
                roleList.map(item => 
                   <Option value={item.value} key={item.id}>{item.roleName}</Option>
                )
              }
            </Select>
          </Form.Item>
        </Form>
  )
})
export default UserForm