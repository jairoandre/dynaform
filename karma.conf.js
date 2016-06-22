module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      {pattern: 'spec/*.js', watched: false}
    ],
    webpackServer: {
      noInfo: true // prevent console spamming when running in Karma!
    },
    preprocessors: { 'spec/*.js': ['webpack'] },
    colors: true,
    reporters: ['spec'],
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: true,
    browsers: ['Chrome']
  });
}