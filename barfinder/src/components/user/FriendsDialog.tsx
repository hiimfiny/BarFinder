import React, { useEffect, useState } from "react"
import { ScrollPanel } from "primereact/scrollpanel"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"

import { TabView, TabPanel } from "primereact/tabview"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  getFriends,
  getRequests,
  getUserId,
  setFriends,
  setRequests,
} from "../../features/UserSlice"
import axios from "axios"

const FriendsDialog = () => {
  const dispatch = useAppDispatch()
  const userID = useAppSelector(getUserId)
  const [showRequestInput, setShowRequestInput] = useState(false)
  const [requestInput, setRequestInput] = useState("")
  const [requestList, setRequestList] = useState<string[]>(["placeholder 1"])
  const [requestVisible, setRequestVisible] = useState(false)
  const friends = useAppSelector(getFriends)
  const requests = useAppSelector(getRequests)

  useEffect(() => {
    console.log(friends)
  }, [friends])
  const handleRequestClick = () => {
    setShowRequestInput(true)
  }

  const handleAddFriendClick = () => {
    console.log("Adding friend:", requestInput)
    axios
      .post(`http://localhost:5000/users/sendRequest`, {
        email: requestInput,
        id: userID,
      })
      .then((res) => {
        console.log(res.data)
      })
    setRequestInput("")
    //setFriends((prevState) => [...prevState, requestUsername])
    setShowRequestInput(false)
  }

  const handleDeleteFriend = (index: number) => {
    const updatedFriends = [...friends]
    updatedFriends.splice(index, 1)
    dispatch(setFriends(updatedFriends))
    axios
      .post("http://localhost:5000/users/deleteFriend", {
        id: userID,
        email: friends[index],
      })
      .then((res) => console.log(res.data))
  }

  //TODO
  const handleAcceptFriendRequest = (request: string, index: number) => {
    const updatedRequests = [...requests]
    updatedRequests.splice(index, 1)
    dispatch(setRequests(updatedRequests))
    console.log("friend request accepted")
    axios
      .post("http://localhost:5000/users/acceptRequest", {
        id: userID,
        email: request,
      })
      .then((res) => console.log(res.data))
  }

  //TODO
  const handleDeclineFriendRequest = (request: string, index: number) => {
    console.log("friend request declined")
    const updatedRequests = [...requests]
    updatedRequests.splice(index, 1)
    console.log(updatedRequests)
    dispatch(setRequests(updatedRequests))
    axios
      .post("http://localhost:5000/users/declineRequest", {
        id: userID,
        email: request,
      })
      .then((res) => console.log(res.data))
  }

  const refreshFriends = () => {
    axios
      .get(`http://localhost:5000/users/friendsNames/${userID}`)
      .then((res) => {
        console.log(res.data)
        dispatch(setFriends(res.data))
      })

    axios
      .get(`http://localhost:5000/users/requestsNames/${userID}`)
      .then((res) => {
        console.log(res.data)
        dispatch(setRequests(res.data))
      })
  }

  return (
    <div className="friends-panel">
      <div className="friends-header">
        <div className="friends-header-menu">
          <div
            className={
              "friends-header-button" + (requestVisible ? "" : " active")
            }
            onClick={() => setRequestVisible(false)}
          >
            Friends
          </div>
          <div
            className={
              "friends-header-button" + (requestVisible ? " active" : "")
            }
            onClick={() => setRequestVisible(true)}
          >
            Requests
          </div>
        </div>
        <Button icon="pi pi-refresh" onClick={() => refreshFriends()}></Button>
      </div>
      <div className="friends-list">
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
              requests.map((request, index) => (
                <li key={index}>
                  {request}
                  <Button
                    icon="pi pi-check"
                    className="p-button-rounded p-button-sm"
                    onClick={() => handleAcceptFriendRequest(request, index)}
                  />
                  <Button
                    icon="pi pi-times"
                    className="p-button-rounded p-button-danger p-button-sm"
                    onClick={() => handleDeclineFriendRequest(request, index)}
                  />
                </li>
              ))}
          </ul>
        </ScrollPanel>
      </div>
      <div className="request-section">
        {showRequestInput ? (
          <div className="request-input">
            <InputText
              value={requestInput}
              onChange={(e) => setRequestInput(e.target.value)}
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
      </div>
    </div>
  )
}

export default FriendsDialog
