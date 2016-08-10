// Seajs配置
seajs.config({
    base: baseUrl,
    paths: {
        'common': '/lovedate/common'
    },

    alias: {
        'jquery':   'common/js/lib/jquery.min.js',
        'ajax': 'common/js/ajax/ajax',
        // 'jssha': '/node_modules/jssha/src/sha.js',
        'doT': 'common/js/lib/doT',
        'tools': 'common/js/tools',
        'globalState': 'common/js/globalState',
        'albumBig': 'common/components/album_big',
        'select': 'common/components/select',
        'select_address': 'common/components/select_address',
        'wx': 'common/js/lib/jweixin-1.0.0.js',
        'wx_config': 'common/js/wechat/wx_config',
        'alert': 'common/components/alert',
        // 'enum': 'common/json/enum.json'
    },

    preload: ['jquery']
});
