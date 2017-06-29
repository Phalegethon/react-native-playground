/* eslint-disable flowtype/require-parameter-type */
/* eslint-disable flowtype/require-return-type */

const componentExists = require("../utils/componentExists");
const config = require("../config.js");


module.exports = {
  description: "Add a container component",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Component name in PascalCase format:",
      default: "Home",
      validate: (value) => {
        if ((/.+/).test(value)) {
          return componentExists(value) ? "A component or container with this name already exists" : true;
        }
        return "The name is required";
      }
    },
    {
      type: "confirm",
      name: "wantRedux",
      default: true,
      message: "Do you want to add contant & action & reducer & saga for Redux?"
    },
    {
      type: "confirm",
      name: "wantStyles",
      default: config.defaultChoices.styles,
      message: "Do you want to add scss style file to container folder?"
    },
    {
      type: "confirm",
      name: "wantLang",
      default: config.defaultChoices.language,
      message: "Do you want to language file for localization?"
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
    // Generate index.js and index.test.js
    const actions = [
      {
        type: "add",
        path: "../{{config.paths.container}}/{{properCase name}}/{{properCase name}}.container.js",
        templateFile: "./container/container.js.hbs",
        abortOnFail: true
      }
    ];


    if (data.wantTest) {
      // test
      actions.push({
        type: "add",
        path: "../{{config.paths.container}}/{{properCase name}}/{{config.paths.test}}/{{properCase name}}.container.test.js",
        templateFile: "./container/container.test.js.hbs",
        abortOnFail: true
      });
    }


    if (data.wantStyles) {
      // styles
      actions.push({
        type: "add",
        path: `../{{config.paths.container}}/{{properCase name}}/{{properCase name}}.styles.${config.stylesExtension}`,

        templateFile: "./container/styles.hbs",
        abortOnFail: true
      });
    }

    if (data.wantLang) {
      // language
      actions.push({
        type: "add",
        path: "../{{config.paths.container}}/{{properCase name}}/{{properCase name}}.lang.js",
        templateFile: "./container/lang.js.hbs",
        abortOnFail: true
      });
    }


    // If they want actions and a reducer, generate actions.js, constants.js,
    // reducer.js and the corresponding tests for actions and the reducer
    // Actions
    if (data.wantRedux) {
      actions.push({
        type: "add",
        path: "../{{config.paths.container}}/{{properCase name}}/{{properCase name}}.actions.js",
        templateFile: "./container/actions.js.hbs",
        abortOnFail: true
      });

      if (data.wantTest) {
        actions.push({
          type: "add",
          path: "../{{config.paths.container}}/{{properCase name}}/{{config.paths.test}}/{{properCase name}}.actions.test.js",
          templateFile: "./container/actions.test.js.hbs",
          abortOnFail: true
        });
      }

      // Constants
      actions.push({
        type: "add",
        path: "../{{config.paths.container}}/{{properCase name}}/{{properCase name}}.constants.js",
        templateFile: "./container/constants.js.hbs",
        abortOnFail: true
      });

      if (config.flowTypeDefinitions) {
        // Flow types
        actions.push({
          type: "add",
          path: "../{{config.paths.container}}/{{properCase name}}/{{properCase name}}.flow-types.js",
          templateFile: "./container/flow-types.js.hbs",
          abortOnFail: true
        });
      }

      // add reducer
      actions.push({
        type: "modify",
        path: "../{{config.paths.rootReducer}}",
        pattern: /(.*### INJECTED-REDUCER ###.*)/gi,
        template: config.isReactNative ?
          "$1\r\n  {{camelCase name}}: {{camelCase name}}Reducer," :
          "$1\r\n  {{camelCase name}}: filterActions({{camelCase name}}Reducer, _.values({{constantCase name}})),"
      });
      actions.push({
        type: "modify",
        path: "../{{config.paths.rootReducer}}",
        pattern: /(.*### IMPORTED-REDUCER ###.*)/gi,
        template: '$1\r\nimport {{camelCase name}}Reducer from "../containers/{{properCase name}}/{{properCase name}}.reducer";'
      });
      actions.push({
        type: "modify",
        path: "../{{config.paths.rootReducer}}",
        pattern: /(.*### IMPORTED-CONSTANT ###.*)/gi,
        template: '$1\r\nimport {{constantCase name}} from "../containers/{{properCase name}}/{{properCase name}}.constants";'
      });

      // add saga
      actions.push({
        type: "modify",
        path: "../{{config.paths.rootSaga}}",
        pattern: /(.*### INJECTED-SAGA ###.*)/gi,
        template: "$1\r\n      fork({{camelCase name}}Saga),"
      });
      actions.push({
        type: "modify",
        path: "../{{config.paths.rootSaga}}",
        pattern: /(.*### IMPORTED-SAGA ###.*)/gi,
        template: '$1\r\nimport {{camelCase name}}Saga from "../containers/{{properCase name}}/{{properCase name}}.saga";'
      });

      // Reducer
      actions.push({
        type: "add",
        path: "../{{config.paths.container}}/{{properCase name}}/{{properCase name}}.reducer.js",
        templateFile: "./container/reducer.js.hbs",
        abortOnFail: true
      });
      if (data.wantTest) {
        actions.push({
          type: "add",
          path: "../{{config.paths.container}}/{{properCase name}}/{{config.paths.test}}/{{properCase name}}.reducer.test.js",
          templateFile: "./container/reducer.test.js.hbs",
          abortOnFail: true
        });
      }

      // Sagas
      actions.push({
        type: "add",
        path: "../{{config.paths.container}}/{{properCase name}}/{{properCase name}}.saga.js",
        templateFile: "./container/saga.js.hbs",
        abortOnFail: true
      });
      if (data.wantTest) {
        actions.push({
          type: "add",
          path: "../{{config.paths.container}}/{{properCase name}}/{{config.paths.test}}/{{properCase name}}.saga.test.js",
          templateFile: "./container/saga.test.js.hbs",
          abortOnFail: true
        });
      }
    }

    return actions;
  }
};
