import {
    INVITE_INFO,
    INVITE_STATUS
} from '../constants/invite'

let defaultState = {
    invite: {
        groomName: '',
        brideName: '',
        startTime: '',
        address: '',
        banner: '',
    },
    statue: 'loading'
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
                statue: action.statue
            };
        default:
            return state
    }
}
