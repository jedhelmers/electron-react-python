const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const pyIntegration = require('./pythonIntegration.js')
const { PythonShell } = require('python-shell')

import {
  setTitle,
  pythonPrint
} from './channels'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  // console.log('WOOOO\n', MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY)
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 900,
    x: 10,
    y: 10,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
    },
  });


  ipcMain.on('parse-json-object', (event, value) => {
    let options = {
      mode: 'text',
      args: [value]
    }

    PythonShell.run(path.join(__dirname, '../py/parseJSONobject.py'), options, (err, res) => {
      if (err) throw err
      console.log('parserJSONObject', res)
      event.returnValue = res[0]
    })
  })

  ipcMain.on('python-print', (event, value) => {
    let options = {
      mode: 'text',
      args: [value]
    };
  
    PythonShell.run(path.join(__dirname, '../py/calc.py'), options, function (err, results) {
      if (err) throw err;
      console.log('results: ', results);
      event.returnValue = results[0]
    });
  })

  setTitle()

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};


// app.whenReady().then(() => {
//   createWindow()
  
//   app.on('activate', function () {
//     if (BrowserWindow.getAllWindows().length === 0) createWindow()
//   })
// })


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {
    app.quit();
  // }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
