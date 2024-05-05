import React, { useRef } from "react"
import "./login.css"
import { useAppDispatch } from "../../app/hooks"
import { setLoggedIn } from "../../features/UISlice"

const Login = (props: {
  onSwitchLoginState: () => void
  onLoginClick: (username: string, password: string) => void
}) => {
  const dispatch = useAppDispatch()
  const usernameInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()
    dispatch(setLoggedIn(true))
    props.onLoginClick(
      usernameInputRef.current!.value,
      passwordInputRef.current!.value
    )

    usernameInputRef.current!.value = ""
    passwordInputRef.current!.value = ""
  }

  return (
    <div className="login-container">
      <form onSubmit={submitHandler}>
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
    </div>
  )
}

export default Login
