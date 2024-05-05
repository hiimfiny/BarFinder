import React, { useState } from "react"
import { ScrollPanel } from "primereact/scrollpanel"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"

const FriendsDialog = () => {
  const [showRequestInput, setShowRequestInput] = useState(false)
  const [requestUsername, setRequestUsername] = useState("")
  const [requestList, setRequestList] = useState<string[]>(["placeholder 1"])
  const [requestVisible, setRequestVisible] = useState(false)
  const [friends, setFriends] = useState<string[]>([
    "Friend 1",
    "Friend 2",
    "Friend 3",
  ])

  const handleRequestClick = () => {
    setShowRequestInput(true)
  }

  const handleAddFriendClick = () => {
    console.log("Adding friend:", requestUsername)
    setRequestUsername("")
    setFriends((prevState) => [...prevState, requestUsername])
    setShowRequestInput(false)
  }

  const handleDeleteFriend = (index: number) => {
    const updatedFriends = [...friends]
    updatedFriends.splice(index, 1)
    setFriends(updatedFriends)
  }

  //TODO
  const handleAcceptFriendRequest = () => {
    console.log("friend request accepted")
  }

  //TODO
  const handleDeclineFriendRequest = () => {
    console.log("friend request declined")
  }

  return (
    <div className="friends-panel">
      <div className="friend-list">
        <ScrollPanel style={{ height: "200px" }}>
          <ul>
            {!requestVisible &&
              friends.map((friend, index) => (
                <li key={index}>
                  {friend}
                  <Button
                    icon="pi pi-times"
                    className="p-button-rounded p-button-danger p-button-sm"
                    onClick={() => handleDeleteFriend(index)}
                  />
                </li>
              ))}
            {requestVisible &&
              requestList.map((friend, index) => (
                <li key={index}>
                  {friend}
                  <Button
                    icon="pi pi-check"
                    className="p-button-rounded p-button-sm"
                    onClick={() => handleAcceptFriendRequest()}
                  />
                  <Button
                    icon="pi pi-times"
                    className="p-button-rounded p-button-danger p-button-sm"
                    onClick={() => handleDeclineFriendRequest()}
                  />
                </li>
              ))}
          </ul>
        </ScrollPanel>
      </div>
      <div className="request-section">
        <h3>Friend Requests</h3>
        {showRequestInput ? (
          <div className="request-input">
            <InputText
              value={requestUsername}
              onChange={(e) => setRequestUsername(e.target.value)}
              placeholder="Enter email address"
            />
            <Button
              label="Add"
              className="p-button-raised p-button-primary"
              onClick={handleAddFriendClick}
            />
            <Button
              icon="pi pi-times"
              className="p-button-rounded p-button-danger p-button-sm"
              onClick={() => setShowRequestInput(false)}
            />
          </div>
        ) : (
          <Button
            label="Add friend"
            className="p-button-raised"
            onClick={handleRequestClick}
          />
        )}
        <Button
          label={requestVisible ? "Friend list" : "Friend requests"}
          className="p-button-raised"
          onClick={() => {
            setRequestVisible(!requestVisible)
          }}
        />
      </div>
    </div>
  )
}

export default FriendsDialog
