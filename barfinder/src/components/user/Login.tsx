import React, { useRef } from "react"
import "./login.css"

const Login = (props: { onSwitchLoginState: () => void }) => {
  const usernameInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()
    console.log(usernameInputRef.current?.value)
    usernameInputRef.current!.value = ""
    passwordInputRef.current!.value = ""
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
          Swtich to Register
        </button>
      </div>
    </form>
  )
}

export default Login
