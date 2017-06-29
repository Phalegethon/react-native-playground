/* eslint-disable flowtype/require-parameter-type */
/* eslint-disable flowtype/require-return-type */

const fs = require("fs");
const path = require("path");
const config = require("../config.js");


let containers = [];
const srcPath = `${path.join(__dirname, "../../", config.paths.container)}`;
fs.readdir(srcPath, (err, items) => {
  if (err) {
    console.log("err ", err);
  }
  containers = items;
});

module.exports = {
  description: "Add a view component to existing container",
  prompts: [
    {
      type: "list",
      name: "type",
      message: "Select container that you want to add view file",
      choices: () => containers
    },
    {
      type: "input",
      name: "name",
      message: "View name in PascalCase format:",
      default: "Section"
    },
    {
      type: "confirm",
      name: "wantStyles",
      default: config.defaultChoices.styles,
      message: "Do you want add scss style file to component folder?"
    },
    {
      type: "confirm",
      name: "wantTest",
      default: config.defaultChoices.test,
      message: "Do you want to add test files with ava?"
    }
  ],
  actions: (data) => {
    data.config = config;
    const actions = [
      {
        type: "add",
        path: `../{{config.paths.container}}/${data.type}/${config.paths.view}/${data.type}.{{properCase name}}.component.js`,
        templateFile: "./view/view.js.hbs",
        abortOnFail: true
      }
    ];

    if (data.wantStyles) {
      actions.push({
        type: "add",
        path: `../{{config.paths.container}}/${data.type}/${config.paths.view}/${data.type}.{{properCase name}}.styles.${config.stylesExtension}`,
        templateFile: "./component/styles.hbs",
        abortOnFail: true
      });
    }
    if (data.wantTest) {
      actions.push({
        type: "add",
        path: `../{{config.paths.container}}/${data.type}/${config.paths.test}/${data.type}.{{properCase name}}.component.test.js`,
        templateFile: "./view/test.js.hbs",
        abortOnFail: true
      });
    }

    return actions;
  }
};
