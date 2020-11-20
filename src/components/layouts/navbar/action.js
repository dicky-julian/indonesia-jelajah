import { loginWithGoogle } from '../../../services/api/sso';
import { getAllProvince } from '../../../services/api/location';
import { createUser } from '../../../services/api/user';
import { SET_AUTH_TOKEN, SET_SHOW_FORM_REGISTER, SET_SIGN_OUT, SET_ALL_PROVINCE, SET_SHOW_NOTIFICATION } from '../../../helpers/actionTypes';
import { generateToken } from '../../../helpers/jwt';

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

const handleRegister = (userData) => async (dispatch) => {
  const uid = userData.uid;
  delete userData.uid;

  await createUser(userData, uid)
    .then((response) => {
      const { status, data } = response;
      if (status === 200) {
        console.log(data);
        const accessToken = generateToken(data);
        dispatch(setAuthToken(accessToken));
        dispatch(setShowFormRegistration(false));
        dispatch(handleShowNotification('Pendaftaran Akun Berhasil!'))
      }
    })
    .catch((error) => {
      dispatch(setShowFormRegistration(false));
    })
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

const handleSignOut = () => {
  return {
    type: SET_SIGN_OUT
  }
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

const handleShowNotification = (message = '') => {
  return {
    type: SET_SHOW_NOTIFICATION,
    payload: {
      showNotification: message
    }
  }
}

export {
  handleLogin,
  handleRegister,
  handleSignOut,
  handleGetAllProvince,
  handleShowNotification
}