import { connect } from 'react-redux';
import { handleLogin, handleRegister, handleSignOut, handleGetLocation } from './action';
import Navbar from './component';

const mapStateToProps = (state) => ({
  accessToken: state.authReducer.accessToken,
  showFormRegister: state.authReducer.showFormRegister,
  dataLocation: state.authReducer.location,
  showNotification: state.authReducer.showNotification,
});

const mapDispatchToProps = (dispatch) => ({
  handleLogin: () => dispatch(handleLogin()),
  handleRegister: (userData) => dispatch(handleRegister(userData)),
  handleSignOut: () => dispatch(handleSignOut()),
  handleGetLocation: () => dispatch(handleGetLocation())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);