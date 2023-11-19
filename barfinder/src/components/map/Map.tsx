import React, {useMemo, useState} from "react"

import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api"

import { Pubs } from "../../data/Pubs"
import "./map.css"
type MapOptions = google.maps.MapOptions
type LatLngLiteral = google.maps.LatLngLiteral

const Map = () => {
const [selectedPub, setSelectedPub] = useState('')
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA8Q5IvOIuWGKHgc2hURRzeYSgggxnP5wg",
  })

  let Szavanna: LatLngLiteral = { lat: 47.478437, lng: 19.051313 }
  let Rizmajer : LatLngLiteral = { lat: 47.478063, lng: 19.046687 }
  const center = useMemo<LatLngLiteral>(()=>({lat: 47.478008, lng: 19.061275}),[])
  const options =useMemo<MapOptions>(()=>({disableDefaultUI: true, clickableIcons: false}),[])
  if (!isLoaded) return <div>Loading...</div>
  return (
    <div>
      <div className="">
        <div>{selectedPub}</div>
        <GoogleMap
          zoom={12}
          center={center}
          options={options}
          mapContainerClassName="map-container"
        >
          <Marker position={Szavanna} onClick={()=>{setSelectedPub('Szavanna')}}/>
          <Marker position={Rizmajer} onClick={()=>{setSelectedPub('Rizmajer')}}/>
        </GoogleMap>
      </div>
    </div>
  )
}

export default Map
