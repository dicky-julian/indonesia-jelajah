import { fireDatabase } from '../firebase';
import { setResponse } from '../../helpers/response';

const reference = '/transaction';

const getTransaction = (uid) => {
  return new Promise((resolve, reject) => {
    fireDatabase.ref(`${reference}/${uid}`).once('value')
      .then((response) => {
        const transactionData = response.val();

        if (transactionData) {
          resolve(setResponse(200, transactionData));
        }
        resolve(setResponse(404));
      }, (error) => {
        reject(setResponse(500, error));
      })
  })
}

const createTransaction = (transactionData) => {
  return new Promise((resolve, reject) => {
    fireDatabase.ref(`${reference}/${transactionData.id_user}/${Date.now()}`)
      .set(transactionData)
      .then(() => {
        resolve(setResponse(200, transactionData))
      }, (error) => {
        reject(setResponse(500));
      });
  })
}

export {
  getTransaction,
  createTransaction
}