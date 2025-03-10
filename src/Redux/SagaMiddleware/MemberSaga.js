import { call, takeEvery, put } from 'redux-saga/effects';
import { ActiveMemberGetAction, ActiveMemberDeleteAction, ActiveMemberStatusAction, addMember, GetMemberId, MemberOverviewAction, GetCommentAction, AddCommentAction, GetStatementAction, TransactionsAction, RecordPaymentAction } from '../Action/MemberAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';

function* handleMemberList() {

    const response = yield call(ActiveMemberGetAction);



    if (response.statusCode === 200 || response.status === 200) {
        yield put({
            type: 'GET_MEMBER',
            payload: { response: response.data, statusCode: response.statusCode || response.status },
        });

    } else if (response.status === 201 || response.statusCode === 201) {

        yield put({ type: 'ERROR', payload: response.data.message });
    }
    if (response) {
        refreshToken(response);
    }
}

function* handledeleteMember(action) {

    const response = yield call(ActiveMemberDeleteAction, action.payload);
    var toastStyle = {
        backgroundColor: "#E6F6E6",
        color: "black",
        width: "auto",
        borderRadius: "60px",
        height: "20px",
        fontFamily: "Gilroy",
        fontWeight: 600,
        fontSize: 14,
        textAlign: "start",
        display: "flex",
        alignItems: "center",
        padding: "10px",

    };

    if (response.statusCode === 200 || response.status === 200) {
        yield put({
            type: 'DELETE_MEMBER',
            payload: { response: response.data, statusCode: response.statusCode || response.status },
        });
        toast.success(response.data.message, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyle,
        });

    }
    if (response) {
        refreshToken(response);
    }
}

function* handleStatusMember(action) {

    const response = yield call(ActiveMemberStatusAction, action.payload);


    var toastStyle = {
        backgroundColor: "#E6F6E6",
        color: "black",
        width: "auto",
        borderRadius: "60px",
        height: "20px",
        fontFamily: "Gilroy",
        fontWeight: 600,
        fontSize: 14,
        textAlign: "start",
        display: "flex",
        alignItems: "center",
        padding: "10px",

    };

    if (response.statusCode === 200 || response.status === 200) {
        yield put({
            type: 'STATUS_MEMBER',
            payload: { response: response.data, statusCode: response.statusCode || response.status },
        });
        toast.success(response.data.message, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyle,
        });

    }
    if (response) {
        refreshToken(response);
    }
}

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

function* handleOverview(action) {

    const response = yield call(MemberOverviewAction, action.payload);


    var toastStyle = {
        backgroundColor: "#E6F6E6",
        color: "black",
        width: "auto",
        borderRadius: "60px",
        height: "20px",
        fontFamily: "Gilroy",
        fontWeight: 600,
        fontSize: 14,
        textAlign: "start",
        display: "flex",
        alignItems: "center",
        padding: "10px",

    };

    if (response.statusCode === 200 || response.status === 200) {
        yield put({
            type: 'OVERVIEW_MEMBER',
            payload: { response: response.data, statusCode: response.statusCode || response.status },
        });
        toast.success(response.data.message, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyle,
        });

    }
    if (response) {
        refreshToken(response);
    }
}

function* handleGetComment(action) {

    const response = yield call(GetCommentAction, action.payload);



    if (response.statusCode === 200 || response.status === 200) {
        yield put({
            type: 'GET_COMMENTS',
            payload: { response: response.data, statusCode: response.statusCode || response.status },
        });



    } else if (response.status === 201 || response.statusCode === 201) {

        yield put({ type: 'ERROR', payload: response.data.message });
    }
    if (response) {
        refreshToken(response);
    }
}

function* handleAddComment(action) {

    const response = yield call(AddCommentAction, action.payload);


    var toastStyle = {
        backgroundColor: "#E6F6E6",
        color: "black",
        width: "auto",
        borderRadius: "60px",
        height: "20px",
        fontFamily: "Gilroy",
        fontWeight: 600,
        fontSize: 14,
        textAlign: "start",
        display: "flex",
        alignItems: "center",
        padding: "10px",

    };

    if (response.statusCode === 200 || response.status === 200) {
        yield put({
            type: 'ADD_COMMENTS',
            payload: { response: response.data, statusCode: response.statusCode || response.status },
        });
        toast.success(response.data.message, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: toastStyle,
        });

    }
    if (response) {
        refreshToken(response);
    }
}


function* handleGetStatement(action) {

    const response = yield call(GetStatementAction, action.payload);



    if (response.statusCode === 200 || response.status === 200) {
        yield put({
            type: 'GET_STATEMENT',
            payload: { response: response.data, statusCode: response.statusCode || response.status },
        });



    } else if (response.status === 201 || response.statusCode === 201) {

        yield put({ type: 'ERROR', payload: response.data.message });
    }
    if (response) {
        refreshToken(response);
    }
}

function* handleGet_Member_Id(action) {


    const response = yield call(GetMemberId, action.payload);


    if (response.status === 200 || response.data.statusCode === 200) {
        yield put({
            type: 'GET_MEMBER_ID_SUCCESSS',
            payload: { response: response.data, statusCode: response.status || response.data.statusCode },
        });

    } else if (response.status === 201 || response.statusCode === 201) {

        yield put({ type: 'GET_MEMBER_ID_ERROR', payload: response.data.message });
    }
    if (response) {
        refreshToken(response);
    }


}

function* handleGet_Transactions(action) {


    const response = yield call(TransactionsAction, action.payload);


    if (response.status === 200 || response.data.statusCode === 200) {
        yield put({
            type: 'GET_TRANSACTIONS_LIST',
            payload: { response: response.data, statusCode: response.status || response.data.statusCode },
        });

    } else if (response.status === 201 || response.statusCode === 201) {

        yield put({ type: 'GET_TRANSACTIONS_ERROR', payload: response.data.message });
    }
    if (response) {
        refreshToken(response);
    }


}

function* handleRecordPayment(payload) {



    const response = yield call(RecordPaymentAction, payload);

    if (response.statusCode === 200 || response.status === 200) {

        yield put({
            type: 'ADD_RECORD_PAYMENT',
            payload: { response: response.message, statusCode: response.statusCode || response.status },
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

    } else if (response.statusCode === 201) {
        yield put({ type: 'RECORD_PAYMENT_ERROR_MSG', payload: response.message });
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


function* MemberSaga() {
    yield takeEvery('MEMBERLIST', handleMemberList);
    yield takeEvery('DELETEMEMBER', handledeleteMember);
    yield takeEvery('CHANGE_STATUS', handleStatusMember);
    yield takeEvery('MEMBERINFO', handleAddMember);
    yield takeEvery('GET_MEMBER_ID', handleGet_Member_Id)
    yield takeEvery('MEMBEROVERVIEW', handleOverview);
    yield takeEvery('GETCOMMENTS', handleGetComment);
    yield takeEvery('ADDCOMMENTS', handleAddComment);
    yield takeEvery('GETSTATEMENT', handleGetStatement);
    yield takeEvery('GETTRANSACTIONS', handleGet_Transactions)
    yield takeEvery('ADDRECORDPAYMENT', handleRecordPayment)
}

export default MemberSaga;
