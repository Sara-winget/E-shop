import CartProduct from '../components/CartProduct'
import Nav from '../components/nav';
import { useState, useEffect } from 'react';
import axios from "axios";

const Cart = () => {

    const [products, setProducts] = useState([]);


    useEffect(() => {
      axios
        .get(`http://localhost:5000/api/product/cartProduct?email=${'sankamithra1614@gmail.com'}`)
        .then((res) => {
            console.log("Products fetched:", res);
          setProducts(res.data.cart.map(product => ({ quantity: product['quantity'], ...product['productId'] })));
          console.log("Products:", products);
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
        });
    }, []);
        

    return (
        <div className='w-full h-screen'>
            <Nav />
            <div className='w-full h-full justify-center items-center flex'>
                <div className='w-full md:w-4/5 lg:w-4/6 2xl:w-2/3 h-full border-l border-r border-neutral-300 flex flex-col'>
                    <div className='w-full h-16  flex items-center justify-center'>
                        <h1 className='text-2xl font-semibold'>Cart</h1>
                    </div>
                    <div className='w-full flex-grow overflow-auto px-3 py-2 gap-y-2'>
                        {
                            products.map(product => (
                                <CartProduct key={product._id} {...product} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Cart;