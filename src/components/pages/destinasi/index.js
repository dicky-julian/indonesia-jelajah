import { connect } from 'react-redux';
import Destination from './component';
import { handleGetLocation } from '../../layouts/navbar/action';

const mapStateToProps = (state) => ({
  province: state.authReducer.province,
  dataLocation: state.authReducer.location,
});
const mapDispathToProps = (dispatch) => ({
  handleGetLocation: () => dispatch(handleGetLocation())
});

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Destination);