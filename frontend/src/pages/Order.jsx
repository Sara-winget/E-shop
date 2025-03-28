// OrderConfirmation.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../components/nav';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { addressId, userEmail } = location.state ;
console.log(addressId)
console.log(userEmail)
                 const[conform,setConform]    =useState(false)
                 
const handleOrder =async()=>{
    alert('order conformed successfully... check your mail for futher information')
    setConform(false)
}
                 
                 return(
                     <>
<div>
    <h1>Select Payment method</h1>
    { conform && <div><h6>click the button to conform</h6><button className='bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600' onClick={handleOrder}>conform</button>
    <h6>click the button for cancel</h6><button className='bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600' onClick={()=>{alert('order has been canceled successfully'); setConform(false)}}>cancel</button>
    </div>} 
    <div >
    online payment select button <button className='bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600'>Online mode</button>
    </div>
    <div>
        Cash on delivary click below
       <button className='bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600' onClick={()=>setConform(true)}>Cash On delivary</button>
    </div>

</div>

</>


)
}

export default OrderConfirmation