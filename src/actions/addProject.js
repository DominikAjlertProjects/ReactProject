import axios from 'axios';
import jwt from 'jsonwebtoken';
export const addProject = (project) => {
    // console.log("User to check", user);
    const token = jwt.sign({ command: '' }, '');

    const request = axios({
        url: 'http://engineershop.eu:4005/add-user-project',
        method: 'post',
        data: {
            token,
            project
        }
    });

    return {
        type: 'ADD_PROJECT',
        payload: request
    }
}
