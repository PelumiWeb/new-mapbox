import React, {useEffect, useState , useContext} from 'react'
import './DisplayBox.css'
import axios from 'axios'
import PlayList from '../PlayList/PlayList'
import MapBox from '../MapBox/MapBox'
import {StoreContext} from '../../store/store'



function DisplayBox({displayImage, displayMap, displaySongs}) {

    const store = useContext(StoreContext)


// const [song, setSong] = useState(null)
    const [data2, setData2] = useState(null)
    const [data, setData] = useState(null)
    const [currentData, setCurrentData] = useState(null)
   
    
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
            let Series = response.data.features.filter(elem => {
                    return  elem.type === 'Series'
                })
            let allData = response.data.features.map(el => {
              return el 
             })
            //  setBothFeatuesAndSeries(allData)
             setData(features)
            //  setData2(allData)

             let song = response.data.features.filter(el => {
                return el.assets?.[0]?.audio === store.currentSong
               })

            //    setSong(song)
            
 })

   
},[])

    return (
     <div className={displayImage || displayMap || displaySongs? "display_box display_box-show" : "show_box"}>
            <div className={displayImage ? "image image_show" : "image"}>
                <img src={store.image ? store.image : "https://boximg-420.s3.amazonaws.com/BF42C786A23049F7B09BE06378B16A5D_07022020.jpg"} alt=""/>
            </div>
            <div className={displayMap ? 'Map Map_show' : 'Map'}>
            <MapBox />
            </div>
        <div className={displaySongs ? "play_list play_list-show" : "play_list"}>
        <PlayList 
         displaySongs={displaySongs}
         data={data}/>
        </div>
       
    </div>

   

    )
}

export default DisplayBox


//rce & rcc