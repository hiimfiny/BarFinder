import React, { useState } from "react"

import Login from "./Login"
import Register from "./Register"

const LoginPanel = () => {
  const [loginState, setLoginState] = useState("login")

  const switchLoginState = () => {
    if (loginState === "login") setLoginState("register")
    if (loginState === "register") setLoginState("login")
  }

  return (
    <div>
      {loginState === "login" && (
        <Login onSwitchLoginState={() => switchLoginState()} />
      )}
      {loginState === "register" && (
        <Register onSwitchLoginState={() => switchLoginState()} />
      )}
    </div>
  )
}

export default LoginPanel
