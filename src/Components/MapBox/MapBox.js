import React, {useState,useEffect,useContext} from 'react'
import ReactMapGL, {Source, Layer, Marker, Popup} from 'react-map-gl'
import axios from 'axios'
import './MapBox.css'
import RoomIcon from '@material-ui/icons/Room';
import {StoreContext} from '../../store/store'

import { useObserver } from 'mobx-react';


function MapBox () {
    const store = useContext(StoreContext)
  
    const [map, setMap] = useState(null)
    const [viewport, setViewport] = useState({
        width: 480,
        height: 290,
        latitude: 37.93778,
        longitude: -107.81136,
        zoom: 15,
    })
   
    const accessKey ='pk.eyJ1Ijoid3d3bWFzdGVyMSIsImEiOiJjazZmbmxhYngwYjQxM2xtdDdwMjJzYjdnIn0._QtAdUTg9NtC9_R8Caq6Ng'

    const [data, setData] = useState(null)
    const [selectedCoordinates, setSelectedCoordinates] = useState(null)
    const [series, setSeries] = useState(null)
   map?.on('render', () => {
   console.log('render')
   })

   map?.on('mousedown', 'features', function() {
     console.log('clicked')
   })
   
    useEffect(() => {
        const url = "https://52-90-82-235.maverickmaven.com/geotourdata/json.cfm?h=-107,37,s,en,3A771765"

        axios.get(url).then(response => {
      const features = response.data.features.filter(elem => {
        return  elem.type === 'Feature'
      })
      setData(features)
    })

        axios.get(url).then(response => {
            const series = response.data.features.filter(elem => {
                return elem.type === 'Series'
            } )
            setSeries(series)
        })

}, [setData])


    return useObserver(() => (
        <React.Fragment>
            
            
             {/* data ? <div class="loader"></div> : */}
        {/* <div> */}
        {/* <ReactMapGL 
      {...viewport}
      mapboxApiAccessToken={accessKey}
      mapStyle='mapbox://styles/mapbox/dark-v10'
      onViewportChange={viewport => {
          setViewport(viewport)
      }} >
        {console.log(data && (data.map(data => data.geojson)))}
       {data?.map(data => 
          (<Marker key={data.id} latitude={data.geometry.coordinates[1]}
          longitude={data.geometry.coordinates[0]}>
              <div className="marker"
              onClick={
      (e) => {
          e.preventDefault()
  setSelectedCoordinates(data)
    store.addSong(selectedCoordinates?.assets[0].audio)
    store.addImage(data.photo)
    store.addName(data.name)
      } }> */}
                 {/* <Source  type='geojson' data={data.geometry}>
          
          <Layer
          
            type='line'
            layout= {{
              'line-join': 'round',
              'line-cap' : 'round'
            }}
            paint={{
              'line-color': 'green',
                'line-width': 8
              }} 
        >
            
              </Layer>
        </Source>
        Heloo
       */}
              {/* </div>
          </Marker>)
         )}

         {selectedCoordinates &&(<Popup 

         latitude={selectedCoordinates.geometry.coordinates[1]}
         longitude={selectedCoordinates.geometry.coordinates[0]}
         onClose={(e) =>{
             setSelectedCoordinates(null)
         }}
         >
             <div>
             </div>
         </Popup>)}
       </ReactMapGL>
       </div> */}

  {
       <ReactMapGL
       onClick={{
         'type' : 'mousedown'
       }}
       mapStyle='mapbox://styles/mapbox/dark-v10'
       mapboxApiAccessToken={accessKey}
       onViewportChange={viewport => {
        setViewport(viewport)
    }}
       {...viewport}
       ref={ref => ref && setMap(ref.getMap())}
    > 
      {/* {console.log(map)} */}

    
             {
              (data && (data?.map((data, index) =>  
        <div onClick={console.log}>
        <Source 
    
        key={index} type='geojson' data={data.geojson}>
          
          <Layer
          
            type='line'
            layout= {{
              'line-join': 'round',
              'line-cap' : 'round'
            }}
            paint={{
              'line-color': 'green',
                'line-width': 8
              }} 
        >
            
              </Layer>
        </Source>
        </div>
        
     )))}

          {
            series && (series.map(series => 
            <Source id='series' type='geojson' data={series.geojson} />
            ))
          }
            {console.log(series?.[0].geojson)}
         <Layer  
         source='series'
         id='series'
         type='fill'
         paint={{
          'fill-color': '#b8b818',
          'fill-opacity': 0.2
         }}
         /> 
            ))
              {/* <Source onClick={console.log('clicked')} id='main' type='geojson' data={data?.[0].geojson}/>
              <Layer 
              source='main'
              id='main'
               type='line'
               layout= {{
                 'line-join': 'round',
                 'line-cap' : 'round'
               }}
               paint={{
                 'line-color': 'red',
                   'line-width': 8
                 }} 
              /> */}
        </ReactMapGL> } 
    </React.Fragment>

    ))

}

export default MapBox