import React, { useMemo, useState } from "react"

import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api"

import { Pubs, Pub } from "../../data/PubsData"
import "./map.css"
type MapOptions = google.maps.MapOptions
type LatLngLiteral = google.maps.LatLngLiteral

const Map = () => {
  const [selectedPub, setSelectedPub] = useState("")

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA8Q5IvOIuWGKHgc2hURRzeYSgggxnP5wg",
  })

  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 47.478008, lng: 19.061275 }),
    []
  )
  const myStyles =[
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
              { visibility: "off" }
        ]
    }
];
  const options = useMemo<MapOptions>(
    () => ({ disableDefaultUI: true, clickableIcons: false, styles: myStyles }),
    []
  )

  if (!isLoaded) return <div>Loading...</div>
  return (
    <div>
      <div className="map-container">
        
        <GoogleMap
          zoom={12}
          center={center}
          options={options}

          mapContainerClassName="map"
        >
          {Pubs.map((pub) => (
            <MarkerF
              key={pub.lat}
              position={{ lat: pub.lat, lng: pub.lng }}
              title={pub.name}
              onClick={() => {
                setSelectedPub(pub.name)
              }}
            ></MarkerF>
          ))}
          
        </GoogleMap>
        <div className="map-sidebar">{selectedPub}</div>
      </div>
    </div>
  )
}

export default Map
