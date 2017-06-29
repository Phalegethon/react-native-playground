/* eslint-disable flowtype/require-parameter-type */
/* eslint-disable flowtype/require-return-type */
const fs = require("fs");
const handlebars = require("handlebars");

const componentGenerator = require("./component/index.js");
const containerGenerator = require("./container/index.js");
const viewGenerator = require("./view/index.js");
const formGenerator = require("./form/index.js");
const actionGenerator = require("./action/index");

const config = require("./config.js");
require("./configCheck.js");


// // const routeGenerator = require('./route/index.js');
// // const languageGenerator = require('./language/index.js');

module.exports = (plop) => {
  plop.setGenerator("component", componentGenerator);
  plop.setGenerator("container", containerGenerator);
  plop.setGenerator("view", viewGenerator);
  plop.setGenerator("form", formGenerator);
  plop.setGenerator("action", actionGenerator);
  // // plop.setGenerator('route', routeGenerator);
  // // plop.setGenerator('language', languageGenerator);
  plop.addHelper("directory", (comp) => {
    try {
      fs.accessSync(`${config.paths.container}/${comp}`, fs.F_OK);
      return `containers/${comp}`;
    }
    catch (e) {
      return `components/${comp}`;
    }
  });
  plop.addHelper("curly", (object, open) => (open ? "{" : "}"));
};

handlebars.registerHelper("ifCond", function(a, b, opts) {
  if (a === b) {
    return opts.fn(this);
  }
  else {
    return opts.inverse(this);
  }
});
