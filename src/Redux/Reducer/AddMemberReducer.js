
export const initialState = {
    Users: [],
    addUser: '',
    statusCodeForAddUser: 0,
    statusCodeClearForAddUser: 0,
    phoneError: '',
    emailError: '',
}

const AddMemberReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ADD_USER_SUCCESS':
            return { ...state, addUser: action.payload.response, statusCodeForAddUser: action.payload.statusCode }

        case 'EDIT_USER_SUCCESS':
            return { ...state, EditUser: action.payload.message, statusCodeForEditUser: action.payload.statusCode }
        case 'CLEAR_STATUS_CODES':
            return { ...state, statusCodeClearForAddUser: 0 }
        case 'EDIT_CLEAR_STATUS_CODES':
            return { ...state, statusCodeClearForEditUser: 0 }
        case 'PHONE_ERROR':
            return { ...state, phoneError: action.payload }

        case 'CLEAR_PHONE_ERROR':
            return { ...state, phoneError: '' }

        case 'EMAIL_ERROR':
            return { ...state, emailError: action.payload }

        case 'CLEAR_EMAIL_ERROR':
            return { ...state, emailError: '' }

        default:
            return state

    }
}
export default AddMemberReducer;