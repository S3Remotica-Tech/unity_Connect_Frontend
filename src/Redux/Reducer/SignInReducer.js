export const initialState = {
    id: 0,
    email_Id: '',
    password: '',
    errorEmail: '',
    errorPassword: '',
    signinsuccessstatuscode: 0,
    JWTtoken: '',
    statusCode: 0,
    isLoggedIn: false,
    profileDetailsList: [],
    profileDetailsErrorMessage: '',
    profileDetailsStatusCode: 0,
    profileDetailsUpdateList: [],
    profileDetailsUpdateStatusCode: 0,
    profileDetailsUpdateErrorMessage: '',
    updatePassword: '',
    updatePasswordError: '',
    updatePasswordStatusCode: 0,
    members: [],
    loans: [],
    transactions: [],


};
const SignInReducer = (state = initialState, action) => {




    switch (action.type) {
        case 'SIGNIN-INFO':
            return {
                ...state, signinsuccessstatuscode: action.payload.statusCode, JWTtoken: action.payload.token,

                loans: action.payload.loans,
                members: action.payload.members,
                transactions: action.payload.transactions,
            }
        case 'REMOVE_LOGIN_STATUS_CODE':
            return { ...state, signinsuccessstatuscode: 0 }

        case 'ERROR_EMAIL':
            return { ...state, errorEmail: action.payload };
        case 'ERROR_PASSWORD':
            return { ...state, errorPassword: action.payload };
        case 'SIGNIN-SUCCESS':
            return { ...state, isLoggedIn: true };
        case 'LOGOUT':
            return { ...state, isLoggedIn: false, signinsuccessstatuscode: 0 };
        case 'CLEAR_ERROR_EMAIL':
            return { ...state, errorEmail: '', statusCode: 0 };
        case 'CLEAR_ERROR_PASSWORD':
            return { ...state, errorPassword: '', statusCode: 0 };
        case 'PROFILE_DETAILS_LIST':
            return {
                ...state,
                profileDetailsList: action.payload.data[0],
                loans: action.payload.loans,
                members: action.payload.members,
                transactions: action.payload.transactions,
                profileDetailsStatusCode: action.payload.statusCode
            }
        case 'PROFILE_DETAILS_ERROR':
            return { ...state, profileDetailsErrorMessage: '', }
        case 'CLEAR_PROFILE_DETAILS_ERROR':
            return { ...state, profileDetailsStatusCode: 0 }

        case 'PROFILE_DETAILS_UPDATE_LIST':
            return { ...state, profileDetailsUpdateStatusCode: action.payload.statusCode }
        case 'PROFILE_DETAILS_UPDATE_ERROR':
            return { ...state, profileDetailsUpdateErrorMessage: action.payload, }
        case 'CLEAR_PROFILE_DETAILS_UPDATE_ERROR':
            return {
                ...state, profileDetailsUpdateStatusCode: 0,
                profileDetailsUpdateErrorMessage: ""
            }

        case 'UPDATE_PASSWORD':
            return { ...state, updatePassword: action.payload.message, updatePasswordStatusCode: action.payload.statusCode }
        case 'UPDATE_PASSWORD_ERROR':
            return { ...state, updatePasswordError: action.payload }
        case 'CLEAR_UPDATE_PASSWORD_ERROR':
            return { ...state, updatePasswordError: "" }
        case 'CLEAR_UPDATE_PASSWORD':
            return { ...state, updatePasswordStatusCode: 0 }
        default:
            return state;
    }
};
export default SignInReducer;