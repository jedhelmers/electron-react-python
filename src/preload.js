// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron')
const { pythonPrint } = require('./channels')

contextBridge.exposeInMainWorld('electronAPI', {
    pythonPrint: (val) => {
        console.log({val})
        return ipcRenderer.sendSync('python-print', val)
    },
    parseJSONObject: (obj) => {
        console.log({obj})
        return JSON.parse(ipcRenderer.sendSync('parse-json-object', obj))
    }
})
