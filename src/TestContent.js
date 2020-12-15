import React, {useContext} from 'react'
import {TestContext} from './Test'
function TestContent() {
    const value = useContext(TestContext)
    return (
        <div>
            <h1>{value}</h1>
        </div>
    )
}

export default TestContent
