export const initialState = {
    id: 0,
    statusCodeMemberList: 0,
    Memberdata: [],
    deleteMemberStatusCode: 0,
    changestatus: '',
    changestausStatusCode: 0,
    errormsg: ''

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

        default:
            return state;

    }


}
export default MemberListReducer;