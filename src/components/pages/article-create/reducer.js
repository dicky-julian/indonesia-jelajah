import { SET_ARTICLE_NOTE } from '../../../helpers/actionTypes';

const initialState = {
  article: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ARTICLE_NOTE:
      return {
        ...state,
        article: action.payload
      }
    default:
      return state
  }
}

export default reducer;