import { useObserver } from 'mobx-react'
import React , {useEffect, useState, useContext} from 'react'
import ReactAudio from 'react-audio-player'
import './Music.css'
import {StoreContext} from '../../store/store' 
import axios from 'axios'


function Music({}) {
  const store = useContext(StoreContext)
 const [data, setData] = useState(null)
 const [music, setMusic] = useState()
 const [duration, setDuration] = useState(null)
  


  useEffect(() =>  {

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
            // let allData = response.data.features.map(el => {
            //   return el 
            //  })
            //  setBothFeatuesAndSeries(allData)
			 setData(features)
		
            //  setData2(allData)

            //  let song = response.data.features.filter(el => {
            //     return el.assets[0]?.audio === store.currentSong
            //    })
         
            //    setSong(song)
            
 })

   
},[])

const handleLoadMetadata = (meta) => {

  const {duration} = meta.target;

 }

      

   return useObserver(() => (
    <div className='Music'>
 
    <ReactAudio 
    className={'audio'}
    src={store.currentSong}
    controls
    autoPlay
    onEnded={() => {
      const Index = store.songIndex + 1
			store.addSongIndex(Index)
			const Value = data[Index] 
			store.addSong(Value?.assets?.[0].audio)
			store.addName(Value.name)
			store.addImage(Value.photo)

    }}
    
  onLoadedMetadata={handleLoadMetadata}
    
    /> 
 </div>
   ))
             
  
}

export default Music
