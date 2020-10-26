import { fireDatabase } from '../firebase';
import { setResponse } from '../../helpers/response';

const reference = '/user';

const getUserByUid = (uid) => {
  return new Promise((resolve, reject) => {
    fireDatabase.ref(`${reference}/${uid}`).once('value')
      .then((response) => {
        const userData = response.val();

        if (userData) {
          resolve(setResponse(200, userData));
        }
        resolve(setResponse(404));
      }, (error) => {
        console.log(error);
        reject(setResponse(500));
      });
  });
}

const createUser = (userData, uid) => {
  return new Promise((resolve, reject) => {
    fireDatabase.ref(`${reference}/${uid}`)
      .set(userData)
      .then(() => {
        resolve(setResponse(200, userData));
      }, (error) => {
        console.log(error);
        reject(setResponse(500));
      });
  });
}

export {
  getUserByUid,
  createUser
}