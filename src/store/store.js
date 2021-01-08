import React, {createContext} from 'react'
import {useLocalStore} from 'mobx-react'

export const StoreContext = createContext()

export const StoreProvider = ({children}) => {
    const store = useLocalStore(() => ({
        currentSong: null,
        addSong: currentSong => { 
            store.currentSong = currentSong
        },
        image: null,
        addImage: image => {
            store.image = image
        },
        name: "",
        addName: name => {
            store.name = name
        },
        songIndex: null,
        addSongIndex: songIndex => {
            store.songIndex = songIndex
        },
        data: null,
        addData: data => {
            store.data = data
        },
        duration: null,
        addDuration: duration => {
            store.duration = duration
        },
        playing: false,
        addPlaying: playing => {
            store.playing = playing
        }
        

    }));

        return(
            <StoreContext.Provider value={store}>
                        {children}
            </StoreContext.Provider>
        );
        
};


