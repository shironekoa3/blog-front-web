import request from '../utils/request'

export function get(params) {
    return request.get(`/article/get/${params}`);
}
export function list(param) {
    return request.get(`/article/list?p=${param.p}&size=${param.size}&type=${param?.type || ''}&keyword=${param?.keyword || ''}`);
}
export function listHome(param) {
    return request.get(`/article/listHome?p=${param.p}&size=${param.size}`);
}
export function change(params) {
    return request.post('/article/change', params);
}
export function del(params) {
    return request.get(`/article/delete/${params}`);
}
