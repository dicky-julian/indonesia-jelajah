import { fireDatabase, fireStorage } from '../firebase';
import { createUser } from './user';
import { setResponse } from '../../helpers/response';

const references = fireStorage.ref();
const ticketReference = 'ticket';
const userReference = 'user';

const addDestinationImage = (userAccount, files) => {
  return new Promise(async (resolve, reject) => {
    if (files) {
      const file = files[0];
      const { uid } = userAccount;

      // filter file's size up to 3MB
      if (file && file.size < 3000000) {
        const reference = references.child(`destination/${uid}/${new Date().getTime()}`);
        const pathReference = reference.put(file);

        pathReference.on('state_changed', () => {

        }, (error) => {
          reject({
            errMsg: 'Terjadi kesalahan ketika menambahkan file.'
          });
        }, () => {
          pathReference.snapshot.ref.getDownloadURL()
            .then(async (downloadUrl) => {
              const destinationImages = userAccount.destinationImages || [];

              destinationImages.push(downloadUrl);
              if (destinationImages.length > 3 && userAccount.cheapestPrice) {
                userAccount.verified = true;
              }
              const payload = {
                ...userAccount,
                destinationImages
              }

              await createUser(payload, uid)
                .then(() => {
                  resolve(payload);
                })
                .catch(() => {
                  reject({
                    errMsg: 'Terjadi kesalahan ketika menambahkan file.'
                  });
                })
            })
        })
      } else {
        reject(null);
      }
    }
  })
}

const getDestinationTicketByKey = (key, value) => {
  return new Promise((resolve, reject) => {
    fireDatabase.ref(ticketReference)
      .orderByChild(key)
      .equalTo(value).on("child_added", ((snapshot) => {
        resolve(snapshot.key);
      }))
  })
}

const getDestinationTicketbyUid = (uid) => {
  return new Promise((resolve, reject) => {
    fireDatabase.ref(`${ticketReference}/${uid}`).once('value')
      .then((response) => {
        const ticketData = response.val();

        if (ticketData) {
          resolve(setResponse(200, ticketData));
        }
        resolve(setResponse(404));
      }, (error) => {
        reject(setResponse(500))
      })
  })
}

const addDestinationTicket = (ticketData, uid) => {
  return new Promise(async (resolve, reject) => {
    fireDatabase.ref(`${ticketReference}/${uid}/${Date.now()}`)
      .set(ticketData)
      .then(() => {
        resolve(setResponse(200, ticketData));
      }, (error) => {
        console.log(error, 'error')
        reject(setResponse(500));
      });
  });
}

const getDestinationByKey = (key, value) => {
  return new Promise((resolve, reject) => {
    fireDatabase.ref(userReference)
      .orderByChild(key)
      .startAt(value)
      .on('value', ((snapshot) => {
        resolve(snapshot.val())
      }))
  })
}

export {
  getDestinationTicketByKey,
  getDestinationTicketbyUid,
  getDestinationByKey,
  addDestinationImage,
  addDestinationTicket
}