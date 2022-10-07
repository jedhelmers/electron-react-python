const { app, BrowserWindow, ipcMain } = require('electron')
import { PythonShell } from 'python-shell'

export default() => {
    ipcMain.on('python-print', (event, str) => {
        PythonShell.runString('x=1+1;print(x)', null, function (err) {
          if (err) throw err;
          console.log('finished');
        })
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win.pythonPrint(str)
      })
}
