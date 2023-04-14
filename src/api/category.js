import request from '../utils/request'

export function list(param) {
    return request.get(`/category/list?searchKey=${param?.searchKey || ''}`);
}
export function change(params) {
    return request.post('/category/change', params);
}
export function del(params) {
    return request.get(`/category/delete/${params}`);
}