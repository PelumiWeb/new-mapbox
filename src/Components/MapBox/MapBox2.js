import React, {useState,useEffect,useContext} from 'react'
import ReactMapGL, {Source, Layer, Marker } from 'react-map-gl'

// import ReactMapboxGl, { Layer, Feature, Source } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
 

// import MapGL from '@urbica/react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios'
import './MapBox.css'
import RoomIcon from '@material-ui/icons/Room';
import {StoreContext} from '../../store/store'

import { observer, useObserver } from 'mobx-react';
import { LngLat } from 'mapbox-gl';


function MapBox () {
    const store = useContext(StoreContext)
  
   
    const [viewport, setViewport] = useState({
        width: 480,
        height: 290,
        latitude: 37.93778,
        longitude: -107.81136,
        zoom: 15,
    })

    const accessKey ='pk.eyJ1Ijoid3d3bWFzdGVyMSIsImEiOiJjazZmbmxhYngwYjQxM2xtdDdwMjJzYjdnIn0._QtAdUTg9NtC9_R8Caq6Ng'
    const [data, setData] = useState(null)
    const [features, setFeatures] = useState(null)
    const [selectedCoordinates, setSelectedCoordinates] = useState(null)
    const [series, setSeries] = useState(null)

    // useEffect(() => {
    //   let url = true
    //      url = "https://52-90-82-235.maverickmaven.com/geotourdata/json.cfm?h=-107,37,s,en,3A771765"
    //     if (url) {
    //     axios.get(url).then(response => {
    //   const features = response.data.features.filter(elem => {
    //     return  elem.type === 'Feature'
    //   })
    //   setFeatures(features)
    // })

    //     axios.get(url).then(response => {
    //         const series = response.data.features.filter(elem => {
    //             return elem.type === 'Series'
    //         } )
    //         setSeries(series)
    //     })

        // axios.get(url).then(response => {
        // const allData =   response.data.features.map(allData => allData
        // )
        // setData(allData)
        // })
      // }
        // return function cleanup() {
        //  url = false
        // }
 

// }, [])
        

// const getCursor = ({isHovering, isDragging}) => {
//   return isHovering ? 'pointer' : 'default' ;
// }
      

    return useObserver(() => (
        <React.Fragment>
            
            
             {/* data ? <div class="loader"></div> : */}
  {
       <ReactMapGL
       mapStyle='mapbox://styles/mapbox/dark-v10'
       mapboxApiAccessToken={accessKey}   
       onViewportChange={viewport => {
        setViewport(viewport)
    }}
       {...viewport}

    // onClick={(e) => {
    //   e.preventDefault()
    //   const url = "https://52-90-82-235.maverickmaven.com/geotourdata/json.cfm?h=-107,37,s,en,3A771765"
    //   axios.get(url).then(response => {
    //    const data =  response.data.features.filter(allData => {

    //    let longLat = (allData.geojson?.geometry?.coordinates[0].map(data =>  parseFloat(data?.toFixed(3))))
    //    let lnglat = (e.lngLat.map(lnglat => parseFloat(lnglat.toFixed(3))))
    //     // console.log(longLat, lnglat)
    //     let [long, lat] = longLat
    //     let [lng, lati] = lnglat

    //     if (long, lat === lng, lati) {
    //       console.log(true)
    //     }
    //     else {
    //       console.log(false)

    //     }
    //     })
       
        
    //   })
     
    // }}
    // mapOptions={}
    
   
    // getCursor={getCursor}
      //  ref={ref => ref && setMap(ref.getMap())}
      //  style={{
      //    'cursor' : 'pointer',
      //  }}
    >     
        <Source>
        </Source>
        </ReactMapGL> } 
    </React.Fragment>

    ))



}

export default MapBox