module.exports = {
  isReactNative: true,
  stylesExtension: "js", // less, scss, js
  flowTypeDefinitions: true,
  defaultChoices: {
    language: false,
    test: false,
    styles: true
  },
  paths: {
    kitFolder: "myk",
    test: "test",
    view: "view",
    container: "src/containers",
    component: "src/components",
    rootSaga: "src/sagas/rootSaga.js",
    rootReducer: "src/redux/rootReducer.js"
  }
};
