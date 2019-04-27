module.exports = {
    apps: [{
        name: 'example-server',
        script: './dist/index.js',
        instances: 4,
        exec_mode: 'cluster',
        watch: true,
    }]
};