import {
    INVITE_INFO,
    INVITE_STATUS
} from '../constants/invite'

let defaultState = {
    invite: {
        msg: false,
        groomName: '',
        brideName: '',
        startTime: '',
        address: '',
        banner: '',
        location: {},
        music: ''
    },
    status: 'loading'
};

export default function counter(state = defaultState, action) {
    switch (action.type) {
        case INVITE_INFO:
            return {
                ...state,
                invite: action.invite,
            };
        case INVITE_STATUS:
            return {
                ...state,
                status: action.status
            };
        default:
            return state
    }
}
