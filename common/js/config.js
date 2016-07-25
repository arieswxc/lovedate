// Seajs配置
seajs.config({
    paths: {
        'common': '/lovedate/common'
    },

    alias: {
        // 'jquery': 'common/js/jquery.min.js',
        'jquery': '../common/js/jquery.min.js'
        // 'tools': '../common/tools',
        // // 'doT': '../lib/doT',
        // 'showBigPic': '../components/showBigPic',
        // 'wxShare': '../components/wxShare',
        // 'share': '../components/share',
        // 'nativeShare': '../components/nativeShare',
    },

    preload: ['jquery']
});
