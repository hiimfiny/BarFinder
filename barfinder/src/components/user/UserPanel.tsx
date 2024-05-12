import React, { useState } from "react"

import LoginPanel from "./LoginPanel"
import { useAppSelector } from "../../app/hooks"
import { getLoggedIn } from "../../features/UISlice"
import { getUserId } from "../../features/UserSlice"

import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { Image } from "primereact/image"
import { Dialog } from "primereact/dialog"
import SettingsDialog from "./SettingsDialog"
import FriendsDialog from "./FriendsDialog"

const UserPanel = () => {
  const loggedIn = useAppSelector(getLoggedIn)
  const userID = useAppSelector(getUserId)

  const [settingsDialog, setSettingsDialog] = useState(false)
  const [friendsDialog, setFriendsDialog] = useState(false)
  return (
    <Card className="panel">
      {!loggedIn && <LoginPanel />}

      {loggedIn && (
        <div className="user-container">
          <div className="side-panel">
            <div className="profile-picture-container">
              <Image
                src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                alt="Profile Picture"
                imageClassName="profile-picture"
              />
              <div>{userID}</div>
            </div>
            <div className="profile-options">
              <Button
                onClick={() => {
                  setSettingsDialog(true)
                }}
              >
                Settings
              </Button>

              <Button
                onClick={() => {
                  setFriendsDialog(true)
                }}
              >
                Friends
              </Button>
            </div>
          </div>
          <Dialog
            header="Settings"
            style={{ width: "50vw" }}
            visible={settingsDialog}
            onHide={() => {
              setSettingsDialog(false)
            }}
            draggable={false}
            resizable={false}
            dismissableMask={true}
          >
            <div>
              <SettingsDialog></SettingsDialog>
            </div>
          </Dialog>
          <Dialog
            header={null}
            style={{ width: "50vw" }}
            visible={friendsDialog}
            onHide={() => {
              setFriendsDialog(false)
            }}
            closable={false}
            draggable={false}
            resizable={false}
            dismissableMask={true}
            content={<FriendsDialog></FriendsDialog>}
          ></Dialog>
          <div className="user-panel"></div>
          {/* <Col lg={3} className="profile-col">
            <Row className="profile-picture-container">
              <div>
                <Image
                  src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                  alt="Profile Picture"
                  className="profile-picture"
                  roundedCircle
                />
              </div>
            </Row>
            <Row>
              <div
                className="profile-options"
                style={{ background: "#fef6c9" }}
              >
                <Button className="mb-2">Friends</Button>
                <Button className="mb-2">Settings</Button>
              </div>
            </Row>
          </Col>
          <Col>
            <Row>
              <div>{userID}</div>
            </Row>
            <Row>
              <div></div>
            </Row>
            <Row>
              <div></div>
            </Row>
          </Col> */}
        </div>
      )}
    </Card>
  )
}

export default UserPanel
