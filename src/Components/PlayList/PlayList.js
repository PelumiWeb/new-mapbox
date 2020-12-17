import React, { useState, useContext , useEffect } from 'react'
import './PlayList.css'
import WordLimit from 'react-word-limit'
import {StoreContext} from '../../store/store'
import { useObserver } from 'mobx-react'


function PlayList({displaySongs,data}) {
    const [playList, setPlayList] = useState(null)
    const store = useContext(StoreContext)
    const [duration, setDuration] = useState(null)
    const [currentSongIndex, setCurrentSongIndex] = useState(null) 
    useEffect( () => {
        const audio = document.createElement('audio')
        // data?.map(data =>(console.log(audio.src = data?.assets[0].audio
            
            
            
            // )))
       function getDuration (){
       const duration = audio.duration
       console.log(duration)
       setDuration(duration)
       }
       audio.addEventListener('loadedmetadata', getDuration)
    }, [])
  
      
    return useObserver(() => (
        <React.Fragment> 
             {
                !data ? <div class="loader"></div> :
        <div className={displaySongs ? "Playlist Playlist_show" : "Playlist"}>
         <ul className="Paylist-list">    
             {data?.map((data, index) => (
             <li 
             onClick={() => {
                 store.addSong(data.assets[0].audio)
                 store.addImage(data.photo)
                 store.addName(data.name)
                 store.addSongIndex(index)
             }}
             key={data?.id}>
             <div className="plItem">
                <span className="trackNumber">{index + 1}</span> 
                <span className="trackTitle">
                   <WordLimit limit={15}>
                    {data ? data.name : "word"}
                    </WordLimit> 
                 </span> 
                <span className="trackTDuration">
                   {}
                </span>    
              </div>
              {/* {console.log(data)} */}
              </li>)
              )}
        </ul>   
    </div>
        }
    </React.Fragment>
    ))
   
}

export default PlayList
