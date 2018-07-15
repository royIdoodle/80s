//index.js
//获取应用实例
const app = getApp();
const {DOMAIN} = require('../../utils/config');
const { $Toast } = require('../../weapp/base/index');
const api = require('../../utils/api');
const util = require('../../utils/util');

Page({
    data: {

        //会员基本信息
        sex: 'male',
        sexStr: '男',
        name: '',
        phone: '',
        age: ''
    },
    onLoad: function (option) {

    },

    sexChangeHandler(e){
        const {detail} = e,
            {value} = detail;
        this.setData({
            sex: value==='男'?'male':'female'
        })
    },
    nameChange({detail}){
        const {value} = detail.detail;
        this.data.name = value;
        this.setData({
            name: this.data.name
        })
    },
    phoneChange({detail}){
        const {value} = detail.detail;
        this.data.phone = value;
        this.setData({
            phone: this.data.phone
        })
    },
    ageChange({detail}){
        const {value} = detail.detail;
        this.data.age = value;
        this.setData({
            age: this.data.age
        })
    },
    addMember(){
        if(!this.data.name || !this.data.phone){
            $Toast({
                content: '姓名或手机号不得为空！',
                type: 'warning'
            });
            return
        }
        api.request({
            url: '/member/add',
            method: 'post',
            data: {
                name: this.data.name,
                age: this.data.age,
                phone: this.data.phone,
                sex: this.data.sex
            }
        }).then(data => {
            wx.redirectTo({
              url: '../memberDetail/index?id='+data._id
            })
        }).catch(err => {
            $Toast({
                content: JSON.stringify(err.message),
                type: 'warning'
            })
        })
    }
});
