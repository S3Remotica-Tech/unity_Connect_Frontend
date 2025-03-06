import MemberListReducer from "../../Redux/Reducer/MemberReducer";
import { initialState as INITIAL_STATE } from "../../Redux/Reducer/MemberReducer";

describe('checks for Member Reducer', () => {

    it('it should check for GET_MEMBER', () => {
        const action = {
            type: 'GET_MEMBER',
            payload: {
                response: {
                    data: []
                },
                statusCode: 200
            }
        }
        expect(MemberListReducer(INITIAL_STATE, action)).toStrictEqual({
            id: 0,
            Memberdata: [],
            statusCodeMemberList: 200,
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
            GetMemberId: [],
            statusCodeForMemberId: 0,
            MemberIdErrorMsg: '',
            overview:'',
            statusCodeForOverview: 0,
            getComment : [],
            statusCodeForComment: 0,
            addComment : '',
            statusCodeForAddComment: 0,
        })
    })

    it('it should check for CLEAR_STATUS_CODE_MEMBER_LIST', () => {
        const action = {
            type: 'CLEAR_STATUS_CODE_MEMBER_LIST',
            payload: {
                response: {
                    data: []
                },
                statusCode: 200
            }
        }
        expect(MemberListReducer({ ...INITIAL_STATE, statusCodeMemberList: 200 }, action)).toStrictEqual({
            id: 0,
            Memberdata: [],
            statusCodeMemberList: 0,
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
            GetMemberId: [],
            statusCodeForMemberId: 0,
            MemberIdErrorMsg: '',
            overview:'',
            statusCodeForOverview: 0,
            getComment : [],
            statusCodeForComment: 0,
            addComment : '',
            statusCodeForAddComment: 0,
        })
    })

    it('it should check for DELETE_MEMBER', () => {
        const action = {
            type: 'DELETE_MEMBER',
            payload: {
                statusCode: 200
            }
        }
        expect(MemberListReducer({ ...INITIAL_STATE, statusCodeMemberList: 200 }, action)).toStrictEqual({
            id: 0,
            Memberdata: [],
            statusCodeMemberList: 200,
            deleteMemberStatusCode: 200,
            changestatus: '',
            changestausStatusCode: 0,
            errormsg: '',
            Users: [],
            addUser: '',
            statusCodeForAddUser: 0,
            statusCodeClearForAddUser: 0,
            phoneError: '',
            emailError: '',
            GetMemberId: [],
            statusCodeForMemberId: 0,
            MemberIdErrorMsg: '',
            overview:'',
            statusCodeForOverview: 0,
            getComment : [],
            statusCodeForComment: 0,
            addComment : '',
            statusCodeForAddComment: 0,
        })
    })

    it('it should check for CLEAR_DELETE_MEMBER', () => {
        const action = {
            type: 'CLEAR_DELETE_MEMBER',
            payload: {
                statusCode: 200
            }
        }
        expect(MemberListReducer({ ...INITIAL_STATE, deleteMemberStatusCode: 200 }, action)).toStrictEqual({
            id: 0,
            Memberdata: [],
            statusCodeMemberList: 0,
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
            GetMemberId: [],
            statusCodeForMemberId: 0,
            MemberIdErrorMsg: '',
            overview:'',
            statusCodeForOverview: 0,
            getComment : [],
            statusCodeForComment: 0,
            addComment : '',
            statusCodeForAddComment: 0,
        })
    })

    it('it should check for DEFAULT CASE', () => {
        const action = {
            type: 'CLEAR _DELETE_MEMBER_TYPE',
            payload: {
                statusCode: 200
            }
        }
        expect(MemberListReducer({ ...INITIAL_STATE }, action)).toStrictEqual({
            id: 0,
            Memberdata: [],
            statusCodeMemberList: 0,
            deleteMemberStatusCode: 0,
            changestatus: '',
            errormsg: '',
            changestausStatusCode: 0,
            Users: [],
            addUser: '',
            statusCodeForAddUser: 0,
            statusCodeClearForAddUser: 0,
            phoneError: '',
            emailError: '',
            overview:'',
            statusCodeForOverview: 0,
            getComment : [],
            statusCodeForComment: 0,
            addComment : '',
            statusCodeForAddComment: 0,
            GetMemberId: [],
            statusCodeForMemberId: 0,
            MemberIdErrorMsg: '',

        })
    })

})