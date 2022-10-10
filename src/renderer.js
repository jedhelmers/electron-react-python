/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */
// const { ipcRenderer } = require('electron')
// const electron = window.require('electron')
// const { ipcRenderer } = electron
// console.log({ipcRenderer})

import ReactDOM from 'react-dom'
import React, { useEffect, useState } from 'react'
import './index.css'
import './styles/styles.scss'


const Test = ({txt}) => <div>{txt}</div>

function definePrecicion(str) {
    return str.replace(/(result\:\s)/g, '').trim()
}

const App = () => {
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
            Title: <input id="title" value={value} onChange={e => setValue(e.target.value)}/>
            <div className='fr-sb'>
                <button type="button" onClick={click}>Set</button>
                <button type="button" onClick={clickParseJSONObject}>Set</button>
            </div>
            <div className='fr-sb'>
                <h1>Result: {label}</h1>
                <h1>Result 2: {label2}</h1>
            </div>
        </div>
    )
 }

ReactDOM.render(<App />, document.getElementById('root'));

console.log('👋 This message is being logged by "renderer.js", included via webpack');
