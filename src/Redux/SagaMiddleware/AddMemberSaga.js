import { call, takeEvery, put } from 'redux-saga/effects';
import { addMember } from '../Action/AddMemberAction';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';

function* handleAddMember(datum) {


    const response = yield call(addMember, datum.payload);

    if (response.statusCode === 200 || response.status === 200) {

        yield put({
            type: 'ADD_USER_SUCCESS',
            payload: { response: response.data, statusCode: response.statusCode || response.status },
        });

        toast.success(response.message, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
                backgroundColor: "#E6F6E6",
                color: "black",
                borderRadius: "60px",
                fontFamily: "Gilroy",
                fontWeight: 600,
                fontSize: 14,
                textAlign: "start",
                display: "flex",
                alignItems: "center",
                padding: "10px",
            },
        });

    } else if (response.statusCode === 202) {
        yield put({ type: 'PHONE_ERROR', payload: response.message });
    } else if (response.statusCode === 203) {
        yield put({ type: 'EMAIL_ERROR', payload: response.message });
    }
    if (response) {
        refreshToken(response);
    }
}

function refreshToken(response) {

    if (response && response.refresh_token) {
        const refreshTokenGet = response.refresh_token
        const cookies = new Cookies()
        cookies.set('UnityConnectToken', refreshTokenGet, { path: '/' });
    } else if (response.status === 206 || response.statusCode === 206) {
        const message = response.status || response.statusCode
        const cookies = new Cookies()
        cookies.set('Unity_ConnectToken_Access-Denied', message, { path: '/' });
    }

}


function* AddMemberSaga() {
    yield takeEvery('MEMBERINFO', handleAddMember);
}

export default AddMemberSaga;
