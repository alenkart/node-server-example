module.exports = {
    apps: [
        {
            name: 'example-server',
            script: './dist/index.js',
            instances: 4,
            exec_mode: 'cluster',
            watch: true,
        },
        {
            name: 'example-cron',
            script: "./dist/crons/example.cron.js",
            instances: 1,
            exec_mode: 'fork',
            cron_restart: "0,30 * * * *",
            watch: true,
            autorestart: false
        }
    ]
};