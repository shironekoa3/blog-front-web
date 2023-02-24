import request from '../utils/request'

export function get(params) {
    return request.get(`/article/get/${params}`);
}
export function list() {
    return request.get('/article/list');
}
export function change(params) {
    return request.post('/article/change', params);
}
export function del(params) {
    return request.get(`/article/delete/${params}`);
}