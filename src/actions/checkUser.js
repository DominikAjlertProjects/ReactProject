import axios from 'axios';
import jwt from 'jsonwebtoken';
export const checkUser = (user) => {
    // console.log("User to check", user);
    const token = jwt.sign({ command: '', login: user }, '');

    const request = axios({
        url: 'http://engineershop.eu:4005/find-user',
        method: 'post',
        data: {
            token
        }
    });

    return {
        type: 'CHECK_USER',
        payload: request
    }
}
