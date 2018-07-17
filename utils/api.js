
const {DOMAIN} = require('./config');

function request(options, login = false) {
    const {
        url, method = 'get', data
    } = options;
    const token = wx.getStorageSync('token');
    let reqUrl = '';
    //判断本地是否有token
    if(!token && !login){
        return getToken().then(()=>{
            return request(options);
        })
    }

    //根据不同method，重新编制url
    if (method.toLowerCase() === 'post' && data) {
        let list = [];
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                list.push(`${key}=${data[key]}`);
            }
        }
        reqUrl = `${url}?${list.join('&')}`;
    } else {
        reqUrl = url;
    }


    return new Promise((resolve, reject) => {
        wx.request({
            url: `${DOMAIN}${reqUrl}`,
            method,
            data,
            header: {
                token: wx.getStorageSync('token')
            },
            success({data}){
                if(data.success === true){
                    resolve(data.data, data.code);
                }else {
                    reject({
                        code: data.code,
                        message: data.message
                    });
                }
            },
            fail(err){
                reject({
                    code: 4001,
                    message: err
                })
            }
        })
    });
}

function getToken(){
    return new Promise((resolve, reject) => {
        wx.login({
            success({code}) {
                if (code) {
                    const apiPromise = request({
                        url: '/authorize/login',
                        method: 'post',
                        data: {
                            code
                        }
                    }, true).then(({token}) => {
                        wx.setStorageSync('token', token);
                    });
                    resolve(apiPromise);
                }else{
                    reject('wx login failed')
                }
            }
        });
    });

}

module.exports = {
    request
};