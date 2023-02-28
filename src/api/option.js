import request from '../utils/request'

export function list() {
    return request.get('/option/list');
}
export function listHome() {
    return request.get('/option/listHome');
}
export function change(params) {
    return request.post('/option/change', params);
}
// export function del(params) {
//     return request.get(`/tag/delete/${params}`);
// }