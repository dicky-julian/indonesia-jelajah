import { connect } from 'react-redux';
import ArticleCreator from './component';
import { setArticle } from './action';

const mapStateToProps = (state) => ({
  article: state.articleNoteReducer.article,
  accessToken: state.authReducer.accessToken
});
const mapDispathToProps = (dispatch) => ({
  setArticle: (article) => (dispatch(setArticle(article)))
});

export default connect(
  mapStateToProps,
  mapDispathToProps
)(ArticleCreator);