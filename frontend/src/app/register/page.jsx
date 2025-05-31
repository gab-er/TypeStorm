"use client";
import RegisterBox from "../components/Register/RegisterBox";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../stores/useAuthStore";
import {
  validateConfirmPassword,
  validatePassword,
} from "@/lib/registerValidation";
import { validateUsername } from "@/lib/registerValidation";
import Loading from "../loading";
import url from "@/lib/apiUrl";

const MIN_PASSWORD_LENGTH = process.env.NEXT_PUBLIC_MIN_PASSWORD_LENGTH;
const MIN_USERNAME_LENGTH = process.env.NEXT_PUBLIC_MIN_USERNAME_LENGTH;

const Register = () => {
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Login
  const login = useAuthStore((state) => state.login);

  // handleUsernameChange
  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setInputUsername(newUsername);

    const error = validateUsername(newUsername);
    setUsernameError(error);
  };

  // handlePasswordChange
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setInputPassword(newPassword);

    const error = validatePassword(newPassword);
    setPasswordError(error);
  };

  // handleConfirmPasswordChange
  const handleConfirmPasswordChange = (e) => {
    const newPassword = e.target.value;

    const error = validateConfirmPassword(newPassword, inputPassword);
    setConfirmPasswordError(error);
  };

  // OnSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If there is an error with either the username or password
    if (
      usernameError !== "" ||
      passwordError !== "" ||
      confirmPasswordError !== ""
    ) {
      return; // Do not allow the data to be submitted
    }

    // Submit data to backend
    try {
      // Show loading animation (Do not reset to false to avoid flashing of the registration box)
      setLoading(true);
      const formData = {
        username: inputUsername,
        password: inputPassword,
      };

      // Fetch data
      const res = await fetch(`${url}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      // Check if username is taken (501 Status Code)
      if (res.status === 501) {
        setUsernameError(`Username \"${formData.username}\" is taken`);
        setLoading(false);
        setInputUsername(formData.username);
        setInputPassword(formData.password);
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        console.log(error);
        setLoading(false);
      } else {
        console.log("Successful Registration");
        login(formData.username)
        router.push("/");
      }
    } catch (e) {
      setError("Failed to connect to server");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    // If loading, show loading icon
    <>
      <RegisterBox
        handleSubmit={handleSubmit}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleConfirmPasswordChange={handleConfirmPasswordChange}
        inputPassword={inputPassword}
        minPasswordLength={MIN_PASSWORD_LENGTH}
        usernameError={usernameError}
        passwordError={passwordError}
        confirmPasswordError={confirmPasswordError}
        loading={loading}
      />
    </>
  );
};

export default Register;
