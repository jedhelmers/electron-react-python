const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
import { PythonShell } from 'python-shell'

export default() => {
    ipcMain.on('set-title', (event, title) => {
        // let options = {
        //   mode: 'text',
        //   args: [title]
        // }
        // PythonShell.run(path.join(__dirname, '../py/calc.py'), options, function (err, output) {
        //   console.log(output)
        //   if (err) throw err;
        //   console.log('finished');
        // })
        const webContents = event.sender
        // console.log(webContents)
        const win = BrowserWindow.fromWebContents(webContents)
        win.webContents.send('asynchronous-message', {'SAVED': 'File Saved'});

        win.setTitle(title)
      })
}