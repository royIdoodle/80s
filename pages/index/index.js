//index.js
//获取应用实例
const app = getApp();
const api = require('../../utils/api');

Page({
    data: {
        current: 'homepage'
    },
    handleChange ({ detail }) {
        this.setData({
            current: detail.key
        });
        if(detail.key === 'member'){
            wx.redirectTo({
                url: '../member/index'
            })
        }
    },
    onLoad: function () {

    },
    toAddMember(){
        wx.navigateTo({
            url: '../addMember/index'
        })
    },
    testHandler(){

    }
});
