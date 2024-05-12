import React, { useRef } from "react"
import "./user.css"
import { useAppDispatch } from "../../app/hooks"
import { setLoggedIn } from "../../features/UISlice"
import axios from "axios"
import { setFriends, setRequests, setUserId } from "../../features/UserSlice"
import { Toast } from "primereact/toast"
const Login = (props: { onSwitchLoginState: () => void }) => {
  const dispatch = useAppDispatch()
  const toast = useRef<Toast>(null)
  const usernameInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const showError = () => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: "Wrong email or password!",
      life: 1500,
    })
  }
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()

    axios
      .post(`http://localhost:5000/users/login`, {
        email: usernameInputRef.current!.value,
        password: passwordInputRef.current!.value,
      })
      .then((res) => {
        successfulLogin(res.data.user._id)
      })
      .catch((error) => {
        console.log(error.code)
        if (error.code === "ERR_BAD_REQUEST") {
          showError()
        }
      })

    usernameInputRef.current!.value = ""
    passwordInputRef.current!.value = ""
  }

  const successfulLogin = (id: string) => {
    dispatch(setUserId(id))
    dispatch(setLoggedIn(true))
    axios.get(`http://localhost:5000/users/friendsNames/${id}`).then((res) => {
      console.log(res.data)
      dispatch(setFriends(res.data))
    })
    axios.get(`http://localhost:5000/users/requestsNames/${id}`).then((res) => {
      console.log(res.data)
      dispatch(setRequests(res.data))
    })
  }

  return (
    <div className="login-container">
      <Toast ref={toast} position="center" />
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
