export const initialState = {
    id: 0,
    statusCodeMemberList: 0,
    Memberdata: [],
    deleteMemberStatusCode: 0,
    changestatus: '',
    changestausStatusCode: 0,
    errormsg: '',
    Users: [],
    addUser: '',
    statusCodeForAddUser: 0,
    statusCodeClearForAddUser: 0,
    phoneError: '',
    emailError: '',
    overview: '',
    statusCodeForOverview: 0,
    getComment: [],
    statusCodeForComment: 0,
    addComment: '',
    statusCodeForAddComment: 0,
    GetMemberId: [],
    statusCodeForMemberId: 0,
    MemberIdErrorMsg: '',


}
const MemberListReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'GET_MEMBER':
            return { ...state, Memberdata: action.payload.response.data, statusCodeMemberList: action.payload.statusCode }
        case 'CLEAR_STATUS_CODE_MEMBER_LIST':
            return { ...state, statusCodeMemberList: 0 }

        case 'DELETE_MEMBER':
            return { ...state, deleteMemberStatusCode: action.payload.statusCode }
        case 'CLEAR_DELETE_MEMBER':
            return { ...state, deleteMemberStatusCode: 0 }
        case 'STATUS_MEMBER':
            return { ...state, changestatus: action.payload.response, changestausStatusCode: action.payload.statusCode }
        case 'CLEAR_STATUS_MEMBER':
            return { ...state, changestausStatusCode: 0 }
        case 'ERROR':
            return { ...state, errormsg: action.payload }
        case 'CLEAR_ERROR':
            return { ...state, errormsg: '' }


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

        case 'GET_MEMBER_ID_SUCCESSS':
            return { ...state, GetMemberId: action.payload.response, statusCodeForMemberId: action.payload.response }
        case 'GET_MEMBER_ID_ERROR':
            return { ...state, MemberIdErrorMsg: action.payload.message }         
        case 'OVERVIEW_MEMBER':
            return { ...state, overview: action.payload.response, statusCodeForOverview: action.payload.statusCode }
        case 'CLEAR_OVERVIEW_MEMBER':
            return { ...state, statusCodeForOverview: 0 }

        case 'GET_COMMENTS':
            return { ...state, getComment: action.payload.response.data, statusCodeForComment: action.payload.statusCode }
        case 'CLEAR_STATUS_CODE_GET_COMMENTS':
            return { ...state, statusCodeForComment: 0 }

        case 'ADD_COMMENTS':
            return { ...state, addComment: action.payload.response, statusCodeForAddComment: action.payload.statusCode }
        case 'CLEAR_STATUS_CODE_ADD_COMMENTS':
            return { ...state, statusCodeForAddComment: 0 }

        default:
            return state;

    }


}
export default MemberListReducer;