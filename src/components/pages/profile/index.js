import { connect } from 'react-redux';
import Profile from './component';
import { setAuthToken, handleGetLocation } from '../../layouts/navbar/action';

const mapStateToProps = (state) => ({
  accessToken: state.authReducer.accessToken,
  province: state.authReducer.province,
  dataLocation: state.authReducer.location,
});
const mapDispathToProps = (dispatch) => ({
  setAuthToken: (token) => dispatch(setAuthToken(token)),
  handleGetLocation: () => dispatch(handleGetLocation())
});

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Profile);