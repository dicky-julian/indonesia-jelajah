import { connect } from 'react-redux';
import Profile from './component';
import { handleGetAllProvince } from '../../layouts/navbar/action';

const mapStateToProps = (state) => ({
  accessToken: state.authReducer.accessToken,
  province: state.authReducer.province
});
const mapDispathToProps = (dispatch) => ({
  handleGetAllProvince: () => dispatch(handleGetAllProvince())
});

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Profile);