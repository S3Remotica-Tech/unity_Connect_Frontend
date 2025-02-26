import { call, takeEvery, put } from 'redux-saga/effects';
import {SettingAddExpenses} from '../Action/SettingAction/SettingExpenseAction';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function* SettingAddExpensesPage(action) {
    
      const response = yield call(SettingAddExpenses, action.payload);
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
     
        if (response.status === 200 || response.statusCode === 200) {
            console.log("Success Response:", response.data);
        yield put({ type: 'SETTINGADDEXPENSES', payload: { response: response.data, statusCode: response.status || 
            response.statusCode} });
  
        toast.success('created successfully', {
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
      if(response){
        refreshToken(response)
     }
     
  }



function refreshToken(response) {
     
   if (response && response.refresh_token) {
      const refreshTokenGet = response.refresh_token
      const cookies = new Cookies()
      cookies.set('UnityConnectToken', refreshTokenGet, { path: '/' });
   } else if (response.status === 206 || response.statusCode === 206) {
      const message = response.status ||  response.statusCode   
      const cookies = new Cookies()
      cookies.set('Unity_ConnectToken_Access-Denied', message, { path: '/' });
   }

}
    function* SettingAddExpensesSaga() {
        yield takeEvery('SETTING_ADD_EXPENSES', SettingAddExpensesPage)
      
      
      }
      export default SettingAddExpensesSaga;