import { render, screen } from "@testing-library/react";
import Sidebar from "../Component/Sidebar";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
describe('render and check sidebar functionalities', () => {
    
    const mockStore = configureStore()
            const store = mockStore({
                addMember: {
                    statusCodeForAddUser : 200
                  },
                  Settings: {
                    statusCodeMemberID : 200
                  },
                Member: {
                    ActiveMemberdata: [],  
                    NonActiveMemberdata: [] ,
                    statusCodeMemberList:200
                },  
                Loan: {
                    statusCodeLoans: 200
                },
                Statement: {
                    id: 0,
                    StatementList: [],
                    statusCodeForStatement:0,
                    StatementErrorMsg: '',
                },
                Expenses: {
                    getexpenses: []
                },
                SignIn: {
                    profileDetailsList: []
                },
                Report: {
                    statusCodeLoans: 200,
                    getReport: {
                        unsuccessfullPayment: []
                    }
                }
        
            })

    it('it should check for side bar UI', () => {
        render(<Provider store={store}>
            <Sidebar />
        </Provider>)

        expect(screen.getByTestId('container-main')).toBeInTheDocument();
        const toggleButton = screen.getByTestId('button-toggle')
        const menuItem = screen.getByTestId('menu-item-0')
        // expect(toggleButton).toBeInTheDocument();
        expect(menuItem).toBeInTheDocument()
        userEvent.click(toggleButton)
        userEvent.click(menuItem)
    })

    it('it should check for collapse the sidebar', () => {
        render(<Provider store={store}>
            <Sidebar />
        </Provider>)

        expect(screen.getByTestId('container-main')).toBeInTheDocument();

    })

    it('it should UI and select member', () => {
        render(<Provider store={store}>
               <MemoryRouter>
            <Sidebar />
            </MemoryRouter>
        </Provider>)

        expect(screen.getByTestId('container-main')).toBeInTheDocument();
        const defaultItem = screen.getByTestId('div-dashboard')
        expect(defaultItem).toBeInTheDocument();
        const menuItem = screen.getByTestId('menu-item-1')
        expect(menuItem).toBeInTheDocument();
        userEvent.click(menuItem)
        expect(defaultItem).not.toBeInTheDocument();
        expect(screen.getByTestId('div-members')).toBeInTheDocument();
        
    })

    it('it should UI and select loan, expense and statements', () => {
        render(<Provider store={store}>
            <Sidebar />
        </Provider>)

        expect(screen.getByTestId('container-main')).toBeInTheDocument();
        const defaultItem = screen.getByTestId('div-dashboard')
        expect(defaultItem).toBeInTheDocument();
        const menuItem = screen.getByTestId('menu-item-2')
        expect(menuItem).toBeInTheDocument();
        userEvent.click(menuItem)
        expect(defaultItem).not.toBeInTheDocument();
        const divLoan = screen.getByTestId('div-loan')
        expect(divLoan).toBeInTheDocument();
        const expenseMenuItem = screen.getByTestId('menu-item-3')
        expect(expenseMenuItem).toBeInTheDocument();
        userEvent.click(expenseMenuItem);
        expect(divLoan).not.toBeInTheDocument();
        const expensesDiv = screen.getByTestId('div-expenses')
        expect(expensesDiv).toBeInTheDocument();
        const staementsDiv = screen.getByTestId('menu-item-4')
        expect(staementsDiv).toBeInTheDocument();
        userEvent.click(staementsDiv);
        expect(expensesDiv).not.toBeInTheDocument();
        expect(screen.getByTestId('div-statements')).toBeInTheDocument();
        
    })

    it('it should UI and select reports and settings', () => {
        render(<Provider store={store}>
            <Sidebar />
        </Provider>)

        expect(screen.getByTestId('container-main')).toBeInTheDocument();
        const defaultItem = screen.getByTestId('div-dashboard')
        expect(defaultItem).toBeInTheDocument();
        const menuItem = screen.getByTestId('menu-item-5')
        expect(menuItem).toBeInTheDocument();
        userEvent.click(menuItem)
        expect(defaultItem).not.toBeInTheDocument();
        const divReports = screen.getByTestId('div-reports')
        expect(divReports).toBeInTheDocument();
        const settingMenuItem = screen.getByTestId('menu-item-6')
        expect(settingMenuItem).toBeInTheDocument();
        userEvent.click(settingMenuItem);
        expect(divReports).not.toBeInTheDocument();
        const expensesDiv = screen.getByTestId('div-settings')
        expect(expensesDiv).toBeInTheDocument();
        
    })

    it('it should UI and select member for window width < 768', () => {
        Object.defineProperty(window, "innerWidth", {
            writable: true, 
            configurable: true, 
            value: 500, 
          });

        render(<Provider store={store}>
            <MemoryRouter>
            <Sidebar />
            </MemoryRouter>
        </Provider>)

        expect(screen.getByTestId('container-main')).toBeInTheDocument();
        const defaultItem = screen.getByTestId('div-dashboard')
        expect(defaultItem).toBeInTheDocument();
        const menuItem = screen.getByTestId('menu-item-1')
        expect(menuItem).toBeInTheDocument();
        userEvent.click(menuItem)
        expect(defaultItem).not.toBeInTheDocument();
        expect(screen.getByTestId('div-members')).toBeInTheDocument();
        
    })

})