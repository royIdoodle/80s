//index.js
//获取应用实例
const app = getApp();
const {DOMAIN} = require('../../utils/config');
const { $Toast } = require('../../weapp/base/index');
const api = require('../../utils/api');

Page({
    data: {
        current: 'member',
        phone: '',
        memberList: [],
        currentPage: 0
    },
    onLoad: function () {
        //查询会员
        this.queryMemberList();
    },
    handleChange ({ detail }) {
        this.setData({
            current: detail.key
        });
        if(detail.key === 'homepage'){
            wx.redirectTo({
                url: '../index/index'
            })
        }
    },
    //翻页
    onReachBottom: function(){
        this.queryMemberList();
    },
    toDetail({currentTarget}){
        const {dataset} = currentTarget,
            {id} = dataset;
        //跳转到会员详情页
        wx.navigateTo({
            url: '../memberDetail/index?id='+id
        })
    },
    queryMemberList: function () {
        const page = this.data.currentPage,
            count = 10;
        api.request({
            url: `/member/list/${page}/${count}`
        }).then(data => {
            this.data.memberList = this.data.memberList.concat(data);
            this.setData({
                memberList: this.data.memberList,
                currentPage: ++this.data.currentPage
            });
        });
    }
});
