// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  leagueitServiceUrl: 'http://localhost:8080',

  // Signup Form
  maxPasswordLength: 255,
  maxUsernameLength: 255,
  usernameRegex: "[A-Za-z1-9_\.]+",

  // Create League Form
  maxLeagueNameLength: 255,
  leagueNameRegex: "[A-Za-z1-9_\.]+",
  maxLeagueDescriptionLength: 1000,
  ratingStrategies: ['Scaling Elo'],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
