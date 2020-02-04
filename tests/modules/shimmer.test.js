require('../../index').fixShimmer();

test('shimmer', () => {
    const os = require('os');
    const shimmer = require('shimmer');

    shimmer.wrap(os, 'uptime', (original) => {
        return () => {
            return 9001
        };
    });

    expect(os.uptime()).toBe(9001);
});
