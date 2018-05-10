//https://nodejs.org/api/dns.html
const dns = require('dns');

function processParamAsArray(arg) {
    //
}
function processParamAsScalar(arg) {
    //
}

var config = {
    validParameters: {
        'TARGET_IP' : {
            validate: (arg) => {},
            processFunction: processParamAsArray,
            description: '',
            defValue: []
        },
        'TARGET_HOST' : {
            validate: (arg) => {},
            processFunction: processParamAsArray,
            description: '',
            defValue: []
        },
        'HTTP_PORT' : {
            validate: (arg) => {},
            processFunction: processParamAsArray,
            description: '',
            defValue: [80]
        },
        'HTTPS_PORT' : {
            validate: (arg) => {},
            processFunction: processParamAsArray,
            description: '',
            defValue: [443]
        },
        'OUTPUT_DIR' : {
            validate: (arg) => {},
            processFunction: processParamAsScalar,
            description: '',
            defValue: null
        },
        'REQUEST_INTERCEPTOR' : {
            validate: (arg) => {},
            processFunction: processParamAsArray,
            description: '',
            defValue: []
        },
        'RESPONSE_INTERCEPTOR' : {
            validate: (arg) => {},
            processFunction: processParamAsArray,
            description: '',
            defValue: []
        }
    },
    //TARGET_IP: [],
    //TARGET_HOST: [],
    //HTTP_PORT: [80],
    //HTTPS_PORT: [443],
    //OUTPUT_DIR: null,
    //REQUEST_INTERCEPTOR: [],
    //RESPONSE_INTERCEPTOR: [],
    init: (args) => {
        config.initializeDefaults();
        config.paramTotal = (i - 2);
        for (var i = 2; i < args.length; i++) {
            //
            //console.log('args[' + i + '] - ' + args[i]);
            config.processParam(args[i]);
        }
dns.lookup('iana.org', (err, address, family) => {
  console.log('address: %j family: IPv%s', address, family);
});
dns.lookup('localhost', (err, address, family) => {
  console.log('address: %j family: IPv%s', address, family);
});
        //var config = {};
        //console.log("Hello 123");
        //return this;
    },
    initializeDefaults: () => {
        //
        var paramTypes = Object.keys(config.validParameters);
        for (var i = 0; i < paramTypes.length; i++) {
            var nextParam = paramTypes[i];
            config[nextParam] = config.validParameters[nextParam].defValue;
        }
    },
    processParam: (arg) => {
        var equalSign = '=';
        //
        var validParamNames = Object.keys(config.validParameters);
        var paramFound = false;
        var foundParams = [];
        for (var i = 0; i < validParamNames; i++) {
            var nextValidParamName = validParamNames[i];
            if (arg.startsWith(nextValidParamName + equalSign)) {
                if (foundParams.indexOf(nextValidParamName) !== -1) {
                    config.errorOccurred.push(
                        "'" + nextValidParamName
                            + "' shouldn't be declared more than once");
                    //continue;
                } else {
                    foundParams.push(nextValidParamName);
                    paramFound = true;
                    var paramValue = arg.substring(
                        (nextValidParamName + equalSign).length);
                    var processedParamValue =
                        config.validParameters[
                            nextValidParamName].processFunction(paramValue);
                    config[nextValidParamName] = processedParamValue;
                    //break;
                }
            }
        }
        if (!paramFound) {
            //
            console.log('No parameters submitted');
        } else {
            //config.validateConfig();
            //config.postProcessConfig();
        }
    },
    paramTotal: null,
    notes: [],
    errorOccurred: []
};
module.exports = config;
