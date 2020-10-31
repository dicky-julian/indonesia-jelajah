import { connect } from 'react-redux';
import { handleLogin, handleGetAllProvince } from './action';
import Navbar from './component';

const mapStateToProps = (state) => ({
  accessToken: state.authReducer.accessToken,
  showFormRegister: state.authReducer.showFormRegister,
  province: state.authReducer.province
});

const mapDispatchToProps = (dispatch) => ({
  handleLogin: () => dispatch(handleLogin()),
  handleGetAllProvince: () => dispatch(handleGetAllProvince())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);