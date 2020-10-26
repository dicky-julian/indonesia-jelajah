import axios from 'axios';

const baseUrl = 'https://dev.farizdotid.com/api';

const getAllProvince = () => {
  return new Promise((resolve, reject) => {
    axios(`${baseUrl}/daerahindonesia/provinsi`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      })
  })
}

export {
  getAllProvince
}