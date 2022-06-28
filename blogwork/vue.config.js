module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://music.zzhitong.com',
                ws: true,
                changeOrigin: true,
                pathRewrite: { //  /api 替换
                    '^/api': ''
                }
            }
        }
    }
}