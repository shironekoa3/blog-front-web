import request from '../utils/request'

export function login(params) {
    return request.post('/user/login', params);
}
export function logout(params) {
    return request.post('/user/logout', params);
}