import request from './request.js'

//获取音乐or视频链接
export const getAudio = (opts, param) => {
    return request.get(opts, param);
}
export default {
    getAudio,
}