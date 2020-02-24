module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    // Prevent it from trying to run against runtime generator
                    node: 'current',
                },
            },
        ],
        '@babel/preset-react',
        ['@babel/preset-typescript']
    ],
    plugins: [
        ['@babel/plugin-proposal-optional-chaining']
    ]
};
