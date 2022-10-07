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

import ReactDOM from 'react-dom'
import React, { setState } from 'react'
import './index.css'
import './styles/styles.scss'


const Test = ({txt}) => <div>{txt}</div>

const App = () => {
    const click = () => {
        const titleInput = document.getElementById('title')
        const title = titleInput.value
        window.electronAPI.setTitle(title)
        window.electronAPI.testChannel(title)
        window.electronAPI.testChannel2(title)
    }
    return (
        <div className='fc-sb'>
            <h1>This is my React app!</h1>
            <Test txt="butts"/>
            Title: <input id="title"/>
            <button id="btn" type="button" onClick={click}>Set</button>
        </div>
    )
 }

ReactDOM.render(<App />, document.getElementById('root'));

console.log('👋 This message is being logged by "renderer.js", included via webpack');
