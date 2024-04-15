import React, { useState } from "react"
import axios from "axios"
import Login from "./Login"
import Register from "./Register"

const LoginPanel = (props: {
  onLoginClick: (user_id: string) => void
  onSetLoggedIn: () => void
}) => {
  const [loginState, setLoginState] = useState("login")

  const switchLoginState = () => {
    if (loginState === "login") setLoginState("register")
    if (loginState === "register") setLoginState("login")
  }

  const register = (email: string, firebase_user_id: string) => {
    console.log("in LoginPanel register function")
    axios
      .post("http://localhost:5000/users/add", {
        email: email,
        firebase_user_id: firebase_user_id,
      })
      .then((res) => console.log(res.data))
  }

  return loginState === "login" ? (
    <Login
      onSwitchLoginState={() => switchLoginState()}
      onLoginClick={props.onLoginClick}
      onSetLoggedIn={props.onSetLoggedIn}
    />
  ) : (
    <Register
      onSwitchLoginState={() => switchLoginState()}
      onRegister={register}
    />
  )
}

export default LoginPanel
