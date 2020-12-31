// const baseUrl = 'http://localhost:3000';
const baseUrl = 'http://192.168.101.22:3000';
const httpRequest = (opts, data) => {
    let httpDefaultOpts = {
        url: baseUrl + opts.url,
        data: data,
        method: opts.method,
        header: opts.method == 'get' ? {
            'X-Requested-With': 'XMLHttpRequest',
            "Accept": "application/json",
            "Content-Type": "application/json; charset=UTF-8"
        } : {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        dataType: 'json',
    }
    uni.showLoading({
        title: "加载中"
    })
    let promise = new Promise(function (resolve, reject) {
        uni.request(httpDefaultOpts).then(
            (res) => {
                uni.hideLoading();
                resolve(res[1])
            }
        ).catch(
            (response) => {
                uni.hideLoading();
                reject(response)
            }
        )
    })
    return promise
};

export default {
    baseUrl,
    httpRequest
}