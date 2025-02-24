import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Product from '../components/product';
import server from '../server';

function MyProduct() {
    const [product, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const email = "sankamithra1614@gmail.com";

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get(`${server}/product/my-products?email=${email}`);
                console.log(data);
                setProducts(data.products);
                setLoading(false);
            } catch (e) {
                setError(e.message);
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
            <h1>My Products</h1>
            <div>
                {product.map((item, ind) => (
                    <Product key={ind} {...item} />
                ))}
            </div>
        </div>
    );
}

export default MyProduct;
