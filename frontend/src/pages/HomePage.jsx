import React, { useEffect, useState } from 'react'
import Product from '../components/Product'
import axios from 'axios';
import server from '../server';
import Nav from '../components/nav';
function HomePage() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${server}/product/get-products`);
        console.log(data)
        setProducts(data.products);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product', err);
        setError(err.message);
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  
  if (loading) {
    return <div className="text-center text-white mt-10">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }

  return (
    <div>
      <div>
        <Nav/>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((item,index)=>(
          <Product key={index} {...item}/>
        ))}
      </div>
    </div>
  )
}

export default HomePage

