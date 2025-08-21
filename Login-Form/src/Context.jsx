import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from './Firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'

const AuthContext = createContext()

const initialState = { isAuth: false, user: null }

const Context = ({ children }) => {
    const [state, setState] = useState(initialState)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('User logged in:', user)
                setState({ isAuth: true, user })
            } else {
                console.log('User is logged out')
                setState({ isAuth: false, user: null })
            }
        })

        // Cleanup listener on unmount
        return () => unsubscribe()
    }, [])

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                window.notify?.('User logged out successfully')
                // setState({ isAuth: false, user: null }) // not needed, will be updated by onAuthStateChanged
            })
            .catch((error) => {
                console.error('Logout error:', error)
                window.notify?.('Error logging out: ' + error.message)
            })
    }

    return (
        <AuthContext.Provider value={{ ...state, setAuthState: setState, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext)

export default Context
