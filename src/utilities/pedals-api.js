import sendRequest from './send-request';

const BASE_URL = '/api/pedals';

export function getAll() {
  return sendRequest(BASE_URL);
}
export function newPedalCreate(formData) {
  return sendRequest(`${BASE_URL}`, 'POST', formData);
}

export function getById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export function deleteAPedal(id) {
  console.log(id, '2')
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE', {id})
}