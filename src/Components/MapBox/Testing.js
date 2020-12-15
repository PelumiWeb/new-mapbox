import React, {useContext} from 'react'
import {DataContext} from './MapBox'

function Testing() {
    const value = useContext(DataContext)
    return (
        <div>
           <h1>{value}</h1>
        </div>
    )
}

export default Testing
