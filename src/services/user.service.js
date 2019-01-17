import config from './api.config';

const RESOURCE_NAME = '/users';

const get = async () => {
  const response = await fetch(config.server.api + RESOURCE_NAME);
  const data = await response.json();

  return data
}

const post = async (payload) => {

  const response = await fetch(config.server.api + RESOURCE_NAME, {
    method: 'post',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  return data
}

const put = async (payload) => {
  const response = await fetch(`${config.server.api}${ RESOURCE_NAME}/${payload.id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  return data
}

const remove = async (identifier) => {
  const response = await fetch(`${config.server.api}${ RESOURCE_NAME}/${identifier}`, {
    method: 'DELETE'
  });

  return response
}
export default {
  get,
  post,
  remove,
  put
};
