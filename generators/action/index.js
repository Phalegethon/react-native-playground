/* eslint-disable flowtype/require-return-type */
/* eslint-disable flowtype/require-parameter-type */

const fs = require("fs");
const path = require("path");
const _ = require("lodash");
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
  description: "Add an action to existing container with reducer & flow & constant",
  prompts: [
    {
      type: "list",
      name: "type",
      message: "Select container that you want to add action",
      choices: () => containers
    },
    {
      type: "input",
      name: "name",
      message: "View action name in PascalCase, camelCase, snake_case or kebab-case format:",
      default: "request-start"
    },
    {
      type: "input",
      name: "props",
      message: "Type property names separated with commas. E.G.: loading: boolean, list: Array, user: Object'"
    }
  ],
  actions: (data) => {
    data.config = config;
    const propsArray = _.compact(
      _.map(
        _.split(
          _.replace(data.props, /[\s\t]+/gi, ""),
          ","
        ),
        propItem =>
          _.split(
            propItem,
            ":"
          )
      )
    );
    data.props = propsArray;
    const actions = [

      // add constant
      {
        type: "modify",
        path: `../src/containers/${data.type}/${data.type}.constants.js`,
        pattern: /(.*### GENERATED-CONSTANT ###.*)/gi,
        template: `$1
  {{constantCase name}}: "{{constantCase type}}/{{constantCase name}}",`
      },

      // add action function
      {
        type: "modify",
        path: `../src/containers/${data.type}/${data.type}.actions.js`,
        pattern: /(.*### GENERATED-ACTION ###.*)/gi,
        template: `$1
export const {{camelCase name}} = ({{#each props}}{{camelCase this}}{{#if @last}}{{else}}, {{/if}}{{/each}}){{#if config.flowTypeDefinitions}}: {{properCase name}}Type{{/if}} => {
  return {
    type: {{constantCase type}}.{{constantCase name}}{{#if props.length}},{{/if}}
    {{#each props}}
    {{camelCase this}}{{#if @last}}{{else}},{{/if}}
    {{/each}}
  };
};


`
      },

      // add reducer function
      {
        type: "modify",
        path: `../src/containers/${data.type}/${data.type}.reducer.js`,
        pattern: /(.*### GENERATED-REDUCER ###.*)/gi,
        template: `$1
    case {{constantCase type}}.{{constantCase name}}:
      return {
        ...state{{#if props.length}},{{/if}}
        {{#each props}}
        {{camelCase this}}: action.{{camelCase this}}{{#if @last}}{{else}},{{/if}}
        {{/each}}
      };


`
      }
    ];

    if (config.flowTypeDefinitions) {
      actions.push(
        {
          type: "modify",
          path: `../${config.paths.container}/${data.type}/${data.type}.flow-types.js`,
          pattern: /(.*### GENERATED-TYPE ###.*)/gi,
          template: `$1
export type {{properCase name}}Type = {
  type: "{{constantCase type}}/{{constantCase name}}";
  {{#each props}}
  {{#each this}}{{#if @last}}{{this}};{{else}}{{camelCase this}}: {{/if}}{{/each}}
  {{/each}}
};


`
        }
      );


      actions.push(
        // add action type
        {
          type: "modify",
          path: `../src/containers/${data.type}/${data.type}.actions.js`,
          pattern: /(.*### IMPORTED-TYPE ###.*)/gi,
          template: `$1
  {{properCase name}}Type,`
        }
      );
    }

    return actions;
  }
};
