import axios from 'axios';
import jwt from 'jsonwebtoken';
import superagent from 'superagent';

export const addImg = (file, username) => {
     console.log("FileToUpload from addImg", file);
     console.log("Username from addImg", username);

     let uploadRequest = superagent.post('http://engineershop.eu:4005/upload');
     uploadRequest.field('username', username);
     uploadRequest.attach('file', file);

    return {
        type: 'ADD_IMG',
        payload: uploadRequest
    }
}
