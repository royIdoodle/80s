//index.js
//获取应用实例
const app = getApp();
const { $Toast } = require('../../weapp/base/index');
const api = require('../../utils/api');

const TYPE_MAP = {
    '充值': 'recharge',
    '理发': 'haircut',
    '烫染': 'perm',
    '购物': 'shopping',
    '其他': 'other'
};

Page({
    data: {
        id: '',
        typeStr: '理发',
        type: 'haircut',
        count: 0,
        content: ''
    },
    onLoad: function (options) {
        this.data.id = options.id;
        this.setData({
            id: options.id
        });
    },
    typeChangeHandler({detail}){
        this.setData({
            typeStr: detail.value,
            type: TYPE_MAP[detail.value]
        });
    },
    countChange({detail}){
        const {value} = detail.detail;
        this.setData({
            count: value
        });
    },
    contentChange({detail}){
        const {value} = detail.detail;
        this.setData({
            content: value
        })
    },
    addConsume(){
        const shopId = 1;
        if(!this.data.count){
            $Toast({
                content: '请输入金额',
                type: 'warning'
            });
            return
        }
        api.request({
            url: `/consume/add/${shopId}/${this.data.id}`,
            method: 'post',
            data: {
                type: this.data.type,
                count: this.data.count,
                content: this.data.content
            }
        }).then(() => {
            $Toast({
                content: '添加消费成功！',
                type: 'success'
            });
            setTimeout(() => {
                wx.navigateBack();
            }, 500)
        })
    }
});
