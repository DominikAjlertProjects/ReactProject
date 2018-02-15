import axios from 'axios';
import _ from 'lodash';

export default function (state = [], action) {
    switch(action.type) {
        case 'GET_NOTES':
        return [ action.payload.data, ...state ];
    }
    return state;
}
