import RootReducer from "../../Redux/Reducer/RootReducer";
import SignInReducer from "../../Redux/Reducer/SignInReducer";
import CreateAccountReducer from "../../Redux/Reducer/CreateAccountReducer";
import SettingReducer from "../../Redux/Reducer/SettingReducer";
import MemberListReducer from "../../Redux/Reducer/MemberReducer";
import SettingLoanReducer from "../../Redux/Reducer/SettingLoanReducer";
import SettingAddExpensesReducer from "../../Redux/Reducer/SettingsExpensesReducer";
import LoanReducer from "../../Redux/Reducer/LoanReducer";
import StatementReducer from "../../Redux/Reducer/StatementReducer";
import ExpensesReducer from "../../Redux/Reducer/ExpensesReducer";
import ReportReducer from "../../Redux/Reducer/ReportsReducer";


describe('it should check for root reducer', () => {
    it('checks for common reducer', () => {
        const initialState = RootReducer(undefined, { type: "INIT" });
        expect(initialState).toEqual({
            SignIn: SignInReducer(undefined, { type: "INIT" }),
            CreateAccount: CreateAccountReducer(undefined, { type: "INIT" }),
            Settings: SettingReducer(undefined, { type: "INIT" }),
            Member: MemberListReducer(undefined, { type: "INIT" }),
            SettingExpenses:SettingAddExpensesReducer(undefined, { type: "INIT" }),
            SettingLoan:SettingLoanReducer(undefined, { type: "INIT" }),
            Loan: LoanReducer(undefined, { type: "INIT" }),
            Statement: StatementReducer(undefined, { type: "INIT" }),
            Expenses: ExpensesReducer(undefined, { type: "INIT" }),
            Report: ReportReducer(undefined, { type: "INIT" })
        });
    })
})