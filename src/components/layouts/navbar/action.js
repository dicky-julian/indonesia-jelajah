import { loginWithGoogle } from '../../../services/api/sso';
import { getAllProvince } from '../../../services/api/location';
import { createUser } from '../../../services/api/user';
import { SET_AUTH_TOKEN, SET_SHOW_FORM_REGISTER, SET_SIGN_OUT, SET_ALL_PROVINCE, SET_SHOW_NOTIFICATION } from '../../../helpers/actionTypes';
import { generateToken } from '../../../helpers/jwt';
import { showNotification } from '../../layouts/base/notification';

const handleLogin = () => async (dispatch) => {
  await loginWithGoogle()
    .then(async (response) => {
      const { status, data } = response;
      if (status === 200) {
        dispatch(setAuthToken(data));
        showNotification('Berhasil', 'Login berhasil!', 'success');
      } else if (status === 404) {
        dispatch(setShowFormRegistration(data));
      }
    })
    .catch((error) => {
      dispatch(setAuthToken());
      showNotification('Kesalahan', 'Terjadi kesalahan ketika masuk.', 'danger');
    });
}

const handleRegister = (userData) => async (dispatch) => {
  const uid = userData.uid;

  await createUser(userData, uid)
    .then((response) => {
      const { status, data } = response;
      if (status === 200) {
        const accessToken = generateToken(data);
        dispatch(setAuthToken(accessToken));
        dispatch(setShowFormRegistration(false));
        showNotification('Berhasil', 'Pendaftaran akun berhasil!', 'success');
      }
    })
    .catch(() => {
      dispatch(setShowFormRegistration(false));
      showNotification('Kesalahan', 'Terjadi kesalahan ketika mendaftarkan akun.', 'danger');
    })
}


const handleGetAllProvince = () => async (dispatch) => {
  await getAllProvince()
    .then((response) => {
      const { data } = response;

      if (data) {
        dispatch(setAllProvince(data));
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

export {
  handleLogin,
  handleRegister,
  handleSignOut,
  handleGetAllProvince,
  setAuthToken
}