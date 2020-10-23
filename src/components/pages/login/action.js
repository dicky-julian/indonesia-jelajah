import { loginWithGoogle } from '../../../services/api/sso';

const login = async () => (dispatch) => {
  await loginWithGoogle()
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}