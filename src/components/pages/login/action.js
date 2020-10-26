import { loginWithGoogle } from '../../../services/api/sso';
import { getAllProvince } from '../../../services/api/location';
// import { createUser } from '../../../services/api/user';
import { SET_AUTH_TOKEN, SET_SHOW_FORM_REGISTER, SET_ALL_PROVINCE } from '../../../helpers/actionTypes';

const handleLogin = () => async (dispatch) => {
  await loginWithGoogle()
    .then(async (response) => {
      const { status, data } = response;

      if (status === 200) {
        dispatch(setAuthToken(data));
      } else if (status === 404) {
        dispatch(setShowFormRegistration(data));
      }
    })
    .catch((error) => {
      dispatch(setAuthToken());
    });
}

const handleGetAllProvince = () => async (dispatch) => {
  await getAllProvince()
    .then((response) => {
      const { data } = response;

      if (data) {
        dispatch(setAllProvince(data.provinsi));
      } else {
        dispatch(setAllProvince());
      }
    })
    .catch((error) => {
      dispatch(setAllProvince());
    })
}

const setAuthToken = (token) => {
  return {
    type: SET_AUTH_TOKEN,
    payload: {
      accessToken: token
    }
  }
}

const setShowFormRegistration = (userData) => {
  return {
    type: SET_SHOW_FORM_REGISTER,
    payload: {
      showFormRegister: userData
    }
  }
}

const setAllProvince = (provinceData) => {
  return {
    type: SET_ALL_PROVINCE,
    payload: {
      province: provinceData
    }
  }
}

export {
  handleLogin,
  handleGetAllProvince
}