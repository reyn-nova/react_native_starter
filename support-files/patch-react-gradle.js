const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '../node_modules/react-native/react.gradle')

const data = fs.readFileSync(filePath).toString().split('\n') 

data.splice(
  149,
  0,
  `       doLast {
          def moveFunc = { resSuffix ->
              File originalDir = file("$buildDir/generated/res/react/release/\${resSuffix}");

              if (originalDir.exists()) {
                  File destDir = file("$buildDir/../src/main/res/\${resSuffix}");
                  ant.move(file: originalDir, tofile: destDir);
              }
          }

          moveFunc.curry("drawable-ldpi").call()
          moveFunc.curry("drawable-mdpi").call()
          moveFunc.curry("drawable-hdpi").call()
          moveFunc.curry("drawable-xhdpi").call()
          moveFunc.curry("drawable-xxhdpi").call()
          moveFunc.curry("drawable-xxxhdpi").call()
          moveFunc.curry("raw").call()
        }
  `
)

const text = data.join('\n')

fs.writeFile(filePath, text, err => {
  if (err) {
    throw err
  }
})
