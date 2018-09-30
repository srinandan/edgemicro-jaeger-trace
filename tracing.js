//const { initTracer: initJaegerTracer } = require("jaeger-client");
const resolve = require('path').resolve;
const initTracer = require('jaeger-client').initTracer;
const edgemicroVersion = require(resolve('./package.json')).version;
const debug = require('debug')('tracing');

module.exports.initTracer = serviceName => {

    const config = {
        serviceName: serviceName,
        sampler: {
            type: "const",
            param: 1,
        },
        reporter: {
            logSpans: true,
        }
    };

    const options = {
        logger: {
            info(msg) {
                debug("INFO ", msg);
            },
            error(msg) {
                debug("ERROR", msg);
            }
        },
        tags: {
            'apigee-microgateway': edgemicroVersion,
        }
    };

    return initTracer(config, options);
};