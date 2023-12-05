import React, { useState, useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {
  PubType,
  formatTimeFromInt,
  formatTimeFromDate,
  checkIfOpen,
  formatDayFromDate,
  generateStarsArray,
  calculateAvgRating,
  daysOfTheWeek
} from "../Types"

import { Button, Stack, Modal, Table } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
  faLocationDot,
  faMartiniGlassEmpty,
  faClock,
} from "@fortawesome/free-solid-svg-icons"

type MapSidePanelProps = {
  pub: PubType | undefined
  setSidePanel: (value: boolean) => void
}
const MapSidePanel = (props: MapSidePanelProps) => {
  const [showMenu, setShowMenu] = useState(false)
  const handleShowMenu = () => setShowMenu(true)
  const handleCloseMenu = () => setShowMenu(false)

  const [showOpenTimes, setShowOpenTimes] = useState(false)
  const handleShowOpenTimes = () => setShowOpenTimes(!showOpenTimes)

  const showToast = (message: string) => {
    toast(message, { autoClose: 1000, hideProgressBar: true })
  }
  let currentDate: Date = new Date()
  useEffect(() => {
    currentDate = new Date()
    console.log(currentDate)
    console.log(currentDate.getDay())
  }, [])
  return (
    <div>
      <Stack
        direction="horizontal"
        gap={3}
        className="d-flex justify-content-between"
      >
        <div>
          <div>{props.pub!.name}</div>
          <div>
            {generateStarsArray(calculateAvgRating(props.pub!.ratings))}
          </div>
        </div>
        <Button
          onClick={() => {
            props.setSidePanel(false)
          }}
        >
          X
        </Button>
      </Stack>
      <br />
      <br />
      <Stack gap={3} className="d-flex justify-content-center">
        <Stack
          direction="horizontal"
          gap={3}
          className="d-flex justify-content-start"
        >
          <FontAwesomeIcon icon={faLocationDot} />
          <p
            style={{ fontSize: "12px" }}
            onClick={() => {
              navigator.clipboard.writeText(props.pub!.address)
              showToast("Copied to clipboard")
            }}
          >
            {props.pub?.address}
            <ToastContainer></ToastContainer>
          </p>
        </Stack>
        <Stack
          direction="horizontal"
          gap={3}
          className="d-flex justify-content-start"
        >
          <FontAwesomeIcon icon={faClock} />
          <div onClick={handleShowOpenTimes} style={{ fontSize: "12px" }}>
            {checkIfOpen(
              formatTimeFromDate(currentDate),
              props.pub!.opentime.at(formatDayFromDate(currentDate))!.open,
              props.pub!.opentime.at(formatDayFromDate(currentDate))!.close
            )
              ? `Open now - Closes at ${formatTimeFromInt(
                  props.pub!.opentime.at(formatDayFromDate(currentDate))!.close
                )}`
              : "Closed now"}
          </div>

{/*     /*       `Closed now - Opens at ${daysOfTheWeek[formatDayFromDate(currentDate)].substring(0,1)} ${formatTimeFromInt(
            props.pub!.opentime.at(formatDayFromDate(currentDate))!.open
          )}` */ }
        </Stack>
        {showOpenTimes && (
          <Table style={{ fontSize: "12px" }}>
            <tbody>
              {props.pub?.opentime.map((item) => (
                <tr>
                  <td style={{ textAlign: "left" }}>{item.day}</td>
                  <td>
                    { (item.open === 0 && item.close ===0) ? "Closed" :
                    (formatTimeFromInt(item.open) +
                      " - " +
                      formatTimeFromInt(item.close))}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <Stack
          direction="horizontal"
          gap={3}
          className="d-flex justify-content-start"
        >
          <FontAwesomeIcon icon={faMartiniGlassEmpty} />
          <Button onClick={handleShowMenu}>Show menu</Button>
          <Modal show={showMenu} onHide={handleCloseMenu}>
            <Modal.Header closeButton>
              <Modal.Title>Menu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.pub?.menu.map((item) => (
                      <tr>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Modal.Body>
          </Modal>
        </Stack>
      </Stack>
    </div>
  )
}

export default MapSidePanel
