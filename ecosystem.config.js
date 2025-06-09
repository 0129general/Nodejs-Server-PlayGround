module.exports = {
    apps: [
        {
            name: 'Notification Admin API',
            script: './index.js',
            instances: 2,
            node_args: ['--optimize_for_size', '--max_old_space_size=460'],
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
};

