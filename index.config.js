module.exports = {
    apps: [{
        name: 'example-server',
        script: './index.js',
        instances: 2,
        exec_mode: 'cluster',
        watch: true,
    }]
};