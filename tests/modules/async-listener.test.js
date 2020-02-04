require('../../index').fixAsyncListener();

test('async-listener', () => {
    const asyncListener = require('async-listener');
    expect(asyncListener).not.toBeUndefined();
});
