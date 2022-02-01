'use strict';

module.exports = function (/* environment, appConfig */) {
  // See https://zonkyio.github.io/ember-web-app for a list of
  // supported properties

  return {
    name: 'kelpie',
    short_name: 'kelpie',
    description: '',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/images/unicorn-1.png',
        sizes: '256x256',
      },
    ],
    ms: {
      tileColor: '#fff',
    },
  };
};
