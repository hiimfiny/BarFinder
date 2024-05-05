import React, { useState } from "react"
import { Row, Col, Image, Button } from "react-bootstrap"
import LoginPanel from "./LoginPanel"
import { useAppSelector } from "../../app/hooks"
import { getLoggedIn } from "../../features/UISlice"

type UserPanelProps = {
  userId: string
  onLoginClick: (username: string, password: string) => void
}

const UserPanel = (props: UserPanelProps) => {
  const loggedIn = useAppSelector(getLoggedIn)
  return (
    <div className="panel">
      {!loggedIn && <LoginPanel onLoginClick={props.onLoginClick}></LoginPanel>}

      {loggedIn && (
        <Row>
          <Col lg={3} className="profile-col">
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
              <div>{props.userId}</div>
            </Row>
            <Row>
              <div>Favourite drinks</div>
            </Row>
            <Row>
              <div>Favourite pubs</div>
            </Row>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default UserPanel
