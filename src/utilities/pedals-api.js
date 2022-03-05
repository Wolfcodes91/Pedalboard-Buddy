import sendRequest from './send-request';

const BASE_URL = '/api/pedals';

export function getAll() {
  return sendRequest(BASE_URL);
}
export function newPedalCreate() {
  return sendRequest(`${BASE_URL}/pedals/new`);
}