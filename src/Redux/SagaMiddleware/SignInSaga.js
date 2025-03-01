import { call, takeEvery, put } from 'redux-saga/effects';
import { SignIncall } from '../Action/SignInAction';
import { toast } from 'react-toastify';


export function* SignIn(action) {
    try {
        const response = yield call(SignIncall, action.payload);

        var toastStyle = {
            backgroundColor: "#E6F6E6",
            color: "black",
            width : "300px",
            borderRadius: "60px",
            height: "20px",
            fontFamily: "Gilroy",
            fontWeight: 600,
            fontSize: 14,
            textAlign: "start",
            display: "flex",
            alignItems: "center",
            padding: "13px",
        };

        if (response.status === 200 && response.data.statusCode === 200) {
            yield put({
                type: 'SIGNIN-INFO',
                payload: {
                   token: response.data.token,
                   message: response.data.message,
                    statusCode: response.status
                }
            });
            toast.success(response.message || "Sign-in successful!", {
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
        else if (response.status === 203 ) {
            yield put({ type: 'ERROR_EMAIL', payload: response.data.message });
        } else if (response.status === 202 ) {
            yield put({ type: 'ERROR_PASSWORD', payload: response.data.message });
        }

    } catch (error) {
        console.error("Sign-in failed", error);
        yield put({ type: 'ERROR_EMAIL', payload: 'Error' });
    }
   
}



function* SignInSaga() {
    yield takeEvery('SIGNININFO', SignIn);
}

export default SignInSaga;



