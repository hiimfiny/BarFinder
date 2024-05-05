import React, { useState } from "react"
import axios from "axios"
import Login from "./Login"
import Register from "./Register"

const LoginPanel = () => {
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
    <Login onSwitchLoginState={() => switchLoginState()} />
  ) : (
    <Register
      onSwitchLoginState={() => switchLoginState()}
      onRegister={register}
    />
  )
}

export default LoginPanel
