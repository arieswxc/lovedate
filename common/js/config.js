// Seajs配置
seajs.config({
    base: baseUrl,
    paths: {
        'common': '/lovedate/common'
    },

    alias: {
        'jquery':   'common/js/lib/jquery.min.js',
        'ajax': 'common/js/ajax/ajax',
        // 'jquery': '../common/js/lib/jquery.min.js',
        'doT': 'common/js/lib/doT',
        'tools': 'common/js/tools',
        'globalState': 'common/js/globalState',
        'albumBig': 'common/components/album_big',
        'select': 'common/components/select',
        // 'enum': 'common/json/enum.json'
    },

    preload: ['jquery']
});
