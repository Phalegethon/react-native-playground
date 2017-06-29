const config = require("./config.js");
const _ = require("lodash");


const isReactNative = _.isBoolean(config.isReactNative);
const language = _.isBoolean(config.defaultChoices.language);
const test = _.isBoolean(config.defaultChoices.test);
const flowTypeDefinitions = _.isBoolean(config.flowTypeDefinitions);
const kitFolder = _.isString(config.paths.kitFolder) && (/[a-zA-Z-_]+/gi).test(config.kitFolder);
const stylesExtension = _.includes([
  "less",
  "scss",
  "js"
], config.stylesExtension);
const styles = _.isBoolean(config.defaultChoices.styles);


if (!isReactNative) {
  throw new Error("isReactNative config must be 'Boolean type");
}

if (!language) {
  throw new Error("Language config must be 'Boolean type");
}

if (!test) {
  throw new Error("Test config must be 'Boolean type");
}

if (!flowTypeDefinitions) {
  throw new Error("flowTypeDefinitions config must be 'Boolean type");
}

if (!kitFolder) {
  throw new Error("KitFolder variable must be string and only match with a-zA-Z-_ pattern.");
}

if (!stylesExtension) {
  throw new Error("stylesExtension config must be one of less, scss or js");
}

if (!styles) {
  throw new Error("Styles config must be 'Boolean type");
}
