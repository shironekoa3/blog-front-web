import request from '../utils/request'

export function list() {
    return request.get('/category/list');
}
export function change(params) {
    return request.post('/category/change', params);
}
export function del(params) {
    return request.get(`/category/delete/${params}`);
}