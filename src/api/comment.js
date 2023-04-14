import request from '../utils/request'

export function getByArticleId(articleId) {
    return request.get(`/comment/get/${articleId}`);
}
export function getQQInfo(qq) {
    return request.get(`/comment/getQQInfo/${qq}`)
}
export function list(param) {
    return request.get(`/comment/list?searchKey=${param?.searchKey || ''}`);
}
export function save(params) {
    return request.post('/comment/save', params);
}
export function del(params) {
    return request.get(`/comment/delete/${params}`);
}