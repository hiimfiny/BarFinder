import React, { useRef } from "react"

const Register = (props: { onSwitchLoginState: () => void }) => {
  const usernameInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()
    console.log(usernameInputRef.current?.value)
    usernameInputRef.current!.value = ""
    passwordInputRef.current!.value = ""
    props.onSwitchLoginState()
  }

  return (
    <form className="login-container" onSubmit={submitHandler}>
      <h2>Register</h2>
      <label htmlFor="username">Username</label>
      <input type="text" id="username" ref={usernameInputRef}></input>
      <label htmlFor="password">Password</label>
      <input type="password" id="password" ref={passwordInputRef}></input>
      <div className="button-container">
        <button className="submit">Register</button>
        <button className="switch" onClick={props.onSwitchLoginState}>
          Switch to Login
        </button>
      </div>
    </form>
  )
}

export default Register
