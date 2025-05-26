'use client'
import RegisterBox from "../components/RegisterBox"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useAuthStore from '../stores/useAuthStore'
const URL = "https://typestorm-hy7h.onrender.com"
const MIN_PASSWORD_LENGTH = 5
const MIN_USERNAME_LENGTH = 4


const Register = () => {
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [inputUsername, setInputUsername] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    // handleUsernameChange
    const handleUsernameChange = (e) => {
        const newUsername = e.target.value
        setInputUsername(newUsername);

        if (newUsername.length < MIN_USERNAME_LENGTH) {
            setUsernameError(`Username must be at least ${MIN_USERNAME_LENGTH} characters long.`);
        } else {
            setUsernameError('');
        }
    };

    // handlePasswordChange
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value
        setInputPassword(newPassword);

        if (newPassword.length < MIN_PASSWORD_LENGTH) {
            setPasswordError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
        } else if (newPassword.length > 20) {
            setPasswordError('Password cannot exceed 20 characters.');
        } else if (!/(?=.*[!@#$%^&*])/.test(newPassword)) {
            setPasswordError('Password must contain at least one special character.');
        } else if (!/(?=.*[0-9])/.test(newPassword)) {
            setPasswordError('Password must contain at least one number.')
        } else if (!/(?=.*[A-Z])/.test(newPassword)) {
            setPasswordError('Password must contain at least one uppercase letter.')
        } else if (!/(?=.*[a-z])/.test(newPassword)) {
            setPasswordError('Password must contain at least one lowercase letter.')
        } else {
            setPasswordError('');
        }
    };

    // OnSubmit
    const handleSubmit = async (e) => { 
        e.preventDefault();

        // If there is an error with either the username or password
        if (usernameError !== "" || passwordError !== "") {
            return // Do not allow the data to be submitted
        }

        // Submit data to backend 
        try {
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
            const data = await res.json();
            console.log("Submitted data");

            if (!res.ok) {
                setError(data.message || "Something went wrong")
            } else {
                localStorage.setItem('token', data.token);
                useAuthStore.getState().login(data.token)
                router.push('/')
            }

        } catch (error) {
            setError("Failed to connect to server")
            console.log({error});
        }
    }

    return (
        <>
            <RegisterBox 
            handleSubmit={handleSubmit} 
            handleUsernameChange={handleUsernameChange} 
            handlePasswordChange={handlePasswordChange}
            inputPassword={inputPassword}
            minPasswordLength={MIN_PASSWORD_LENGTH}
            usernameError={usernameError}
            passwordError={passwordError}
            />
        </>
    )
}

export default Register