import React, { useRef } from "react"
import "./login.css"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "./firebase_config.js"
const Login = (props: {
  onSwitchLoginState: () => void
  onLoginClick: (user_id: string) => void
}) => {
  const usernameInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()
    login()
    usernameInputRef.current!.value = ""
    passwordInputRef.current!.value = ""
  }

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        usernameInputRef.current!.value,
        passwordInputRef.current!.value
      )
      props.onLoginClick(user.user.uid)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className="login-container" onSubmit={submitHandler}>
      <h2>Login</h2>
      <label htmlFor="username">Username</label>
      <input type="text" id="username" ref={usernameInputRef}></input>
      <label htmlFor="password">Password</label>
      <input type="password" id="password" ref={passwordInputRef}></input>
      <div className="button-container">
        <button className="submit">Log in</button>
        <button className="switch" onClick={props.onSwitchLoginState}>
          Switch to Register
        </button>
      </div>
    </form>
  )
}

export default Login
