import { fireAuth, googleFireAuth } from '../firebase';
import { generateToken } from '../../helpers/jwt';
import { getUserByUid, createUser } from './user';
import { setResponse } from '../../helpers/response';

const loginWithGoogle = () => {
  return new Promise((resolve, reject) => {
    fireAuth.signInWithPopup(googleFireAuth)
      .then(async (response) => {
        const { uid, displayName, email, photoURL } = response.user;
        const currentUser = await getUserByUid(uid);

        if (currentUser.data) {
          const token = generateToken(currentUser);
          resolve(setResponse(200, token));
        }
        resolve(setResponse(404, {
          uid,
          displayName,
          email,
          photoURL
        }));
      }, (error) => {
        console.log(error);
        reject(setResponse(500));
      });
  });
}

export {
  loginWithGoogle,
}