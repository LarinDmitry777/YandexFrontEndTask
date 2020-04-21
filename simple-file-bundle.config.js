module.exports = [
    {
        prefix: __dirname,
        endpoint: 'dist/public/bundles/common.css',
        files: [
            'src/views/index.css',
            'src/views/partials/header.css'
        ],
        separator: '\n'
    },
    {
        prefix: __dirname,
        endpoint: 'dist/public/bundles/adventures.css',
        files: [
            'src/views/partials/adventures.css'
        ]
    },
    {
        prefix: __dirname,
        endpoint: 'dist/public/bundles/scene.css',
        files: [
            'src/views/scene.css'
        ],
        separator: '\n'
    },
    {
        prefix: __dirname,
        endpoint: 'dist/public/bundles/index.js',
        files: [
            'dist/public/scripts/Adventure.js',
            'dist/public/scripts/App.js',
            'dist/public/scripts/index.js',

        ],
        separator: '\n'
    }
];
