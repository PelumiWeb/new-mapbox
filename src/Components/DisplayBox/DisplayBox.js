import React, {useEffect, useState , useContext} from 'react'
import './DisplayBox.css'
import axios from 'axios'
import PlayList from '../PlayList/PlayList'
import MapBox from '../MapBox/MapBox'
import {StoreContext} from '../../store/store'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"



function DisplayBox({displayImage, displayMap, displaySongs}) {

    const store = useContext(StoreContext)


// const [song, setSong] = useState(null)
    const [data2, setData2] = useState(null)
    const [data, setData] = useState(null)
    const [series, setSeries] = useState(null)
   
    
useEffect(() => {

    const url = "https://52-90-82-235.maverickmaven.com/geotourdata/json.cfm?h=-107,37,s,en,3A771765"

    axios({
       method: 'get',
       url,
       responseType: 'stream'
    }).then(response => {
        let features = response.data.features.filter(elem => {
            return  elem.type === 'Feature'
          })
        
             setData(features)
        
 })
 axios.get(url).then(response => {
    const series = response.data.features.filter(elem => {
      return  elem.type === 'Series'
    })
    setSeries(series)
  })

   
},[])

    return (
     <div className={displayImage || displayMap || displaySongs? "display_box display_box-show" : "show_box"}>
         {console.log(series?.[0].photo)}
            <div className={displayImage ? "image image_show" : "image"}>
                {
                    !store.image &&  !series?.[0].photo? 
                    <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={100}
                    width={100}
                 />  :
                <img src={!store.image ? series?.[0].photo : store.image } alt=""/>
                }
            </div>
            <div className={displayMap ? 'Map Map_show' : 'Map'}>
            <MapBox />
            </div>
        <div className={displaySongs ? "play_list play_list-show border" : "play_list border-2"}>
        <PlayList 
         displaySongs={displaySongs}
         data={data}
         series={series}/>
        </div>
       
    </div>

   

    )
}

export default DisplayBox


//rce & rcc