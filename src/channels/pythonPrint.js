const { ipcMain } = require('electron')
const path = require('path')
import { PythonShell } from 'python-shell'

export default() => {
    ipcMain.on('python-print', (event, str, cb) => {
        console.log('BUTTS', cb)
        let options = {
          mode: 'text',
          args: [str]
        }
        PythonShell.run(path.join(__dirname, '../py/calc.py'), options, function (err, output) {
          console.log(output)
          if (err) throw err;
          console.log('finished');
        })
      })
}
