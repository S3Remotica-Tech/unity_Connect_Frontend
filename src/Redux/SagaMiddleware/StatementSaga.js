import { call, takeEvery, put } from 'redux-saga/effects';
import { StatementAction } from '../Action/StatementAction';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';

function* handleStatementList() {


    const response = yield call(StatementAction);

    if (response.statusCode === 200 || response.status === 200) {
        
        yield put({
            type: 'GET_STATEMENT_LIST',
            payload: { response: response.data, statusCode: response.statusCode || response.status },
        });

    } else if (response.status === 201 || response.statusCode === 201) {

        yield put({ type: 'CLEAR_STATEMENT_ERROR_MESSAGE', payload: response.data.message });
    }
    if (response) {
        refreshToken(response);
    }
}

function refreshToken(response) {


    if (response.data && response.data.refresh_token) {
        const refreshTokenGet = response.data.refresh_token
        const cookies = new Cookies()
        cookies.set('UnityConnectToken', refreshTokenGet, { path: '/' });
    } else if (response.status === 206) {
        const message = response.status
        const cookies = new Cookies()
        cookies.set('Unity_ConnectToken_Access-Denied', message, { path: '/' });

    }

}

function* StatementSaga() {
    yield takeEvery('STATEMENTLIST', handleStatementList);

}

export default StatementSaga;
