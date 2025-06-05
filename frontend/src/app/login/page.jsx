"use client";
import LoginBox from "../components/Login/LoginBox";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../stores/useAuthStore";
import url from "@/lib/apiUrl";

const Login = () => {
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // handleUsernameChange
  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setInputUsername(newUsername);

    // If there is a username error, clear it
    if (usernameError) {
      setUsernameError("");
    }
  };

  // handlePasswordChange
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setInputPassword(newPassword);

    // If there is a password error, clear it
    if (passwordError) {
      setPasswordError("");
    }
  };

  // OnSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If there is an error with either the username or password
    if (usernameError !== "" || passwordError !== "") {
      return; // Do not allow the data to be submitted
    }

    // Submit data to backend
    try {
      // Show loading animation (Do not reset to false to avoid flashing of the sign in box)
      setLoading(true);
      const formData = {
        username: inputUsername,
        password: inputPassword,
      };

      const res = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      // Username not found -> 404 Status code
      if (res.status === 404) {
        setUsernameError("Username not found");
        setLoading(false)
        setUsernameError("Username not found");
        return;
      } else if (res.status === 401) {
        // Password is incorrect -> 401 Status code
        setPasswordError("Password is incorrect");
        setLoading(false)
        return;
      }

      const data = await res.json();
      console.log("Submitted data");

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        console.log("res not ok");
        setLoading(false);
      } else {
        useAuthStore.getState().login(formData.username);
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
        <LoginBox
          handleSubmit={handleSubmit}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          usernameError={usernameError}
          passwordError={passwordError}
          loading={loading}
        />
    </>
  );
};

export default Login;
