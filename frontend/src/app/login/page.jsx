'use client'
import React from 'react'
import LoginBox from '../components/LoginBox'
import RegisterBox from "../components/RegisterBox"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useAuthStore from '../stores/useAuthStore'
const URL = "https://typestorm-hy7h.onrender.com" 

const Login = () => {
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({ username: '', password: '' });
    const router = useRouter();

    // handleChange
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // OnSubmit
    const handleSubmit = async (e) => { 
        e.preventDefault();

        try {
            const res = await fetch(`${URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Something went wrong")
            } else {
                localStorage.setItem('token', data.token);
                useAuthStore.getState().login(data.token)
                console.log("signed in");
                router.push('/')
            }
        
        } catch (error) {
            setError("Failed to connect to server")
            console.log("unable to sign in");
        }
    }
  return (
    <>
        <LoginBox handleSubmit={handleSubmit} handleChange={handleChange}/>
    </>
  )
}

export default Login