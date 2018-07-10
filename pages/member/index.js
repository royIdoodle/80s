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
        //查询会员
        this.queryMemberList();
    },
    //翻页
    onReachBottom: function(){
        this.queryMemberList();
    },
    toDetail({currentTarget}){
        const {dataset} = currentTarget,
            {phone} = dataset;
        wx.navigateTo({
            url: '../memberDetail/index?phone='+phone
        })
    },
    queryMemberList: function () {
        let that = this;
        const page = that.data.currentPage,
            count = 10;
        wx.request({
            url: `${DOMAIN}/member/list/${page}/${count}`,
            success({data}){
                that.data.memberList = that.data.memberList.concat(data.data);
                that.setData({
                    memberList: that.data.memberList,
                    currentPage: ++that.data.currentPage
                });
                console.log(data.data);
            }
        })
    }
});
