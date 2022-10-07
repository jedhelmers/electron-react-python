const { ModulesOption } = require('@babel/preset-env/lib/options');
var fs = require('fs')
// console.log('\n\n', fs)
function sendToPython() {
  var python = require('child_process').spawn('python', ['./py/calc.py', input.value]);
  python.stdout.on('data', function (data) {
    console.log("Python response: ", data.toString('utf8'));
    result.textContent = data.toString('utf8');
  });

  python.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  python.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

}
