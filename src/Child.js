/*
 * @Author: yanzhourong
 * @Date: 2022-06-27 22:09:34
 * @LastEditTime: 2022-06-27 22:28:45
 * @Description: 
 */
import React from 'react'
import style from './Child.module.css'

export default function Child() {
  return (
    <div>
      <ul>
        <li className={style.item}>Child-111</li>
        <li className={style.item}>Child-222</li>
      </ul>
    </div>
  )
}
