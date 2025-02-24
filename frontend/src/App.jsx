import { useEffect, useState } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { LoginPage,SignupPage,ActivationPage,HomePage,CreateProduct,MyProduct } from './routes/Routes' 
import { Bounce } from "react-awesome-reveal";
import server from './server';
import axios from 'axios';

function App() {
    const [count, setCount] = useState(0);

useEffect(()=>{
axios.get(`${server}/user/getuser`,{withCredentials:true})
.then(res=>{console.log(res.data)
    toast.success(res.data.message)
})
.catch(err=>toast.error(err.response.data.message))
},[])

    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/activation/:Activation_Token" element={<ActivationPage />} /> 
                 <Route path="/productCreate" element={<CreateProduct/>}/>
                 
            </Routes>
 
        </>
    );
}

export default App;
