import { connect } from 'react-redux';
import { handleLogin, handleRegister, handleSignOut, handleGetAllProvince, handleShowNotification } from './action';
import Navbar from './component';

const mapStateToProps = (state) => ({
  accessToken: state.authReducer.accessToken,
  showFormRegister: state.authReducer.showFormRegister,
  province: state.authReducer.province,
  showNotification: state.authReducer.showNotification,
});

const mapDispatchToProps = (dispatch) => ({
  handleLogin: () => dispatch(handleLogin()),
  handleRegister: (userData) => dispatch(handleRegister(userData)),
  handleGetAllProvince: () => dispatch(handleGetAllProvince()),
  handleSignOut: () => dispatch(handleSignOut()),
  handleShowNotification: () => dispatch(handleShowNotification())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);