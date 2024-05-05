import React, { useRef } from "react"

const Register = (props: {
  onSwitchLoginState: () => void
  onRegister: (email: string, password: string) => void
}) => {
  const usernameInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()
    register()

    console.log(usernameInputRef.current?.value)
    props.onSwitchLoginState()
  }

  const register = async () => {
    const email = usernameInputRef.current!.value
    const password = passwordInputRef.current!.value

    props.onRegister(email, password)
  }

  return (
    <div className="login-container">
      <form onSubmit={submitHandler}>
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
    </div>
  )
}

export default Register
