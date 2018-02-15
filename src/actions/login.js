import axios from 'axios';

export const login = (form) => {
    console.log('Form got', form);
    const request = axios.post('http://engineershop.eu:4005/login', {
        form
    });

    return {
        type: 'LOGIN',
        payload: request
    }

}
