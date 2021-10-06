const { spawn } = require('child_process')

if (require('os').platform() == 'darwin') {
  process.chdir('ios')

  const podInstallProcess = spawn('pod', ['install'], {stdio: 'inherit'})

  podInstallProcess.on('exit', () => process.chdir('../')) 
}
