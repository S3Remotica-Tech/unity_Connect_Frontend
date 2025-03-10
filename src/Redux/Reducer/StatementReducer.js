export const initialState = {
    id: 0,
    StatementList: [],
    statusCodeForStatement:0,
    StatementErrorMsg: '',
   

}
const StatementReducer = (state = initialState, action) => {
  
    switch (action.type) {

        case 'GET_STATEMENT_LIST':
            return {
                ...state, StatementList: action.payload.response.data, statusCodeForStatement: action.payload.statusCode }
        case 'CLEAR_STATEMENT_ERROR':
            return { ...state, statusCodeForStatement: 0 }
        case 'GET_STATEMENT_ERROR_MESSAGE':
            return { ...state, StatementErrorMsg: action.payload.message }   

        default:
            return state;

    }


}
export default StatementReducer;