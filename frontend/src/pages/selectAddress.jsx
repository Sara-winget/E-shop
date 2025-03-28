// SelectAddress.jsx
import React, { useState, useEffect } from 'react';
import Nav from '../components/nav'; // Ensure the path is correct and component name matches
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const SelectAddress = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

  
    const userEmail = 'sankamithra1614@gmail.com'; 

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const data = await axios.get(`http://localhost:5000/api/user/addresses?email=${userEmail}`);
console.log("whole response",data)
console.log("taking the correct data", data.data)
console.log("taking address from data", data.data.addresses )   
              
                    setAddresses(data.data.addresses);
                
            } catch (err) {
                console.error('Error fetching addresses:', err);
                setError(err.message || 'An unexpected error occurred.');
            } finally {
                setLoading(false);
            }
        };

        fetchAddresses();
    }, [userEmail]);

   
        // Optionally, pass the entire address object instead of just the ID
        //navigate('/order-confirmation', { state: { addressId, userEmail:'sankamithra1614@gmail.com' } });
        const handleSelectAddress = (addressId) => {
            console.log("Navigating with:", addressId, userEmail);
            navigate('/order-confirmation', { state: { addressId, userEmail } });
        };
        
        //navigate('/order-confirmation', { state: { addressId, userEmail} });
    

    // Render loading state
    if (loading) {
        return (
            <div className='w-full h-screen flex justify-center items-center'>
                <p className='text-lg'>Loading addresses...</p>
            </div>
        );
    }

    // Render error state
    if (error) {
        return (
            <div className='w-full h-screen flex flex-col justify-center items-center'>
                <p className='text-red-500 text-lg mb-4'>Error: {error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className='w-full min-h-screen flex flex-col'>
            <Nav />
            <div className='flex-grow flex justify-center items-center p-4'>
                <div className='w-full max-w-4xl border border-neutral-300 rounded-md flex flex-col p-6 bg-white shadow-md'>
                    <h2 className='text-2xl font-semibold mb-6 text-center'>Select Shipping Address</h2>
                    {addresses.length > 0 ? (
                        <div className='space-y-4 overflow-auto max-h-96'>
                            {addresses.map((address) => (
                                <div
                                    key={address._id}
                                    className='border p-4 rounded-md flex justify-between items-center hover:shadow-md transition-shadow'
                                >
                                    <div>
                                        <p className='font-medium'>
                                            {address.address1},
                                        </p>
                                            <p>{address.address2}</p> 
                                            <p>{address.city}, {address.state}, {address.zipCode}</p>
                                        <p className='text-sm text-gray-600'>{address.country}</p>
                                        <p className='text-sm text-gray-500'>Type: {address.addressType || 'N/A'}</p>
                                    </div>
                                    <button
                                        onClick={() => handleSelectAddress(address._id)}
                                        className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400'
                                    >
                                        Select
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className='text-center text-gray-700'>No addresses found. Please add an address.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SelectAddress;