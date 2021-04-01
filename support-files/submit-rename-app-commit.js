const { spawn } = require('child_process')

const gitAddProcess = spawn('git', ['add', '.'])

gitAddProcess.on('exit', () => spawn('git', ['commit', '-m', 'rename app']))
