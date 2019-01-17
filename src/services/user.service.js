import UIkit from 'uikit';
import config from './api.config';

const RESOURCE_NAME = '/users';

const get = async () => {
  try {
    const response = await fetch(config.server.api + RESOURCE_NAME);

    const data = await response.json();
    return data

  } catch (e) {
    UIkit.notification(`Error: ${e.message}`);
    console.log(e.message);
  }

}

const post = async (payload) => {
  try {
    const response = await fetch(config.server.api + RESOURCE_NAME, {
      method: 'post',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    return data
  } catch (e) {
    UIkit.notification(`Error: ${e.message}`);
    console.log(e.message);
  }
}

const put = async (payload) => {
  try {
    const response = await fetch(`${config.server.api}${ RESOURCE_NAME}/${payload.id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    return data

  } catch (e) {
    UIkit.notification(`Error: ${e.message}`);
    console.log(e.message);
  }
}

const remove = async (identifier) => {
  try {
    const response = await fetch(`${config.server.api}${ RESOURCE_NAME}/${identifier}`, {
      method: 'DELETE'
    });

    return response.ok
  } catch (e) {
    UIkit.notification(`Error: ${e.message}`);
    console.log(e.message);
  }

}
export default {
  get,
  post,
  remove,
  put
};
