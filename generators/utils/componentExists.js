/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require("fs");
const path = require("path");
const config = require("../config.js");


const pageComponents = fs.readdirSync(`${path.join(__dirname, "../../", config.paths.container)}`);
const pageContainers = fs.readdirSync(`${path.join(__dirname, "../../", config.paths.component)}`);
const components = pageComponents.concat(pageContainers);

function componentExists(comp) {
  return components.indexOf(comp) >= 0;
}

module.exports = componentExists;
