export const initialState = {
   MemberIDprefix: '',
   MemberIdsuffix: '',
   statusCodeMemberID: 0,
   LoanIDprefix: '',
   LoanIDsuffix: '',
   statusCodeLoanID: 0,
   error: '',
   TransactionIDprefix: '',
   TransactionIDsuffix: '',
   statusCodeTransactionID: 0,


}
const SettingReducer = (state = initialState, action) => {

   switch (action.type) {

      case 'SETTINGS_MEMBER_ID':
         return {
            ...state, MemberIDprefix: action.payload.prefix, MemberIdsuffix: action.payload.suffix,
            statusCodeMemberID: action.payload.statusCode
         }
      case 'CLEAR_STATUS_CODE_MEMBER_ID':
         return { ...state, statusCodeMemberID: 0 }

      case 'CLEAR_MEMBER_ID':
         return {
            ...state,
            MemberIDprefix: "",
            MemberIdsuffix: ""
         };

      case 'SETTINGS_LOAN_ID':
         return { ...state, LoanIDprefix: action.payload.prefix, LoanIDsuffix: action.payload.suffix, statusCodeLoanID: action.payload.statusCode }
      case 'CLEAR_STATUS_CODE_LOAN_ID':
         return { ...state, statusCodeLoanID: 0 }
      case 'ERROR':
         return { ...state, error: action.payload }
      case 'CLEAR_ERROR':
         return { ...state, error: '' }

      case 'SETTINGS_TRANSACTION_ID':
         return {
            ...state, TransactionIDprefix: action.payload.Prefix,
            TransactionIDsuffix: action.payload.Suffix, statusCodeTransactionID: action.payload.statusCode
         }
      case 'CLEAR_STATUS_CODE_TRANSACTION_ID':
         return { ...state, statusCodeTransactionID: 0 }
      case "CLEAR_MEMBER_ID_ERROR":
         return { ...state, error: state.currentComponent === "LoanID" ? state.error : "" };

      case "CLEAR_LOAN_ID_ERROR":
         return { ...state, error: state.currentComponent === "MemberID" ? state.error : "" };

         
      case "CLEAR_TRANSACTION_ID_ERROR":
         return { ...state, error: state.currentComponent === "TransactionID" ? state.error : "" };

      default:
         return state;
   }

}
export default SettingReducer;