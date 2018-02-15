import axios from 'axios';
import jwt from 'jsonwebtoken';

export const getProjects = (user) => {
    console.log("JWT", jwt);
    const token = jwt.sign({ command: '', login: user }, '');
    const request = axios({
        url: 'http://engineershop.eu:4005/get-user-projects',
        method: 'post',
        data: {
            token
        }
    });

    console.log("Request", request);

    return {type: 'GET_PROJECTS', payload: request}
}
