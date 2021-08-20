const fs = require('fs')
const path = require('path')

const installationFilePath = path.join(__dirname, './installation.sh')
const readmeFilePath = path.join(__dirname, '../README.md')
const gitRepoReferenceFilePath = path.join(__dirname, './references/git-repo.json')

const newURL = process.argv[2]
const repoName = require('./references/git-repo.json').value

if (newURL) {
  const newRepoName = newURL.replace('https://github.com/', '').replace('.git', '')

  fs.readFile(installationFilePath, 'utf8', function (err,data) {
    if (err) {
      throw err
    }

    const result = data.replace(new RegExp(repoName, 'g'), newRepoName)

    fs.writeFile(installationFilePath, result, 'utf8', function (err) {
       if (err) {
         throw err
       }

       fs.readFile(readmeFilePath, 'utf8', function (err,data) {
        if (err) {
          throw err
        }

        const result = data.replace(repoName, newRepoName)

        fs.writeFile(readmeFilePath, result, 'utf8', function (err) {
          if (err) {
            throw err
          }

          fs.readFile(gitRepoReferenceFilePath, 'utf8', function (err,data) {
            if (err) {
              throw err
            }

            const result = data.replace(repoName, newRepoName)

            fs.writeFile(gitRepoReferenceFilePath, result, 'utf8', function (err) {
              if (err) {
                throw err
              }
            })
          })
        })
      })
    })
  })
} else {
  console.log('Harap memberi argument package name')
}
