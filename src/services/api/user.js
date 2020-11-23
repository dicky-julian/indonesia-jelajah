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
        reject(setResponse(500));
      });
  });
}

const getUserByKey = (key, value) => {
  return new Promise((resolve, reject) => {
    fireDatabase.ref(reference)
      .orderByChild(key)
      .equalTo(value).on("child_added", ((snapshot) => {
        resolve(snapshot.key);
      }));
  })
}

const createUser = (userData, uid) => {
  return new Promise((resolve, reject) => {
    fireDatabase.ref(`${reference}/${uid}`)
      .set(userData)
      .then(() => {
        resolve(setResponse(200, userData));
      }, (error) => {
        reject(setResponse(500));
      });
  });
}

export {
  getUserByUid,
  getUserByKey,
  createUser
}