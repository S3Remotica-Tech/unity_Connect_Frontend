export const initialState = {
    id: 0,
    email_Id: '',
    password: '',
    errorEmail: '',
    errorPassword: '',
    signinsuccessstatuscode: 0,
    JWTtoken: '',
    statusCode: 0,
    isLoggedIn: false
};
const SignInReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SIGNIN-INFO':
            return { ...state, signinsuccessstatuscode: action.payload.statusCode, JWTtoken: action.payload.token }
        case 'REMOVE_LOGIN_STATUS_CODE':
            return { ...state, signinsuccessstatuscode: 0 }

        case 'ERROR_EMAIL':
            return { ...state, errorEmail: action.payload };
        case 'ERROR_PASSWORD':
            return { ...state, errorPassword: action.payload };
        case 'SIGNIN-SUCCESS':
            return { ...state, isLoggedIn: true };
        case 'LOGOUT':
            return { ...state, isLoggedIn: false };
        case 'CLEAR_ERROR_EMAIL':
            return { ...state, errorEmail: '', statusCode: 0 };
        case 'CLEAR_ERROR_PASSWORD':
            return { ...state, errorPassword: '', statusCode: 0 };
        default:
            return state;
    }
};
export default SignInReducer;
