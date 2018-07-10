//index.js
//获取应用实例
const app = getApp();
const {DOMAIN} = require('../../utils/config');
const { $Toast } = require('../../weapp/base/index');

Page({
    data: {
        id: ''
    },
    onLoad: function (option) {
        this.data.id = option.id;
        this.queryMemberDetail(this.data.id);
    },
    queryMemberDetail(id){
        wx.request({
            url: `${DOMAIN}/member/get/${id}`,
            success({data}){
                console.log(data)
            }
        })
    }
});
