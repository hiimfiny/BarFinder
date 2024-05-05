import React, { useState } from "react"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"

interface SettingsScreenState {
  username: string
  newPassword: string
  confirmPassword: string
  previousPassword: string
}

const SettingsDialog = () => {
  const [state, setState] = useState<SettingsScreenState>({
    username: "",
    newPassword: "",
    confirmPassword: "",
    previousPassword: "",
  })

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({ ...prevState, username: e.target.value }))
  }

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({ ...prevState, newPassword: e.target.value }))
  }

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState((prevState) => ({ ...prevState, confirmPassword: e.target.value }))
  }

  const handlePreviousPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState((prevState) => ({
      ...prevState,
      previousPassword: e.target.value,
    }))
  }

  const handleSaveUsername = () => {
    // Logic to save username
    setState((prevState) => ({ ...prevState, username: "" }))
    console.log("Username saved:", state.username)
  }

  const handleSavePassword = () => {
    // Logic to save password
    setState((prevState) => ({
      ...prevState,
      newPassword: "",
      confirmPassword: "",
      previousPassword: "",
    }))
    console.log("Password saved:", state.newPassword)
  }

  const handleDeleteAccount = () => {
    // Logic to delete account
    console.log("Account deleted")
  }

  return (
    <div className="settings-container">
      <div className="settings-section">
        <h3>Change Username</h3>
        <InputText
          className="settings-input"
          value={state.username}
          onChange={handleUsernameChange}
        />
        <div className="settings-buttons">
          <Button label="Save" onClick={handleSaveUsername} />
        </div>
      </div>
      <div className="settings-section">
        <h3>Change Password</h3>
        <InputText
          className="settings-input"
          type="password"
          placeholder="Previous Password"
          value={state.previousPassword}
          onChange={handlePreviousPasswordChange}
        />
        <InputText
          className="settings-input"
          type="password"
          placeholder="New Password"
          value={state.newPassword}
          onChange={handleNewPasswordChange}
        />
        <InputText
          className="settings-input"
          type="password"
          placeholder="Confirm New Password"
          value={state.confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <div className="settings-buttons">
          <Button label="Save" onClick={handleSavePassword} />
        </div>
      </div>
      <div className="settings-section">
        <h3>Delete Account</h3>
        <div className="settings-buttons">
          <Button
            className="p-button-danger"
            label="Delete Account"
            onClick={handleDeleteAccount}
          />
        </div>
      </div>
    </div>
  )
}

export default SettingsDialog
