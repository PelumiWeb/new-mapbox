import React, { useState, useContext , useEffect } from 'react'
import './PlayList.css'
import WordLimit from 'react-word-limit'
import {StoreContext} from '../../store/store'
import { useObserver } from 'mobx-react'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import axios from 'axios'


function PlayList({displaySongs,data, series}) {
    const [seriesDuration, setSeriesDuration] = useState(null)
    const [featuresDuration, setFeaturesDuration] = useState([])
    const durationArray = []

    const store = useContext(StoreContext)
   const active = "red"
    useEffect( () => {
        // const url = "https://52-90-82-235.maverickmaven.com/geotourdata/json.cfm?h=-107,37,s,en,3A771765"

    }, [])


    const currentSeries = series?.map(series => {
            const audio = document.createElement('audio')
            audio.src = series.assets[0].audio
       audio.addEventListener('loadedmetadata', function () {
                const duration = audio.duration
                setSeriesDuration(Math.floor(duration))      
            })
    })
 
    useEffect(() => {
        const currentData = data?.map(data => {
            const audio = document.createElement('audio')
            audio.src = [data.assets[0].audio]
       audio.addEventListener('loadedmetadata', function () {
                const duration = audio.duration
                setFeaturesDuration([duration])   
                // console.log(duration)
                // durationArray.push(duration)
             
            })
    })
  
    }, [])
    
    
   
    
   
   

  
    return useObserver(() => (
      
        <React.Fragment> 
             {
                !data ?  
             <Loader
                type="ThreeDots"
                color="#00BFFF"
                height={100}
                width={100}
        
             /> :
        <div className={displaySongs ? "Playlist Playlist_show" : "Playlist"}>
         <ul className="Paylist-list">    
               
         {series?.map((series, index) => {
             return (
                <li 
                className="series_playlist"
                onClick={(e) => {
                    e.preventDefault()
                 
                    store.addSong(series.assets[0].audio)
                    store.addImage(series.photo)
                    store.addName(series.name)
                    store.addSongIndex(index - 1)
                }}
                key={series?.id}>
                <div className="plItem">
                   <span className="trackNumber">{index}</span> 
                   <span className="trackTitle">
                      <WordLimit limit={35}>
                       {series ? series.name : "word"}
                       </WordLimit> 
                    </span> 
                
                 </div>
                 </li>
             )
         })}
            
             {data?.map((data, index) => {
                 return(
                  <li 
                    //  
                  onClick={(e) => {
                    e.preventDefault()
                      store.addSong(data.assets[0].audio)
                      store.addImage(data.photo)
                      store.addName(data.name)
                      store.addSongIndex(index)
                  }}
                  className={store.currentSong === data.assets[0].audio ? "playlistActive" : undefined }
                  key={data?.id}>
                  <div className="plItem">
                     <span className="trackNumber">{index + 1}</span> 
                     <span className="trackTitle">
                     <WordLimit limit={35}>
                         {data ? data.name : "word"}
                         </WordLimit>
                      </span> 
                   </div>
                   </li>
                 )
             } 
              )}
        </ul>   
    </div>
        }
    </React.Fragment>
    ))
   
}

export default PlayList
