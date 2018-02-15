import axios from 'axios';
import jwt from 'jsonwebtoken';
import superagent from 'superagent';

export const getEmail = (login) => {

    const token = jwt.sign({ command: '', login }, '');

    const request = axios({
        url: 'http://engineershop.eu:4005/get-user-email',
        method: 'post',
        data: {
            token,
            login
        }
    });

    return {
        type: 'GET_EMAIL',
        payload: request
    }
}
