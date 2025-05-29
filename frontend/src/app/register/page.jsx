'use client'
import RegisterBox from "../components/RegisterBox"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useAuthStore from '../stores/useAuthStore'
import { validateConfirmPassword, validatePassword } from "@/lib/registerValidation"
import { validateUsername } from "@/lib/registerValidation"
import Loading from "../loading"

const URL = process.env.NEXT_PUBLIC_API_KEY
const MIN_PASSWORD_LENGTH = process.env.NEXT_PUBLIC_MIN_PASSWORD_LENGTH
const MIN_USERNAME_LENGTH = process.env.NEXT_PUBLIC_MIN_USERNAME_LENGTH

const Register = () => {
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [inputUsername, setInputUsername] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    // handleUsernameChange
    const handleUsernameChange = (e) => {
        const newUsername = e.target.value
        setInputUsername(newUsername);

        const error = validateUsername(newUsername)
        setUsernameError(error)

    };

    // handlePasswordChange
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value
        setInputPassword(newPassword);

        const error = validatePassword(newPassword)
        setPasswordError(error)

    };

    // handleConfirmPasswordChange
    const handleConfirmPasswordChange = (e) => {
        const newPassword = e.target.value

        const error = validateConfirmPassword(newPassword, inputPassword)
        setConfirmPasswordError(error)
    };

    // OnSubmit
    const handleSubmit = async (e) => { 
        e.preventDefault();

        // If there is an error with either the username or password
        if (usernameError !== "" || passwordError !== "" || confirmPasswordError !== "") {
            return // Do not allow the data to be submitted
        }

        // Submit data to backend 
        try {
            // Show loading animation (Do not reset to false to avoid flashing of the registration box)
            setLoading(true)
            const formData = {
                username: inputUsername,
                password: inputPassword,
            }

            const res = await fetch(`${URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            // Check if username is taken (501 Status Code)
            if (res.status === 501) {
                setUsernameError("Username is taken")
                return
            } 

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Something went wrong")
                console.log(error);
            } else {
                localStorage.setItem('token', data.token);
                useAuthStore.getState().login(formData.username, data.token)
                router.push('/')
            }

        } catch (e) {
            setError("Failed to connect to server")
            console.log(error);
        }
    }

    return (
        // If loading, show loading icon
        <>
            {loading && <Loading /> || <RegisterBox 
            handleSubmit={handleSubmit} 
            handleUsernameChange={handleUsernameChange} 
            handlePasswordChange={handlePasswordChange}
            handleConfirmPasswordChange={handleConfirmPasswordChange}
            inputPassword={inputPassword}
            minPasswordLength={MIN_PASSWORD_LENGTH}
            usernameError={usernameError}
            passwordError={passwordError}
            confirmPasswordError={confirmPasswordError}
            />}
        </>
    )
}

export default Register