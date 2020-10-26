import { SET_AUTH_TOKEN, SET_SHOW_FORM_REGISTER, SET_ALL_PROVINCE } from '../../../helpers/actionTypes';

const initialState = {
  accessToken: '',
  showFormRegister: false,
  province: ''
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

    case SET_ALL_PROVINCE:
      return {
        ...state,
        province: action.payload.province
      }

    default:
      return state
  }
}

export default reducer;