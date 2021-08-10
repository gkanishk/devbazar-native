import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
export default function LoginUser() {
    const [showLoginForm,changeForm] = useState(true)

    return (
        <>
            {
            showLoginForm ?
            <LoginForm 
            changeForm={()=>changeForm(!showLoginForm)}
            />
            :
            <SignUpForm
            changeForm={()=>changeForm(!showLoginForm)}
            />
        }
        </>
    )
}