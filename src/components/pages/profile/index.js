import { connect } from 'react-redux';
import Profile from './component';
import { setAuthToken, handleGetAllProvince } from '../../layouts/navbar/action';

const mapStateToProps = (state) => ({
  accessToken: state.authReducer.accessToken,
  province: state.authReducer.province
});
const mapDispathToProps = (dispatch) => ({
  setAuthToken: (token) => dispatch(setAuthToken(token)),
  handleGetAllProvince: () => dispatch(handleGetAllProvince())
});

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Profile);