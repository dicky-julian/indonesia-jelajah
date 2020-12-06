import { fireDatabase } from '../firebase';
import { setResponse } from '../../helpers/response';

const reference = '/transaction';

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
  createTransaction
}