import React, { useState } from "react"
import { Row, Col, Image, Button, Modal } from "react-bootstrap"
import LoginPanel from "./LoginPanel"

type UserPanelProps = {
  userId: string
  onLoginClick: (user_id: string) => void
}

const UserPanel = (props: UserPanelProps) => {
  const [showLogin, setShowLogin] = useState(false)

  const handleClose = () => setShowLogin(false)
  const handleShow = () => setShowLogin(true)
  return (
    <div className="panel">
      <Modal show={showLogin} onHide={handleClose}>
        <LoginPanel onLoginClick={props.onLoginClick}></LoginPanel>
      </Modal>
      <Button
        onClick={() => {
          handleShow()
        }}
      >
        Log in
      </Button>
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
            <div className="profile-options" style={{ background: "#fef6c9" }}>
              <Button className="mb-2">Option 1</Button>
              <Button className="mb-2">Option 2</Button>
              <Button className="mb-2">Option 3</Button>
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
    </div>
  )
}

export default UserPanel
