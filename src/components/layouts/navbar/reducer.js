import { SET_AUTH_TOKEN, SET_SHOW_FORM_REGISTER, SET_SIGN_OUT, SET_ALL_PROVINCE, SET_SHOW_NOTIFICATION, SET_LOCATION } from '../../../helpers/actionTypes';

const initialState = {
  accessToken: '',
  showFormRegister: false,
  showNotification: '',
  province: '',
  location: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      return {
        ...state,
        accessToken: action.payload.accessToken
      }

    case SET_SHOW_FORM_REGISTER:
      return {
        ...state,
        showFormRegister: action.payload.showFormRegister
      }

    case SET_SIGN_OUT:
      return {
        accessToken: '',
        showFormRegister: false,
      }

    case SET_ALL_PROVINCE:
      return {
        ...state,
        province: action.payload.province
      }

    case SET_LOCATION:
      return {
        ...state,
        location: action.payload
      }

    case SET_SHOW_NOTIFICATION:
      return {
        ...state,
        showNotification: action.payload.showNotification
      }

    default:
      return state
  }
}

export default reducer;