
const {DOMAIN} = require('./config');

function request(options) {
    const {
        url, method = 'get', data
    } = options;
    let reqUrl = '';
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

module.exports = {
    request
};