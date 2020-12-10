import { fireDatabase } from '../firebase';

// const baseUrl = 'https://dev.farizdotid.com/api';
const baseUrl = 'http://www.emsifa.com/api-wilayah-indonesia/api';
const reference = 'location';

const getDataLocation = () => {
  return new Promise((resolve, reject) => {
    fireDatabase.ref(reference).once('value')
      .then((response) => {
        const locationData = response.val();
        resolve(locationData);
      })
      .catch(() => {
        reject(null);
      })
  })
}

export {
  getDataLocation
}