//index.js
//获取应用实例
const app = getApp();
const {DOMAIN} = require('../../utils/config');
const { $Toast } = require('../../weapp/base/index');
const api = require('../../utils/api');

Page({
    data: {
        id: '',
        currentTab: 'consume',

        //会员基本信息
        sex: 'male',
        name: '',
        phone: '',
        age: 30,

    //    消费信息
        consumeCount: 0,
        balance: '0元'
    },
    onLoad: function (option) {
        this.data.id = option.id;
        this.setData({
            id: option.id
        });
        this.queryMemberDetail(this.data.id);
    },
    queryMemberDetail(id){
        api.request({
            url: `/member/get/${id}`
        }).then((data) => {
            const detail = data,
                {name, phone, sex, age,
                    consumeCount, balance
                } = detail;
            this.setData({
                name, phone, sex, age,
                consumeCount,
                balance: `${balance}元`
            })
        });
    },
    sexChangeHandler(e){
        const {detail} = e,
            {value} = detail;
        this.setData({
            sex: value==='男'?'male':'female'
        })
    },
    tabChangeHandler({detail}){
        this.setData({
            currentTab: detail.key
        })
    },
    toCharge(){
        wx.navigateTo({url: '../recharge/index?id='+this.data.id})
    }
});
