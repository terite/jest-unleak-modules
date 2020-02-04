require('../../index').fixShimmer();

test('shimmer', () => {
    const events = require('events');
    const shimmer = require('shimmer');

    let called = false;
    shimmer.wrap(events, 'once', (original) => {
        return () => {
            called = true;
        };
    });

    events.once('foo');
    expect(called).toBe(true);
});
