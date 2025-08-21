import React, { useState } from 'react'
import { Button } from 'antd';
import { auth } from './Firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";


const initialState = {
    username: "",
    email: '',
    password: ''
}
// import Button from 'antd'

const myRegister = () => {
    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleSubmit = () => {
        e.preventDefualt()

        const { username, email, password } = state
        const userData = {
            username,
            email,
            password
        }

        setIsProcessing(true)

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('user', user)
                createDocument({ ...userData, uid: user.uid })
                console.log('User registered successfully', user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log('errorCode', errorCode)
                const errorMessage = error.message;
                console.log('errorMessage', errorMessage)
            });
        setTimeout(() => {
            setIsProcessing(false)
            alert('Registration Successful')
            setState(initialState) // reset after success
        }, 2000)

        const createDocument = (userData) => {
            console.log('userData', userData)

        }

    }
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    return (
        <div className='bg-gray-50 min-h-screen flex flex-col items-center  rounded shadow-md '>
            <form className=' border-1  p-6 rounded shadow-md w-96 mt-32 ' onSubmit={handleSubmit}>

                <h3 className="mt-4 text-2xl text-center font-bold ">Register</h3>

                <label htmlFor="username">User Name :</label>
                <input
                    type="text" onChange={handleChange}
                    id='username'
                    name="username"
                    value={state.username}
                    required
                    placeholder='Enter Your Name'
                    className='w-full p-2 border border-gray-300 rounded mt-2 mb-4'
                />
                <label htmlFor="email">Email :</label>
                <input
                    type="email" onChange={handleChange}
                    id='email'
                    name="email"
                    value={state.email}
                    required
                    placeholder='Enter Your email'
                    className='w-full p-2 border border-gray-300 rounded mt-2 mb-4'
                />
                <label htmlFor="password">Password :</label>
                <input
                    type="password" onChange={handleChange}
                    id='password'
                    name="password"
                    value={state.password}
                    required
                    placeholder='Enter Your password'
                    className='w-full p-2 border border-gray-300 rounded mt-2 mb-4'
                />
                <Button
                    type="primary"
                    htmlType='submit'
                    className='text-white bg-green-300 mt-4 w-full'
                    loading={isProcessing}
                >
                    Register
                </Button>
            </form>
            .
        </div>
    )
}

export default myRegister
