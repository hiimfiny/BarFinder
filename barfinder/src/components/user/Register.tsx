import React, { useRef } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "./firebase_config.js"
const Register = (props: {
  onSwitchLoginState: () => void
  onRegister: (email: string, firebase_user_id: string) => void
}) => {
  const usernameInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()
    register()

    console.log(usernameInputRef.current?.value)
    //usernameInputRef.current!.value = ""
    //passwordInputRef.current!.value = ""
    props.onSwitchLoginState()
  }

  const register = async () => {
    const email = usernameInputRef.current!.value
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        usernameInputRef.current!.value,
        passwordInputRef.current!.value
      )

      console.log(user)
      props.onRegister(email, user.user.uid)
    } catch (error) {
      console.log(error)
    }
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
