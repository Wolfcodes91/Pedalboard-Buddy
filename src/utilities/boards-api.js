import sendRequest from './send-request';

const BASE_URL = '/api/boards';

export function newPedalboardCreate(form) {
    console.log('I am the API', form)
    return sendRequest(`${BASE_URL}`, 'POST', form);
  }
  export function getAll() {
    return sendRequest(BASE_URL);
  }

  export function deleteABoard(id) {
    return sendRequest(`${BASE_URL}/${id}`, 'DELETE', {id})
  }