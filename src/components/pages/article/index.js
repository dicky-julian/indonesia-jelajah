import { connect } from 'react-redux';
import Article from './component';
import { getArticle } from './action';

const mapStateToProps = (state) => ({
  article: state.articleReducer.article
});
const mapDispathToProps = (dispatch) => ({
  getArticle: () => dispatch(getArticle())
  // getData: (id, data) => dispatch(getData(id, data))
});

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Article);