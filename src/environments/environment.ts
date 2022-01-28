// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL: 'http://localhost:8090/restex',
  
  firebaseConfig: {
    apiKey: "AIzaSyDzxcmhCeiwSyjhtsuG4h5wtwGyV6poUJY",
    authDomain: "techzone-74633.firebaseapp.com",
    projectId: "techzone-74633",
    storageBucket: "techzone-74633.appspot.com",
    messagingSenderId: "424177718862",
    appId: "1:424177718862:web:3c0c137feb7e5c5473551f",
    measurementId: "${config.measurementId}"
  },
};




/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
