import { SET_ARTICLE } from '../../../helpers/actionTypes';

const initialState = {
  article: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ARTICLE:
      return {
        ...state,
        article: action.payload
      }
    default:
      return state
  }
}

export default reducer;