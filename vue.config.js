module.exports = {
    //根路径
    publicPath: "/",

    // 构建输出目录
    outputDir: "dist",

    //静态资源目录（js,css,img,fonts）
    assetsDir: "assets",

    // LintOnSave: false,          //是否开启esLint保存检测，有效值 true || false || 'error'
    devServer:{
        open: true,               
        host: "localhost",
        port: 8080,
        https: false,
        hotOnly: false,
        proxy:{
            //城市api
            '/myapi': {
                target: "http://www.weather.com.cn/",
                ws: true,
                changeOrigin: true,
                pathRewrite:{
                    '^/myapi': ''
                }
            },
            //天气
            '/apis': {
                target: "http://m.weather.com.cn/",
                ws: true,
                changeOrigin: true,
                pathRewrite:{
                    '^/apis': ''
                }
            },
            //百度api
            '/baiduapi': {
                target: "http://api.map.baidu.com/geocoder?address=%E5%A4%AA%E5%8E%9F&output=json&key=37492c0ee6f924cb5e934fa08c6b1676",
                ws: true,
                changeOrigin: true,
                pathRewrite:{
                    '^/baiduapi': ''
                }
            },
            // 彩云API
            '/caiyunapi': {
                target: "https://api.caiyunapp.com/",
                ws: true,
                changeOrigin: true,
                pathRewrite:{
                    '^/caiyunapi': ''
                }
            },
            // 开源新闻
            '/kynews': {
                target: "https://pacaio.match.qq.com/irs/rcd?cid=56&ext=games&token=c786875b8e04da17b24ea5e332745e0f&num=20&expIds=20190106A13PFT%7C20190108A04MLS&page=0",
                ws: true,
                changeOrigin: true,
                pathRewrite:{
                    '^/kynews': ''
                }
            },
        }
    },

    css: {
      loaderOptions: {
        stylus: {
          'resolve url': true,
          'import': [
            './src/theme'
          ]
        }
      }
    },

    pluginOptions: {
      'cube-ui': {
        postCompile: true,
        theme: true
      }
    }
}
