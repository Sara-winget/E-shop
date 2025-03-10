import React, { useEffect, useState } from 'react'
import axios from 'axios'
import server from '../server'
import Product from '../components/Product'
import {useNavigate} from 'react-router-dom'


const MyProduct = () => {
  
const[product,setProduct]=  useState([])
const [error,setError]=useState('')
const navigate=useNavigate()
const email = `sankamithra1614@gmail.com`

const handleDelete = async(id)=>{
await axios.delete(`${server}/product//delete-product/${id}`)
}
useEffect(()=>{
    const prd = async()=>{
        try{
        const { data } = await axios.get(`${server}/product/my-products?email=${email}`);//data
         console.log(data)
         setProduct(data.products)
         
        }
        catch(e){
            console.log(e.message)
            setError(e.message)
        }
        
    }
    prd()
},[])

    if (error) {
        return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
      }

  return (
    <div>
      <h1>my Products</h1>
      <div className='flex gap-2.5'>
      {product.map((item,ind) => (
        <div className='flex flex-col' key={item._id}>
      
    <Product  {...item} /> 
    <button  onClick={()=>navigate('/productCreate',{state: {id:item._id}})}>edit product</button>
    <button onClick={()=>handleDelete(item._id)}>delete product</button>
        </div>
    
))}


      </div>
      <button onClick={()=>navigate('/productCreate')}>create product</button>
    </div>
  )
}

export default MyProduct
