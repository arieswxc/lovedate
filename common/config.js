// Seajs配置
seajs.config({
    paths: {
        'common': '../common'
    },

    alias: {
        'jquery': 'common/jquery.min.js'
        // 'tools': '../common/tools',
        // // 'doT': '../lib/doT',
        // 'showBigPic': '../components/showBigPic',
        // 'wxShare': '../components/wxShare',
        // 'share': '../components/share',
        // 'nativeShare': '../components/nativeShare',
    },

    preload: ['jquery']
});
