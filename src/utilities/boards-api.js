import sendRequest from './send-request';

const BASE_URL = '/api/boards';

export function newPedalboardCreate(form) {
    return sendRequest(`${BASE_URL}`, 'POST', form);
  }
  export function getAll() {
    return sendRequest(BASE_URL);
  }

  export function deleteABoard(id) {
    return sendRequest(`${BASE_URL}/${id}`, 'DELETE', {id})
  }
  export function updateABoard(editData) {
    return sendRequest(`${BASE_URL}/${editData._id}`, 'PUT', editData)
  }