const fs = require('fs');

module.exports = {
    devServer: {
        open: process.platform === 'darwin',
        public: 'https://localhost:8080/',
        https: {
            key: fs.readFileSync('certs/vuetesting.dev+5-key.pem'),
            cert: fs.readFileSync('certs/vuetesting.dev+5.pem')
        },
        hotOnly: false,
    },
}