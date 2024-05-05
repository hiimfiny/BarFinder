import React, { useState } from "react"
import { ScrollPanel } from "primereact/scrollpanel"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"

const FriendsDialog = () => {
  const [showRequestInput, setShowRequestInput] = useState(false)
  const [requestUsername, setRequestUsername] = useState("")
  const [friends, setFriends] = useState<string[]>([
    "Friend 1",
    "Friend 2",
    "Friend 3",
  ])

  const handleRequestClick = () => {
    setShowRequestInput(true)
  }

  const handleAddFriendClick = () => {
    // Logic to add friend with the inputted username
    console.log("Adding friend:", requestUsername)
    // Reset the input after adding friend
    setRequestUsername("")
    setFriends((prevState) => [...prevState, requestUsername])
    setShowRequestInput(false)
  }

  const handleDeleteFriend = (index: number) => {
    // Remove friend at the specified index
    const updatedFriends = [...friends]
    updatedFriends.splice(index, 1)
    setFriends(updatedFriends)
  }

  return (
    <div className="friends-panel">
      <div className="friend-list">
        <ScrollPanel style={{ height: "200px" }}>
          {/* List of friends */}
          <ul>
            {friends.map((friend, index) => (
              <li key={index}>
                {friend}
                <Button
                  icon="pi pi-times"
                  className="p-button-rounded p-button-danger p-button-sm"
                  onClick={() => handleDeleteFriend(index)}
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
              placeholder="Enter username"
            />
            <Button
              label="Add"
              className="p-button-raised p-button-primary"
              onClick={handleAddFriendClick}
            />
          </div>
        ) : (
          <Button
            label="Add friend"
            className="p-button-raised"
            onClick={handleRequestClick}
          />
        )}
        <Button label="Requests" className="p-button-raised" />
      </div>
    </div>
  )
}

export default FriendsDialog
