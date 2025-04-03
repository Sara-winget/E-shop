import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import server from '../server';
const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    let totalPrice=0
    const { addressId, userEmail,products } = location.state || {};
    console.log(addressId,userEmail,products)

    const [confirmOrder, setConfirmOrder] = useState(false);
products.map(p=>totalPrice+=p.price)
console.log(totalPrice)
    const handleOrder =async () => {
        // const {res}=await axios.post(`${server}`)
        alert('Order confirmed successfully! Check your email for further details.');
      const {data}= await axios.put(`${server}/product/clear-cart`,{email:userEmail})  
  console.log(data)
        setConfirmOrder(false);
        
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
                <h1 className="text-2xl font-semibold mb-4">Select Payment Method</h1>
                
                {confirmOrder ? (
                    <div className="mt-4">
                        <p className="text-gray-700 mb-4">Click the button to confirm your order:</p>
                        <button 
                            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 w-full mb-2"
                            onClick={handleOrder}
                        >
                            Confirm Order
                        </button>
                        <p className="text-gray-700 mb-4">Or cancel the order:</p>
                        <button 
                            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 w-full"
                            onClick={() => { alert('Order has been canceled successfully'); setConfirmOrder(false); }}
                        >
                            Cancel Order
                        </button>
                    </div>
                ) : (
                    <div>
                        <p className="text-gray-700 mb-4">Choose a payment method:</p>
                        <button className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 w-full mb-4">
                            Online Payment
                        </button>
                        <button 
                            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 w-full"
                            onClick={() => setConfirmOrder(true)}
                        >
                            Cash on Delivery
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderConfirmation;
