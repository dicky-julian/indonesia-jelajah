import { connect } from 'react-redux';
import ArticleDetail from './component';

const mapStateToProps = (state) => ({

});
const mapDispathToProps = (dispatch) => ({
  // getData: (id, data) => dispatch(getData(id, data))
});

export default connect(
  mapStateToProps,
  mapDispathToProps
)(ArticleDetail);