var processParameters = require("./process-parameters");

var mainEngine = {
    start: (args) => {
        processParameters.init(args);
        console.log("Hello 123");
    }
};
module.exports = mainEngine;
