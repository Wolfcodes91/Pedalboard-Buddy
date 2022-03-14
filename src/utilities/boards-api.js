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
  export function updateABoard(editData, id) {
    console.log(editData, '1')
    return sendRequest(`${BASE_URL}/${id}`, 'PUT', editData, true)
  }