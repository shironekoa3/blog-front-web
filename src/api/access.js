import request from '../utils/request'

export function list(param) {
    return request.get(`/access/list?days=${param?.days || 7}`);
}



