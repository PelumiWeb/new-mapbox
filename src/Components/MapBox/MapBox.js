import React, {useState,useEffect,useContext, useRef} from 'react'
import ReactMapGL,{Marker, Popup, FlyToInterpolator} from 'react-map-gl'
// import useSupercluster from 'use-supercl'
import axios from 'axios'
import './MapBox.css'
import RoomIcon from '@material-ui/icons/Room';
import {StoreContext} from '../../store/store'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import { useObserver } from 'mobx-react';


function MapBox () {
    const store = useContext(StoreContext)
    const width = 350;
    const map = useRef()

    const styleMap = () => {
      <div></div>
    }
  


    const [viewport, setViewport] = useState({
        width: "100%",
        height: 333,
        latitude: 37.93778,
        longitude: -107.81136,
        zoom: 15,  
    })


    // const mapRef = useRef()
   

    const accessKey ='pk.eyJ1Ijoid3d3bWFzdGVyMSIsImEiOiJjazZmbmxhYngwYjQxM2xtdDdwMjJzYjdnIn0._QtAdUTg9NtC9_R8Caq6Ng'

    const [features, setFeatures] = useState(null)
    const [series, setSeries] = useState(null)

    const [selectedCoordinates, setSelectedCoordinates] = useState(null)
    const [currentSong, setCurrentSong] = useState(null)
    useEffect(() => {
        const url = "https://52-90-82-235.maverickmaven.com/geotourdata/json.cfm?h=-107,37,s,en,3A771765"

        axios.get(url).then(response => {
      const features = response.data.features.filter(elem => {
        return  elem.type === 'Feature'
      })
      setFeatures(features)
    })

    axios.get(url).then(response => {
      const series = response.data.features.filter(elem => {
        return  elem.type === 'Series'
      })
      setSeries(series)
    })
    const addClass = () => {
      const mapBox = (map.current.getMap())
      return mapBox.ClassList.add('map_Styled')
    }

    console.log(addClass)
     
}, [])

    return useObserver(() => (
      <React.Fragment>
        

        { !features && !series ?  
         <Loader
                type="ThreeDots"
                color="#00BFFF"
                height={100}
                width={100}
        
             /> : 
        <div> 
        <ReactMapGL 
      ref={map}
      {...viewport}
      mapboxApiAccessToken={accessKey}
      mapStyle='mapbox://styles/mapbox/dark-v10'
      onViewportChange={viewport => {
          setViewport(viewport)
      }} >
       {features?.map(features => 
   
          (<Marker key={features.id} latitude={features.geometry.coordinates[1]}
          longitude={features.geometry.coordinates[0]}
          className={store.currentSong === features.assets[0].audio ? "mapActive marker" : "marker" }
          >
              <div 
              onClick={
      (e) => {
          e.preventDefault()
          console.log(e)
  setSelectedCoordinates(features)
    store.addSong(selectedCoordinates?.assets[0].audio)
    store.addImage(features.photo)
    store.addName(features.name)
      } }>
                 <RoomIcon />
              </div>
          </Marker>)
         )}

         {selectedCoordinates &&
         (<Popup 
         latitude={selectedCoordinates.geometry.coordinates[1]}
         longitude={selectedCoordinates.geometry.coordinates[0]}
         onClose={(e) =>{
             setSelectedCoordinates(null)
         }}
         >
             <div className="popup">
              <h1 className="popup_header">{selectedCoordinates.name}</h1>
              <p className="popup_paragraph_right">{selectedCoordinates.type}</p>
              <p className="popup_paragraph_left">{selectedCoordinates.languages[0]}</p>
              <p className="popup_paragraph">{selectedCoordinates.summary}</p>

             </div>
         </Popup>)}

         {
           series?.map(series => 
          
            <Marker key={series.id} latitude={series.geometry.coordinates[1]}
          longitude={series.geometry.coordinates[0]}>
              <div className="marker-series"
                
              onClick={
      (e) => {
          e.preventDefault()
          console.log(e)
  setSelectedCoordinates(series)
    store.addSong(selectedCoordinates?.assets[0].audio)
    store.addImage(series.photo)
    store.addName(series.name)
      } }>
                 <RoomIcon />
              </div>
          </Marker>
            )
         } 
       </ReactMapGL>
       </div>
       }  
       </React.Fragment>

    ))

}

export default MapBox