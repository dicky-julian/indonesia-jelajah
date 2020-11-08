import { connect } from 'react-redux';
import Destination from './component';

const mapStateToProps = (state) => ({
  province: state.authReducer.province
});
const mapDispathToProps = (dispatch) => ({
  // getData: (id, data) => dispatch(getData(id, data))
});

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Destination);