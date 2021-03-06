// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// Replace the core 'test' with the name of your core.
// Replace the sourceSchemaField with the name of the field that contains the text to cluster.

export const environment = {
  production: false,
  server: "http://localhost:8983/",
  core1: "globomantics",
  sourceSchemaField1: "name",
  sourceSchemaField1a: "manu",
  sourceSchemaField1b: "cat",
  sourceFacetsField1: "cat",
};
