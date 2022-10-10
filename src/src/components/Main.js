import React, { useState } from 'react'
import Test from './Test'

function definePrecicion(str) {
    return str.replace(/(result\:\s)/g, '').trim()
}

const Main = () => {
    const [value, setValue] = useState('2 * 5')
    const [label, setLabel] = useState('')

    const click = () => {
        const val = window.electronAPI.pythonPrint(value)
        setLabel(definePrecicion(val))
    }

    const [label2, setLabel2] = useState('')

    const clickParseJSONObject = () => {
        const val = window.electronAPI.parseJSONObject(JSON.stringify({
            a: 22,
            b: 23
        }))
        console.log(val)
        setLabel2(val.sum)
    }

    return (
        <div className='fc-sb'>
            <h1>This is my React app!</h1>
            <Test txt="butts"/>
            <h4 className='m-0'>Title: </h4>
            <input className='p-10' id="title" value={value} onChange={e => setValue(e.target.value)}/>
            <div className='fr-sb'>
                <button className='p-10 mt-10' type="button" onClick={click}>Set</button>
                <button className='p-10 mt-10' type="button" onClick={clickParseJSONObject}>JSON</button>
            </div>
            <div className='fr-sb'>
                <h1>Result: {label}</h1>
                <h1>Result 2: {label2}</h1>
            </div>
        </div>
    )
}

export default Main