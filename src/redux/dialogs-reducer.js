const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your it-kamacytra'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
    ],
    dialogs: [
        {id: 1, name: 'Гном'},
        {id: 2, name: 'Соседка'},
        {id: 3, name: 'Андрей'},
        {id: 4, name: 'Света'},
        {id: 5, name: 'Саша'},
        {id: 6, name: 'Валера'}
    ],
}


const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE: {
            let body = action.newMessageBody;
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, {id: 6, message: body}]
            };
        }
        default:
            return state

    }

    return state;
}

export const sendMessageCreator = (newMessageBody) => {
    return {
        type: SEND_MESSAGE,
        newMessageBody
    }
}

export default dialogsReducer;