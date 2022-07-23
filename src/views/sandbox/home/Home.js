/*
 * @Author: yanzhourong
 * @Date: 2022-07-18 07:27:21
 * @LastEditTime: 2022-07-23 09:13:17
 * @Description: 
 */
import React from 'react'
import { Button } from 'antd'
import axios from 'axios'

export default function Home() {
  const ajax = () => {
    // 取数据 get
    // axios.get("http://localhost:8000/posts").then(res => {
    //   console.log(res.data)
    // })
    // 增 post
    // axios.post("http://localhost:8000/posts", {
    //   title: "33333",
    //   author: "xiaoming"
    // })
    // 更新 put 替换式
    // axios.put("http://localhost:8000/posts/1",{
    //   title: "11111-修改"
    // })
    // 更新 patch
    // axios.patch("http://localhost:8000/posts/1",{
    //   title: "11111-修改"
    // })
    // 删除 delete
    // axios.delete("http://localhost:8000/posts/1")
    // _embed 向下关联
    // axios.get("http://localhost:8000/posts?_embed=comments").then(res => {
    //   console.log(res)
    // })
    // _expand 向下关联
    axios.get("http://localhost:8000/comments?_expand=post").then(res => {
      console.log(res)
    })
  }
  return (
    <div>
      <Button onClick={ajax}>点击按钮</Button>
    </div>
  )
}
