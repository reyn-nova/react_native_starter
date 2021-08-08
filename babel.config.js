module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          '@components': './sources/components',
          '@helpers': './sources/helpers',
          '@models': './sources/references/models',
          '@navigators': './sources/navigators',
          '@references': './sources/references',
          '@screens': './sources/screens'
        }
      }
    ]
  ]
}
