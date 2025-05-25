'use client'
import React from 'react'
import RegisterBox from "../components/RegisterBox"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import useAuthStore from '../stores/useAuthStore'

const URL = "https://typestorm-hy7h.onrender.com"


const Register = () => {
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
        console.log("Submitted");

        try {
            console.log("URL is ", URL);
            console.log("form data: ", formData);
            const res = await fetch(`${URL}/auth/register`, {
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
                router.push('/')
            }
        } catch (error) {
            setError("Failed to connect to server")
            console.log("error");
        }
    }

    return (
        <>
            <RegisterBox handleSubmit={handleSubmit} handleChange={handleChange}/>
        </>
    )
}

export default Register