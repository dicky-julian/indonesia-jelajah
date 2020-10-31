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
      });
  });
}

const getCityByProvince = (id_provinsi) => {
  return new Promise((resolve, reject) => {
    axios(`${baseUrl}/daerahindonesia/kota?id_provinsi=${id_provinsi}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      })
  });
}

export {
  getAllProvince,
  getCityByProvince
}