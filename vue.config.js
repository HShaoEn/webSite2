const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    // �����D �ϦV�N�z
    devServer: {
        proxy: {
            // ����x��API
            "/webapi": {
                target: "http://localhost:3000",
                changeOrigin: true
            }
        },
        client: {
            overlay: false
        },
        allowedHosts: 'http://localhost:8081/'
    }
    })



