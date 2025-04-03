import React from 'react'
import { useState , useEffect} from 'react'
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import {Link} from 'react-router-dom'
import axios from 'axios'
import server from '../../server'

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function Signup() {
  const[name,setName]= useState('')
  const[email,setEmail]= useState('')
  const [password,setPassword] = useState('')
  const [visible,setVisible]=useState(false)
  const[avatar,setAvatar]=useState('')
  const[msg,setMsg]=useState('')
  const[error,setError]=useState(false)

  useEffect(() => {
    return () => {
      toast.dismiss();  // ✅ Clears all toasts on unmount
    };
  }, []);
  

   const handleInput=(e)=>{
    const file = e.target.files[0]
    setAvatar(file)
   } 

  const handleSubmit=(e)=>{
    e.preventDefault()
   
     
    const config = {headers:{"Content-type":"multipart/form-data"}}
const newForm = new FormData()
newForm.append("file",avatar)
newForm.append("name",name)
newForm.append("email",email)
newForm.append("password",password)

axios.post(`${server}/create-user`,newForm,config).then((res)=>{
  console.log(res)
  toast.success(res.data.message)
  setEmail('')
  setName('')
  setPassword('')
  setAvatar('')
  //setMsg(res.data.message)  
}).catch((err)=>{
  console.log(err)
  toast.error(err.response.data.message
  
    )
  //setMsg(err.response.data.message)
  setError(true)
})
  }
  return (
    <div className='flex flex-col box-border h-screen justify-center items-center bg-gray-100'>
     
      <div className='flex flex-col w-109 h-109   rounded-xl shadow-xl shawdow-black-600 bg-sky-100'>
        <div>
        <h1 className='text-center mt-5 text-2xl font-bold'>Create Account</h1>
        </div>
        <div className='flex justify-center items-center mt-5'>
           <form className='flex flex-col justify-center items-center w-98 ' onSubmit={handleSubmit}>
            <div className='flex w-full h-8 mt-5 rounded-lg shadow-lg justify-center items-center bg-slate-200'>
              <input placeholder='user name' name='name' type='text' required value={name} onChange={(e)=>setName(e.target.value)}className='w-full focus:outline-none ml-5 text-xl'/>
              <FaUser className='mr-5 h-8 w-8'/>
            </div>
            <div className='flex w-full h-8 mt-5 rounded-lg shadow-lg justify-center items-center  bg-slate-200'>
              <input placeholder='email' type='text' name='email' required value={email} onChange={(e)=>setEmail(e.target.value)}className='w-full focus:outline-none ml-5 text-xl'/>
              <MdEmail className='mr-5 h-8 w-8'/>
            </div>
            <div  className='flex w-full h-8 mt-5 rounded-lg shadow-lg justify-center items-center  bg-slate-200'>
              <input type={visible?"text":"password"} name='password' placeholder='password' minLength={8} required value={password} onChange={(e)=>setPassword(e.target.value)} className='w-full focus:outline-none ml-5 text-xl '/>
           {visible? (<IoEye onClick={()=>setVisible(false)} className='mr-5 h-8 w-8'/>): (<IoEyeOffOutline onClick={()=>setVisible(true)} className='mr-5 h-8 w-8'/>)}
            </div>
               <div className='flex flex-col w-full h-15 mt-5 rounded-lg shadow-lg justify-center items-center  bg-slate-200'>
               <label>set your profile pic</label>
                <input name='avatar' type='file' accept='.jpg, .png, .jpeg' onChange={handleInput} className='bg-amber-200'/>
               </div>
             <button className='mt-5 w-full bg-blue-300 p-2 rounded-lg shadow-lg' type='submit'>submit</button>
             <div className='mt-1 flex '>
                <p className='text-sm'>already have account</p>
                <Link className='text-sm ml-2 text-blue-500' to='/login'>login</Link>

             </div>
           </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
