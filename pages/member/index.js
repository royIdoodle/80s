//index.js
//获取应用实例
const app = getApp();

Page({
    data: {
        current: 'member'
    },
    handleChange ({ detail }) {
        this.setData({
            current: detail.key
        });
    },
    onLoad: function () {

    },
});
