import React, { useState } from "react"
import {
  Form,
  FloatingLabel,
  Button,
  Stack,
  Modal,
  Table,
} from "react-bootstrap"
import { OpeningTime } from "../Types"

type PubOpenHoursModalProps = {
  onHoursSubmit: (openHours: OpeningTime[]) => void
  openHours: OpeningTime[]
}

const PubOpenHoursModal = (props: PubOpenHoursModalProps) => {
  const [openingTime, setOpeningTime] = useState(props.openHours)
  const onHourFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log(openingTime)
    props.onHoursSubmit(openingTime)
  }

  const updateOpeningTime = (day: string, field: string, value: number) => {
    setOpeningTime((prevOpeningTime) => {
      const updatedOpeningTime = prevOpeningTime.map((item) => {
        if (item.day === day) {
          return { ...item, [field]: value }
        }
        return item
      })
      return updatedOpeningTime
    })
  }
  return (
    <div>
      <Form onSubmit={onHourFormSubmit}>
        <Table>
          <tbody>
            {openingTime.map((item) => (
              <tr>
                <td>{item.day}</td>
                <td>
                  <FloatingLabel
                    controlId="floatingOpenInput"
                    label="Open"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      onChange={(e) => updateOpeningTime(item.day,'open',parseInt(e.target.value))}
                      defaultValue={item.open === 0 ? "" : item.open}
                    />
                  </FloatingLabel>
                </td>
                <td><FloatingLabel
                    controlId="floatingCloseInput"
                    label="Close"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      onChange={(e) => updateOpeningTime(item.day,'close',parseInt(e.target.value))}
                      defaultValue={item.close === 0 ? "" : item.close}
                    />
                  </FloatingLabel></td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="primary" onClick={onHourFormSubmit}>Save</Button>
      </Form>
    </div>
  )
}

export default PubOpenHoursModal
