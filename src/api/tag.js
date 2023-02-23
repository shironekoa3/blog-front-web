import request from '../utils/request'

export function list() {
    return request.get('/tag/list');
}
export function change(params) {
    return request.post('/tag/change', params);
}
export function del(params) {
    return request.get(`/tag/delete/${params}`);
}