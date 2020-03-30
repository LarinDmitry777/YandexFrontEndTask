module.exports = [
    {
        prefix: __dirname,
        endpoint: 'dist/public/bundles/common.css',
        files: [
            'src/views/index.css',
            'src/views/partials/header.css',
        ],
        separator: '\n'
    },
    {
        prefix: __dirname,
        endpoint: 'dist/public/bundles/hashTag.css',
        files: [
            'src/views/hashTag.css',
            'src/views/partials/adventures.css'
        ],
        separator: '\n'
    },
    {
        prefix: __dirname,
        endpoint: 'dist/public/bundles/adventures.css',
        files: [
            'src/views/partials/adventures.css'
        ],
        separator: '\n'
    },
    {
        prefix: __dirname,
        endpoint: 'dist/public/bundles/scene.css',
        files: [
            'src/views/scene.css',
        ],
        separator: '\n'
    }
];
