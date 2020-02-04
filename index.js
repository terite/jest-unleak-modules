function once(fn) {
    let called = false;
    return function onceInner(...args) {
        if (!called) {
            called = true;
            return fn.apply(this, args);
        }
    }
}

exports.fixAgentBase = once(function fixAgentBase() {
    const https = require('https');
    const {get: oldGet, request: oldRequest } = https;
    const abVersion = require('agent-base/package.json').version;
    if (!abVersion.startsWith('4.')) {
        // Nothing to do, versions 5+ don't leak
        return;
    }

    afterAll(() => {
        if (https.get !== oldGet) {
            https.get = oldGet;
        }
        if (https.request !== oldRequest) {
            https.request = oldRequest;
        }
    });
})

exports.fixGracefulFs = once(function fixGracefulFs() {
    // requiring fs outside of afterAll is necessary for some reason
    const fs = require('fs');

    afterAll(() => {
        const previousSymbol = Symbol.for('graceful-fs.previous')
        const oldClose = fs.close[previousSymbol];
        if (oldClose) {
            fs.close = oldClose;
        }
        const oldCloseSync = fs.closeSync[previousSymbol];
        if (oldCloseSync) {
            fs.closeSync = oldCloseSync;
        }
    });
})


exports.fixShimmer = once(function fixShimmer () {
    const shimmer = require('shimmer');
    const oldWrap = shimmer.wrap;
    const oldMassWrap = shimmer.massWrap;

    shimmed = [];
    shimmer.wrap = function wrap(nodule, name, wrapper) {
        const ret = oldWrap.call(this, nodule, name, wrapper);
        shimmed.push([nodule, name]);
        return ret;
    }

    shimmer.massWrap = function massWrap(nodules, names, wrapper) {
        const ret = oldMassWrap.call(this, nodules, names, wrapper);

        const nodulesAry = Array.isArray(nodules) ? nodules : [nodules];
        const namesAry = Array.isArray(names) ? names : [names];
        for (const nodule of nodulesAry) {
            for (const name of namesAry) {
                shimmed.push([nodule, name]);
            }
        }

        return ret;
    }

    afterAll(() => {
        shimmer.wrap = oldWrap;
        shimmer.massWrap = oldMassWrap;

        for (const [nodule, name] of shimmed) {
            shimmer.unwrap(nodule, name);
        }
    });
});

exports.fixContinuationLocalStorage = once(function fixContinuationLocalStorage() {
    exports.fixAsyncListener();
})

exports.fixAsyncListener = once(function fixAsyncListener() {
    exports.fixShimmer();
});
