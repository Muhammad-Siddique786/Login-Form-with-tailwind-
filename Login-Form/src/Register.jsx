import React, { useState } from 'react'
import { Button } from 'antd'
import { auth } from './Firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";

const initialState = {
    username: '',
    email: '',
    password: ''
}

const Register = () => {
    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        const { username, email, password } = state

        const userData = {

            username,
            email,
            password
        }


        setIsProcessing(true)

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log('user', user)
                createDocument({ ...userData, uid: user.uid }) // Assuming createDocument is a function to save user data
                console.log('User registered successfully:', user);
                // ...
            })
            .catch((error) => {
                console.log('error', error);
                // ..
            });


        setTimeout(() => {
            setIsProcessing(false)
            alert('Registration Successful')
            setState(initialState) // reset after success
        }, 2000)
    }

    const createDocument = (userData) => {
        console.log('userData', userData)
    }

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    return (
        <div className='flex flex-col items-center justify-start min-h-screen bg-white'>
            <form
                className='bg-gray-50 p-6 rounded shadow-md w-96 mt-20'
                onSubmit={handleSubmit}
            >
                <h1 className='text-2xl font-bold mb-4 text-center'>Register</h1>

                <label className='block text-sm font-medium mb-2' htmlFor='username'>Username</label>
                <input
                    className='w-full p-2 border border-gray-300 rounded'
                    type='text'
                    id='username'
                    name='username'
                    value={state.username}
                    required
                    placeholder='Enter Your Name'
                    onChange={handleChange}
                />

                <label className='block text-sm font-medium mb-2 mt-2' htmlFor='email'>Email</label>
                <input
                    className='w-full p-2 border border-gray-300 rounded'
                    type='email'
                    id='email'
                    name='email'
                    value={state.email}
                    required
                    placeholder='Enter Your email'
                    onChange={handleChange}
                />

                <label className='block text-sm font-medium mb-2 mt-2' htmlFor='password'>Password</label>
                <input
                    className='w-full p-2 border border-gray-300 rounded'
                    type='password'
                    id='password'
                    name='password'
                    value={state.password}
                    required
                    placeholder='Enter Your Password'
                    onChange={handleChange}
                />

                <Button
                    type='primary'
                    htmlType='submit'
                    className='text-white bg-green-300 mt-4 w-full'
                    loading={isProcessing}
                >
                    Register
                </Button>
            </form>
        </div>
    )
}

export default Register
