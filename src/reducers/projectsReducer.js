import axios from 'axios';
import _ from 'lodash';

export default function (state = [], action) {
    switch(action.type) {
        case 'GET_PROJECTS':
        const projects = action.payload.data.projects;
        console.log("State", state);
        console.log("Projects from reducer", action.payload.data.projects);
        return [ projects, ...state ];

        case 'ADD_PROJECT':
        const res = action.payload.data;
        console.log("Res", res);
        return [ res, ...state];

        case 'ADD_IMG':
        const res1 = action.payload.body;
        console.log("Action.payload.body from ADD_IMG", action.payload.body);
        console.log('Res1', res1);
        return [ res1, ...state];

        case 'REMOVE_PROJECT':
        const res2 = action.payload.data;
        console.log("res2", res2);
        return [ res2, ...state];

        case 'GET_EMAIL':
        const res3 = action.payload.body;
        return [ res3, ...state];
    }
    return state;
}
