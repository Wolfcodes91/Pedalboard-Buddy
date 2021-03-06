import sendRequest from './send-request';

const BASE_URL = '/api/pedals';

export function getAll() {
  return sendRequest(BASE_URL);
}
export function newPedalCreate(formData) {
  return sendRequest(`${BASE_URL}`, 'POST', formData, true);
}

export function getById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export function deleteAPedal(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE', {id})
}
export function updateAPedal(editData, id) {
  console.log(editData, '1')
  return sendRequest(`${BASE_URL}/${id}`, 'PUT', editData, true)
}