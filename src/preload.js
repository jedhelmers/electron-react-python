// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    pythonPrint: (title) => ipcRenderer.send('python-print', title),
    setTitle: (title) => ipcRenderer.send('set-title', title),
    testChannel: (str) => ipcRenderer.send('test-channel', str),
    testChannel2: (str) => ipcRenderer.send('test-channel2', str)
})
