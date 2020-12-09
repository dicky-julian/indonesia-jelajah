import { SET_ARTICLE_NOTE } from '../../../helpers/actionTypes';

const setArticle = (article) => {
  return {
    type: SET_ARTICLE_NOTE,
    payload: article
  }
}

export {
  setArticle
}