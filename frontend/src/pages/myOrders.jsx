import React, { useEffect } from 'react'
import server from '../server'
import axios from 'axios'
function MyOrders() {
    const email = 'sankamithra1614@gmail.com'
    useEffect(()=>{
const orders = async()=>{
    try{
        const {data}= await axios.get(`${server}/myOrder?email=${email}`)
        console.log(data)
    }
    catch(e){
        console.log(e)
    }}
orders()
    },[])
  return (
    <div>
      my order
    </div>
  )
}

export default MyOrders
