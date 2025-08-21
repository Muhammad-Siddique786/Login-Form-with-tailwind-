import React, { useState } from 'react'
import { Button } from 'antd'
import { auth } from './Firebase'
import { signInWithEmailAndPassword  } from "firebase/auth";

const initialState = {
    email: '',
    password: ''
}

const Register = () => {
    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        const { email, password } = state




        setIsProcessing(true)

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('user', user)
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
                <h1 className='text-2xl font-bold mb-4 text-center'>Login</h1>

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
