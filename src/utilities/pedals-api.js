import sendRequest from './send-request';

const BASE_URL = '/api/pedals';

export function getAll() {
  return sendRequest(BASE_URL);
}
export function newPedalCreate(formData) {
    console.log('level2')
  return sendRequest(`${BASE_URL}/new`, 'POST', formData);
}