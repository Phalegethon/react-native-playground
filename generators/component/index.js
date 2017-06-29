/* eslint-disable flowtype/require-parameter-type */
/* eslint-disable flowtype/require-return-type */

const componentExists = require("../utils/componentExists");
const config = require("../config.js");


module.exports = {
  description: "Add an unconnected component",
  prompts: [
    {
      type: "list",
      name: "type",
      message: "Select the type of component",
      default: "Add new Stateless Component",
      choices: () => [
        "Add new ES6 Class",
        "Add new Stateless Component"/*,
        "Add new Stateless Component to existing Container",
        "Add new Form Component to existing Container"*/
      ]
    },
    {
      type: "input",
      name: "name",
      message: "Component name in PascalCase format:",
      default: "Button",
      validate: (value) => {
        if ((/.+/).test(value)) {
          return componentExists(value) ? "A component or container with this name already exists" : true;
        }

        return "The name is required";
      }
    },
    {
      type: "confirm",
      name: "wantStyles",
      default: config.defaultChoices.styles,
      message: "Do you want to add scss style file to component folder?"
    },
    {
      type: "confirm",
      name: "wantLang",
      default: config.defaultChoices.language,
      message: "Do you want to add language file to component folder?"
    },
    {
      type: "confirm",
      name: "wantTest",
      default: config.defaultChoices.test,
      message: "Do you want to test file to component folder?"
    }
  ],
  actions: (data) => {
    data.config = config;
    let componentTemplate, componentOrContainerPath, testTemplate;

    switch (data.type) {
      case "Add new ES6 Class":
        componentTemplate = "./component/es6/es6.js.hbs";
        testTemplate = "./component/es6/test.js.hbs";
        componentOrContainerPath = config.paths.component;
        break;

      case "Add new Stateless Component":
        componentTemplate = "./component/stateless/stateless.js.hbs";
        testTemplate = "./component/stateless/test.js.hbs";
        componentOrContainerPath = config.paths.component;
        break;

      default:
        componentTemplate = "./component/stateless/stateless.js.hbs";
        componentOrContainerPath = config.paths.component;
    }

    const actions = [
      {
        type: "add",
        path: `../${componentOrContainerPath}/{{properCase name}}/{{properCase name}}.component.js`,
        templateFile: componentTemplate,
        abortOnFail: true
      }
    ];

    if (data.wantTest) {
      actions.push({
        type: "add",
        path: `../${componentOrContainerPath}/{{properCase name}}/tests/{{properCase name}}.component.test.js`,
        templateFile: testTemplate,
        abortOnFail: true
      });
    }
    if (data.wantStyles) {
      actions.push({
        type: "add",
        path: `../${componentOrContainerPath}/{{properCase name}}/{{properCase name}}.styles.${config.stylesExtension}`,
        templateFile: "./component/styles.hbs",
        abortOnFail: true
      });
    }

    if (data.wantLang && data.type === "Add new ES6 Class") {
      actions.push({
        type: "add",
        path: `../${componentOrContainerPath}/{{properCase name}}/{{properCase name}}.lang.js`,
        templateFile: "./component/lang.js.hbs",
        abortOnFail: true
      });
    }

    return actions;
  }
};
