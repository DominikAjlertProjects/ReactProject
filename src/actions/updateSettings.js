import axios from 'axios';
import jwt from 'jsonwebtoken';
export const updateSettings = (settingsForm) => {
    // console.log("User to check", user);
    const token = jwt.sign({ command: '' }, '');

    const request = axios({
        url: 'http://engineershop.eu:4005/update-settings',
        method: 'post',
        data: {
            token,
            settingsForm
        }
    });

    return {
        type: 'UPDATE_SETTINGS',
        payload: request
    }
}
