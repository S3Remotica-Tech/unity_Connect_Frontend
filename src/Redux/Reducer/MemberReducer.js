export const initialState = {
    id: 0,
    statusCodeMemberList: 0,
    ActiveMemberdata: [],
    NonActiveMemberdata: [],
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

}
const MemberListReducer = (state = initialState, action) => {



    switch (action.type) {

        case 'GET_MEMBER':
return { ...state, ActiveMemberdata: action.payload.response.ActiveMembers, NonActiveMemberdata: action.payload.response.NonActiveMembers
 
, statusCodeMemberList: action.payload.statusCode }
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




        default:
            return state;

    }


}
export default MemberListReducer;