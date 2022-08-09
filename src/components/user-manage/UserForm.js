/*
 * @Author: yanzhourong
 * @Date: 2022-08-04 23:29:56
 * @LastEditTime: 2022-08-09 23:37:36
 * @Description: 
 */
import React, { forwardRef, useEffect, useState } from 'react'
import { Select, Form, Input } from 'antd';
const { Option } = Select;

const UserForm = forwardRef((props, ref) => {
  const { regionList, roleList } = props
  const [isDisable, setIsDisable] = useState(false)
  
  useEffect(() => {
    setIsDisable(props.isUpdateDisabled)
  },[props.isUpdateDisabled])

  const { roleId, region, username } = JSON.parse(localStorage.getItem("token"))
  const roleObj = {
    "1":"superadmin",
    "2":"admin",
    "3":"editor",
  }

  const checkRegionDisabled = (item) => {
    if(props.isUpdate){
      if(roleObj[roleId]==="superadmin"){
        return false
      }else{
        return true
      }
    }else{
      if(roleObj[roleId]==="superadmin"){
        return false
      }else{
        return item.value!==region
      }
    }
  }
  const checkRoleDisabled = (item) => {
    if(props.isUpdate){
      if(roleObj[roleId]==="superadmin"){
        return false
      }else{
        return true
      }
    }else{
      if(roleObj[roleId]==="superadmin"){
        return false
      }else{
        return roleObj[item.id]!=="editor"
      }
    }
  }
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
                   <Option value={item.value} disabled={checkRegionDisabled(item)} key={item.id}>{item.title}</Option>
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
                   <Option value={item.value} disabled={checkRoleDisabled(item)} key={item.id}>{item.roleName}</Option>
                )
              }
            </Select>
          </Form.Item>
        </Form>
  )
})
export default UserForm