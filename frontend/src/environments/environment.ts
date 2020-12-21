// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	// api: "http://apicampanha.siagesc.com.br/api"
	// api: 'https://waitingfor.api.arocweb.com.br/api',
	api: 'http://127.0.0.1:8000/api',
	apiPublic: 'http://127.0.0.1:8000/public',
	apiDominio: 'http://127.0.0.1:8000',
	apiSite: 'http://127.0.0.1:8000',
	// api: 'https://memorizeapi.arocweb.com.br/api',
	// apiPublic: 'https://memorizeapi.arocweb.com.br/public',
	// apiDominio: 'https://memorizeapi.arocweb.com.br',
	// apiSite: 'https://memorizeapi.arocweb.com.br',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
