import axios from 'axios';
import jwt from 'jsonwebtoken';

export const removeProject = (project) => {
    // console.log("User to check", user);
    const token = jwt.sign({ command: '' }, '');

    const request = axios({
        url: 'http://engineershop.eu:4005/remove-project',
        method: 'post',
        data: {
            token,
            project
        }
    });

    return {
        type: 'REMOVE_PROJECT',
        payload: request
    }
}
