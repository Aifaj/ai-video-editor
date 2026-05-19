module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine', '@angular-devkit/build-angular'],

    plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
       require('karma-jasmine-html-reporter'),
        require('@angular-devkit/build-angular/plugins/karma')
    ],

    client: {
        clearContext: false,
        jasmine: {
            random: false
        }
    },

    reporters: ['progress', 'kjhtml'],

    browsers: ['Chrome'],

    autoWatch: true,

    singleRun: false,

    restartOnFileChange: true,

    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 2,
    browserNoActivityTimeout: 60000
  });
};