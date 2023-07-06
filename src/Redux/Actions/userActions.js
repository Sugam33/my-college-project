import * as userConstants from "../Constants/userConstants";
import * as userApi from "../APIs/userServices";
import toast from "react-hot-toast";


// login action
const loginAction = (user) => async (dispatch) => {
    try {
        dispatch({ type: userConstants.USER_LOGIN_REQUEST });
        const response = await userApi.loginService(datas);
        dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
    }
    catch(error) {
        dispatch({ type: userConstants.USER_LOGIN_FAIL, payload: error });
        toast.error(error);
    }
};