//index.js
//获取应用实例
const app = getApp();
const {DOMAIN} = require('../../utils/config');
const { $Toast } = require('../../weapp/base/index');

Page({
    data: {
        current: 'member',
        phone: '',
        memberList: [],
        currentPage: 0
    },
    onLoad: function () {
        //查询会员详情
        $Toast({
            content: '警告的提示',
            type: 'warning'
        });
    },
    queryMemberDetail(phone){

    }
});
