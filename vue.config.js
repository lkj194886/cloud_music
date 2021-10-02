module.exports = {
    devServer: {
        port: '8080',
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: 'https://yunslu.com/mapi',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}