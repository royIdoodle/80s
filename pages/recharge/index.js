//index.js
//获取应用实例
const app = getApp();
const {DOMAIN} = require('../../utils/config');
const { $Toast } = require('../../weapp/base/index');

Page({
    data: {
        memberId: '',
        number: ''
    },
    onLoad: function (option) {
        // this.data.memberId = option.id;
    },
    numberChange(e){
        debugger
    }
});
