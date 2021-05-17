const path = require('path');
const { config, electron } = require('process');

function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
    lintOnSave: false,
    publicPath: './',
    devServer: {
        // can be overwritten by process.env.HOST
        host: '0.0.0.0',
        port: 8080
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('src', resolve('src'))
            .set('common', resolve('src/common'))
            .set('components', resolve('src/components'));
    },
    // 设置APP及安装包图标
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                win: {
                    icon: './public/app.ico'
                },
                mac: {
                    icon: './public/app.png'
                },
                productName: '扁鹊飞救'
            }
        }
    }
};