// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCgCQNBUkHyJpka5v3maMzzCzZCV7yMw8I',
    authDomain: 'ng-demo-98439.firebaseapp.com',
    databaseURL: 'https://ng-demo-98439.firebaseio.com',
    projectId: 'ng-demo-98439',
    storageBucket: 'ng-demo-98439.appspot.com',
    messagingSenderId: '257318934100'
  }
};
