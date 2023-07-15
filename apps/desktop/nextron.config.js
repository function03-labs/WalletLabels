module.exports = {
  // specify an alternate main src directory, defaults to 'main'
  mainSrcDir: 'main',
  // specify an alternate renderer src directory, defaults to 'renderer'
  rendererSrcDir: '../web',
  // rendererSrcDir: './renderer',

  // main process' webpack config
  webpack: (config, env) => {
    // do some stuff here
    return config
  },
}
