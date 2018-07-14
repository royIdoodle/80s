//index.js
//获取应用实例
const app = getApp();
const { $Toast } = require('../../weapp/base/index');
const api = require('../../utils/api');

Page({
    data: {
        memberId: '',
        number: '',
        deb: ''
    },
    onLoad: function (option) {
        this.data.memberId = option.id;
        this.setData({
            memberId: this.data.memberId
        })
    },
    numberChange({detail}){
        this.setData({
            number: detail.detail.value
        })
    },
    confirm(){
        const id = this.data.memberId;
        api.request({
            url: `/member/recharge/${id}`,
            method: 'post',
            data: {
                type: 'recharge',
                number: this.data.number || 100,
                shopId: 1
            }
        }).then(data => {
            $Toast({
                content: '充值成功！',
                type: 'success'
            });
            setTimeout(() => {
                wx.navigateBack();
            }, 500)
        }).catch(err => {
            $Toast({
                content: JSON.stringify(err),
                type: 'warning'
            })
        })
    }
});
