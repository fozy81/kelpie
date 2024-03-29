'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'kelpie',
    environment,
    rootURL: '/',
    locationType: 'auto',
    emberPouch: {
      options: {},
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    ENV.emberPouch.options = { adapter: 'memory' };

    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  ENV.remote_couch = 'http://localhost:5984/kelpie-with-containers';
  ENV.local_couch = 'test';
  ENV.authAdapter = 'application';

  if (environment === 'production') {
    ENV.rootURL = '/';
    ENV.remote_couch = `${process.env.remote_couch}/kelpie-with-containers`;
  }
  if (ENV.remote_couch) {
    // @TODO document why `contentSecurityPolicy` is needed, as it does not appear used anywhere else
    var site = 'https://kelpie.netlify.app';
    var remote_couch_hostname = ENV.remote_couch.substring(
      0,
      ENV.remote_couch.indexOf('/', 9)
    );
    ENV.contentSecurityPolicy = {
      'default-src': ["'none'"],
      'connect-src': ["'self' " + remote_couch_hostname, "'self' " + site],
      'style-src': ["'self'", "'unsafe-eval' *", "'unsafe-inline' *"],
      'script-src': ["'self'", "'unsafe-eval' *", "'unsafe-inline' *"],
    };
  }
  ENV.reportOnly = true;
  ENV.delivery = ['header'];
  return ENV;
};
