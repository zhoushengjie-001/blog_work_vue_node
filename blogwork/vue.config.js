module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: '',
                ws: true,
                changeOrigin: true,
                pathRewrite: { //  /api 替换
                    '^/api': ''
                }
            }
        }
    }
}
