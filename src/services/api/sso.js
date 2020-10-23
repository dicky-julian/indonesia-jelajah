import { fireAuth, googleFireAuth } from '../firebase';
import { generateToken } from '../../helpers/jwt';

const loginWithGoogle = () => {
  return new Promise((resolve, reject) => {
    fireAuth.signInWithPopup(googleFireAuth)
      .then((response) => {
        const { displayName, email, photoURL } = response.user;
        const token = generateToken({ displayName, email, photoURL });
        resolve(token);
      })
      .catch((error) => {
        console.log(error);
        reject();
      });
  })
}

export {
  loginWithGoogle,
}