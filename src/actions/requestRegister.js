import axios from 'axios';
import jwt from 'jsonwebtoken';

export const requestRegister = (registerForm) => {
    console.log("JWT", jwt);
    const token = jwt.sign({ command: '' }, '');
    const request = axios({
        url: 'http://engineershop.eu:4005/register',
        method: 'post',
        data: {
            form: registerForm,
            token
        }
    });

    console.log("Request", request);

    return {type: 'REGISTER', payload: request}
}
