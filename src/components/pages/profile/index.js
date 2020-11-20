import { connect } from 'react-redux';
import Profile from './component';

const mapStateToProps = (state) => ({
  accessToken: state.authReducer.accessToken,
  province: state.authReducer.province
});
const mapDispathToProps = (dispatch) => ({
  // getData: (id, data) => dispatch(getData(id, data))
});

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Profile);