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
      message: "Select container that you want to add form component",
      choices: () => containers
    },
    {
      type: "input",
      name: "name",
      message: "Form name in PascalCase format:",
      default: "Form"
    },
    {
      type: "confirm",
      name: "wantTest",
      default: true,
      message: "Do you want to add test files with ava?"
    }
  ],
  actions: (data) => {
    data.config = config;
    const actions = [
      {
        type: "add",
        path: `../src/containers/${data.type}/${config.paths.view}/${data.type}.{{properCase name}}.component.js`,
        templateFile: "./form/form.js.hbs",
        abortOnFail: true
      }
    ];
    if (data.wantTest) {
      // test
      actions.push({
        type: "add",
        path: `../src/containers/${data.type}/${config.paths.test}/${data.type}.{{properCase name}}.component.test.js`,
        templateFile: "./form/test.js.hbs",
        abortOnFail: true
      });
    }

    return actions;
  }
};
