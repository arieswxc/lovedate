// Seajs配置
seajs.config({
    paths: {
        'common': '/lovedate/common'
    },

    alias: {
        'jquery': 'common/js/lib/jquery.min.js',
        'ajax': 'common/js/ajax/ajax',
        // 'jquery': '../common/js/lib/jquery.min.js',
        'doT': 'common/js/lib/doT',
        'tools': 'common/js/tools',
        'albumBig': 'common/components/album_big',
        'select': '../../common/components/select'
    },

    preload: ['jquery']
});
