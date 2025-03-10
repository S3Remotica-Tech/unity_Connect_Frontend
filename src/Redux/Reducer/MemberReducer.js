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
    phoneError: '',
    emailError: '',
    overview: '',
    statusCodeForOverview: 0,
    getComment: [],
    statusCodeForComment: 0,
    addComment: '',
    statusCodeForAddComment: 0,
    getStatement: [],
    statusCodeForStatement: 0,
    GetMemberId: [],
    statusCodeForMemberId: 0,
    MemberIdErrorMsg: '',
    GetTransactionsList: [],
    statusCodeTransactions: 0,
    TransactionsErrorMsg: '',
    addRecordPayment: [],
    statusCodeForRecordPayment: 0,
    recordPaymentErrorMessage: '',




}
const MemberListReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'GET_MEMBER':
            return {
                ...state, ActiveMemberdata: action.payload.response.ActiveMembers || [], NonActiveMemberdata: action.payload.response.NonActiveMembers || []

                , statusCodeMemberList: action.payload.statusCode
            }
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
        case 'CLEAR_STATUS_CODES':
            return { ...state, statusCodeClearForAddUser: 0 }
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

        case 'GET_STATEMENT':
            return { ...state, getStatement: action.payload.response.data, statusCodeForStatement: action.payload.statusCode }

        case 'CLEAR_STATUS_CODE_GET_STATEMENT':
            return { ...state, statusCodeForStatement: 0 }

        case 'GET_TRANSACTIONS_LIST':
            return { ...state, GetTransactionsList: action.payload.response, statusCodeTransactions: action.payload.response }
        case 'GET_TRANSACTIONS_ERROR':
            return { ...state, TransactionsErrorMsg: action.payload.message }
        case 'CLEAR_STATUS_CODE_TRANSACTIONS':
            return { ...state, statusCodeTransactions: 0 }

        case 'ADD_RECORD_PAYMENT':
            return { ...state, addRecordPayment: action.payload.response, statusCodeForRecordPayment: action.payload.statusCode }
        case 'CLEAR_STATUS_CODES_RECORD_PAYMENT':
            return { ...state, statusCodeForRecordPayment: 0 }
        case 'RECORD_PAYMENT_ERROR_MSG':
            return { ...state, recordPaymentErrorMessage: '' }
        default:
            return state;

    }


}
export default MemberListReducer;