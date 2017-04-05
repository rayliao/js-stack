import Immutable from 'immutable'

import {
    SAY_HELLO,
    SAY_HELLO_ASYNC_REQUEST,
    SAY_HELLO_ASYNC_SUCCESS,
    SAY_HELLO_ASYNC_FAILURE,
} from '../action/hello'

const initialState = Immutable.fromJS({
    message: 'Initial reducer message',
    messageAsync: 'Initial reducer message for async call',
})

const helloReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAY_HELLO:
            console.log(action)
            return state.set('message', action.payload)
        case SAY_HELLO_ASYNC_REQUEST:
            return state.set('messageAsync', 'loading...')
        case SAY_HELLO_ASYNC_SUCCESS:
            return state.set('messageAsync', action.payload)
        case SAY_HELLO_ASYNC_FAILURE:
            return state.set('messageAsync', 'No message received, pls check your connection')
        default:
            return state
    }
}

export default helloReducer