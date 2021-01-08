import { useObserver } from 'mobx-react'
import React , {useEffect, useState, useContext} from 'react'
import ReactAudio from 'react-audio-player'
import './Music.css'
import {StoreContext} from '../../store/store' 
import axios from 'axios'
import {useParams} from 'react-router-dom'



function Music({}) {
  const {id} = useParams()
	console.log(id)
  const store = useContext(StoreContext)
 const [data, setData] = useState(null)
 const [series, setSeries] = useState(null)

 const [music, setMusic] = useState()
 const [duration, setDuration] = useState(null)
  
  useEffect(() => {

  },[])

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
		
       axios.get(url).then(response => {
        const series = response.data.features.filter(elem => {
          return  elem.type === 'Series'
        })
        setSeries(series)
      })
    
            
 })

   
},[])

const handleLoadMetadata = (meta) => {

  const {duration} = meta.target;

 }

      

   return useObserver(() => (

    <div className='Music'>
    <ReactAudio 
    className={'audio'}
    src={!store.currentSong ? series?.[0].assets[0].audio : store.currentSong  }
  
    controls
    autoPlay={false}
    onEnded={() => {
      const Index = 0
			const Value = series[Index] 
			store.addSong(Value?.assets?.[0].audio)
			store.addName(Value.name)
      store.addImage(Value.photo)
    console.log('Ended')

    }}
    
  onLoadedMetadata={handleLoadMetadata}
    
    /> 
 </div>
   ))
             
  
}

export default Music
