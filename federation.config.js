const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'shell',

  // Expose shared services for microfrontends
  exposes: {
    './core-layout-service': './shared/core/core-layout/core-layout.service.ts'
  },


  // shared: {
  //   ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  // },

    shared: {
    ...shareAll({}),    // Angular CDK modules for Fractalia components
    '@angular/cdk/bidi': {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto'
    },
    '@angular/cdk/overlay': {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto'
    },
    '@angular/cdk/portal': {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto'
    },    // Fractalia components shared across all microfrontends
    '@fractalia/components': {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto'
    },
    '@fractalia-apps/components': {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto'
    }
  },
  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    // Fractalia dependencies to skip (pero no CDK que lo estamos compartiendo)
    'cropperjs',
    'ng2-charts',
    'chart.js',
    // Add further packages you don't need at runtime
  ],

  // Please read our FAQ about sharing libs:
  // https://shorturl.at/jmzH0

  features: {
    // New feature for more performance and avoiding
    // issues with node libs. Comment this out to
    // get the traditional behavior:
    ignoreUnusedDeps: true
  }
});
