const thinky = require('thinky')({
    db: 'thinktest',
    user: 'admin',
    password: 'admin'
});
thinky.r.getPoolMaster().on('size', function (size) {
    // console.log('thinky size', size);

})
thinky.r.getPoolMaster().on('available-size', function (size) {
    // console.log('thinky size', size);

})
thinky.r.getPoolMaster().on('healthy', function (healthy) {
    if (healthy === true) {
        console.info('We can run queries.');
    }
    else {
        console.error('No queries can be run.');
    }
});

export default thinky;