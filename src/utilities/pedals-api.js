import sendRequest from './send-request';

const BASE_URL = '/api/pedals';

export function getAll() {
  return sendRequest(BASE_URL);
}
export function newPedalCreate(formData) {
  return sendRequest(`${BASE_URL}/new`, 'POST', formData);
}

export function getById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}
