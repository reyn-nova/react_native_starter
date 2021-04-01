const { spawn } = require('child_process')

if (require('os').platform() == 'darwin') {
  process.chdir('ios')

  const podRepoUpdateProcess = spawn('pod', ['repo', 'update'], {stdio: 'inherit'})

  podRepoUpdateProcess.on('exit', () => {
    const podUpdateProcess = spawn('pod', ['update'], {stdio: 'inherit'})

    podUpdateProcess.on('exit', () => process.chdir('../'))
  })
}
