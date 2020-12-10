import { loginWithGoogle } from '../../../services/api/sso';
import { getDataLocation } from '../../../services/api/location';
import { createUser } from '../../../services/api/user';
import { SET_AUTH_TOKEN, SET_SHOW_FORM_REGISTER, SET_SIGN_OUT, SET_LOCATION } from '../../../helpers/actionTypes';
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

const handleGetLocation = () => async (dispatch) => {
  await getDataLocation()
    .then((response) => {
      dispatch(setDataLocation(response))
    })
    .catch(() => {
      dispatch(setDataLocation(null));
    })
}

const setDataLocation = (locationData) => ({
  type: SET_LOCATION,
  payload: locationData
})

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

export {
  handleLogin,
  handleRegister,
  handleSignOut,
  handleGetLocation,
  setAuthToken
}