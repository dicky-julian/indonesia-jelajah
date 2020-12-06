import axios from 'axios';
const https = require('https');

// const baseUrl = 'https://dev.farizdotid.com/api';
const baseUrl = 'http://www.emsifa.com/api-wilayah-indonesia/api';

const getAllProvince = () => {
  return new Promise((resolve, reject) => {
    axios(`${baseUrl}/provinces.json`)
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
    axios(`${baseUrl}/regencies/${id_provinsi}.json`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      })
  });
}

export {
  getAllProvince,
  getCityByProvince
}