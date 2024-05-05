import React, { useState } from "react"
import axios from "axios"
import Login from "./Login"
import Register from "./Register"

const LoginPanel = (props: {
  onLoginClick: (username: string, password: string) => void
}) => {
  const [loginState, setLoginState] = useState("login")

  const switchLoginState = () => {
    if (loginState === "login") setLoginState("register")
    if (loginState === "register") setLoginState("login")
  }

  const register = (email: string, password: string) => {
    axios
      .post("http://localhost:5000/users/add", {
        email: email,
        password: password,
      })
      .then((res) => console.log(res.data))
  }

  return loginState === "login" ? (
    <Login
      onSwitchLoginState={() => switchLoginState()}
      onLoginClick={props.onLoginClick}
    />
  ) : (
    <Register
      onSwitchLoginState={() => switchLoginState()}
      onRegister={register}
    />
  )
}

export default LoginPanel
