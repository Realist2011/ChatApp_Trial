import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckbox'
import { Link } from 'react-router-dom'
import useSignUp from '../../hooks/useSignUp'


const Signup = () => {
    const [input,setInput] = useState({
        fullName:"",
        username:"",
        password:"",
        confirmPassword:"",
        gender:""
    })
    const {loading,signup} = useSignUp()
    const handleCheckBoxChange=(gender)=>{
        setInput({...input,gender})
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        console.log(input)
        await signup(input)
    }

    
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      
       <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className=' text-white text-3xl font-semibold text-center'>Sign Up
                <span className='text-blue-500'>ChatApp</span>
            </h1>
            <form onSubmit={handleSubmit}>
                <div>
                <label className='label p-2'>
                    <span className=' text-white text-base label-text'>Full Name</span>
                    </label>
                    <input type='text' placeholder='Enter full name' value={input.fullName} onChange={(e)=>setInput({...input,fullName:e.target.value})} className='w-full input input-bordered h-10'  />
                </div>
                <div>
                <label className='label p-2'>
                    <span className=' text-white text-base label-text'>Username</span>
                    </label>
                    <input type='text' placeholder='Enter username'  value ={input.username} onChange={(e)=>setInput({...input,username:e.target.value})} className='w-full input input-bordered h-10'  />
                </div>
                <div>
                <label className='label p-2'>
                    <span className=' text-white text-base label-text'>Password</span>
                    </label>
                    <input type='password' placeholder='Enter password'value={input.password} onChange={(e)=>setInput({...input,password:e.target.value})} className='w-full input input-bordered h-10'  />
                </div>
                <div>
                <label className='label p-2'>
                    <span className=' text-white text-base label-text'>Confirm Password</span>
                    </label>
                    <input type='text' value={input.confirmPassword} onChange={(e)=>setInput({...input,confirmPassword:e.target.value})} placeholder='Confirm Password' className='w-full input input-bordered h-10'  />
                </div>
                <GenderCheckbox onCheckBoxChange={handleCheckBoxChange} selectedGender={input.gender}/>
                <Link to='/login' className='text-sm  text-white hover:underline hover:text-blue-600 mt-2 inline-block'>Already have an account?</Link>
                <div>
                <button  disabled={loading}className=' bg-blend-hard-light btn btn-block btn-sm mt-2'>{
                    loading ?<span className='loading loading-spinner'></span>:"Sign Up"}</button> 
                </div>

                {/*GENDER CHECKBOX GOES HERE */}
            </form>

       </div>
    </div>
    
  )}


export default Signup