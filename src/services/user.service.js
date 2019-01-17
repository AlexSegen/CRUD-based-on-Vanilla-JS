import config from './api.config';

const RESOURCE_NAME = '/users';

const get = async () => {
    const response = await fetch(config.server.api + RESOURCE_NAME);
    const data = await response.json();
    
    return data
}

const post = async (payload) => {

    const response = await fetch(config.server.api + RESOURCE_NAME, 
        {
            method: 'post',
            body: JSON.stringify(payload),
            headers:{
                'Content-Type': 'application/json'
            }
        });

    const data = await response.json();
    
    return data
}
const remove = async (identifier) => {
    const response = await fetch(`${config.server.api}${ RESOURCE_NAME}/${identifier}`, 
        {
            method: 'DELETE'
        });
}
export default { get, post, remove };