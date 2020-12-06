import { connect } from 'react-redux';
import DestinasiDetail from './component';
import { setTransaction } from './action';
import { setAuthToken } from '../../layouts/navbar/action';

const mapStateToProps = (state) => ({
  accessToken: state.authReducer.accessToken,
  province: state.authReducer.province
});
const mapDispathToProps = (dispatch) => ({
  setAuthToken: (token) => dispatch(setAuthToken(token)),
  setTransaction: (transactionData) => dispatch(setTransaction(transactionData))
  // getData: (id, data) => dispatch(getData(id, data))
});

export default connect(
  mapStateToProps,
  mapDispathToProps
)(DestinasiDetail);