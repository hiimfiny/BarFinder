import React, { useEffect, useMemo, useState } from "react"

import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api"
import { Card, Row, Col, Container, Button } from "react-bootstrap"

import "./map.css"
import { PubType } from "../Types"
import MapSidePanel from "./MapSidePanel"
import MapFilter from "./MapFilter"
type MapOptions = google.maps.MapOptions
type LatLngLiteral = google.maps.LatLngLiteral

type MapProps = {
  pubsList: PubType[]
  selectedPubId: string
}

const Map = (props: MapProps) => {
  const [pubsList, setPubsList] = useState(props.pubsList)
  const [selectedPub, setSelectedPub] = useState(props.pubsList.at(0))
  const [selectedPubId, setSelectedPubId] = useState(props.selectedPubId)
  const [sidePanel, setSidePanel] = useState(false)

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA4wee16I0sn4X5QpvzgkutW8XscZviJhE",
  })

  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 47.478008, lng: 19.061275 }),
    []
  )
  const myStyles = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ]
  const options = useMemo<MapOptions>(
    () => ({ disableDefaultUI: true, clickableIcons: false, styles: myStyles }),
    []
  )
  const selectPub = (pub: PubType) => {
    setSelectedPub(pub)
    setSidePanel(true)
  }

  useEffect(() => {
    if (props.selectedPubId !== "") {
      selectPub(
        props.pubsList.find((pub) => pub._id === props.selectedPubId) as PubType
      )
      setSelectedPubId("")
    } else {
      setSidePanel(false)
    }
  }, [selectedPubId])

  if (!isLoaded) return <div>Loading...</div>
  return (
    <div>
      <div>
        <MapFilter></MapFilter>
      </div>
      <Container
        style={{
          border: "1px solid black",
          borderRadius: "10px",
          padding: "2px",
        }}
        className="panel"
      >
        <Row>
          <Col lg={sidePanel ? 9 : 12}>
            <GoogleMap
              zoom={12}
              center={center}
              options={options}
              mapContainerClassName="map"
            >
              {pubsList.map((pub) => (
                <MarkerF
                  key={pub._id}
                  position={{ lat: pub.location[0], lng: pub.location[1] }}
                  title={pub.name}
                  onClick={() => {
                    selectPub(pub)
                  }}
                ></MarkerF>
              ))}
            </GoogleMap>
          </Col>
          {sidePanel && (
            <Col lg={3} className="nopadding">
              <MapSidePanel
                pub={selectedPub}
                setSidePanel={setSidePanel}
              ></MapSidePanel>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  )
}

export default Map
