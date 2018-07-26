//index.js
//获取应用实例
const app = getApp();
const {DOMAIN} = require('../../utils/config');
const { $Toast } = require('../../weapp/base/index');
const api = require('../../utils/api');
const util = require('../../utils/util');

const TYPE_MAP = {
    'recharge': '充值',
    'haircut': '理发',
    'perm': '烫染',
    'shopping': '购物',
    'other': '其他'
};

const SEX_MAP = {
    'male': '男',
    'female': '女'
};
function getCountStr(type, count) {
    if(type === 'recharge'){
        return `+${count}元`
    }else{
        return `-${count}元`
    }
}

function reformatList(list){
    return list.map(item => {
        return {
            time: util.dateFormat(new Date(item.time), 'yyyy年MM月dd日 hh:mm:ss'),
            type: TYPE_MAP[item.type],
            count: getCountStr(item.type, item.count)
        }
    })
}

Page({
    data: {
        id: '',
        currentTab: 'consume',

        //会员基本信息
        sex: 'male',
        sexStr: '男',
        name: '',
        phone: '',
        age: 30,
        cardNo: '',

    //    消费信息
        consumeCount: 0,
        consumeList: [],
        balance: '0元'
    },
    onLoad: function (option) {
        this.data.id = option.id;
        this.setData({
            id: option.id
        });
        // this.queryMemberDetail(this.data.id);
    },
    onPullDownRefresh: function(){
        this.queryMemberDetail(this.data.id)
        wx.stopPullDownRefresh()
    },
    onShow(){
        this.queryMemberDetail(this.data.id)
    },
    queryMemberDetail(id){
        //请求会员基本信息
        api.request({
            url: `/member/get/${id}`
        }).then((data) => {
            const {name, phone, sex, age,
                    balance, cardNo
                } = data;
            this.setData({
                name, phone, sex, age, cardNo, sexStr: SEX_MAP[sex],
                balance: `${balance}元`
            })
        });
        //请求会员消费列表
        api.request({
            url: `/consume/list/${id}`
        }).then((list = []) => {
            this.data.consumeCount = list.length;
            this.data.consumeList = reformatList(list);
            this.setData({
                consumeCount: this.data.consumeCount,
                consumeList: this.data.consumeList
            });
        })
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
    cardNoChange({detail}){
        const {value} = detail.detail;
        this.data.cardNo = value;
        this.setData({
            cardNo: this.data.cardNo
        })
    },
    ageChange({detail}){
        const {value} = detail.detail;
        this.data.age = value;
        this.setData({
            age: this.data.age
        })
    },
    //更新用户信息
    saveMember(){
        api.request({
            url: `/member/edit/${this.data.id}`,
            method: 'post',
            data: {
                name: this.data.name,
                phone: this.data.phone,
                cardNo: this.data.cardNo,
                sex: this.data.sex,
                age: this.data.age
            }
        }).then(() => {
            $Toast({
                content: '更新成功',
                type: 'success'
            })
        })
    },
    toAddConsume(){
        wx.navigateTo({
            url: '../addConsume/index?id='+this.data.id
        });
    }
});
