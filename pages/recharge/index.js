//index.js
//获取应用实例
const app = getApp();
const { $Toast } = require('../../weapp/base/index');
const api = require('../../utils/api');

Page({
    data: {
        memberId: '',
        number: ''
    },
    onLoad: function (option) {
        this.data.memberId = option.id;
        this.setData({
            memberId: this.data.memberId
        })
    },
    numberChange(e){
        $Toast({
            content: '输入！'+JSON.stringify(e)
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
            console.log(data);
        });
    }
});
