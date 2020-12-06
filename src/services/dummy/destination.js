import React from 'react';
import {
  LocalParking, Wc, Restaurant, Payment, Wifi
} from '@material-ui/icons';

const facilities = [
  {
    label: 'Tempat Parkir',
    value: 'LocalParking',
  },
  {
    label: 'Toilet',
    value: 'Wc',
  },
  {
    label: 'Tempat Makan',
    value: 'Restaurant',
  },
  {
    label: 'ATM',
    value: 'Payment',
  },
  {
    label: 'Wifi',
    value: 'Wifi'
  }
]

const facilitiesIcons = {
  LocalParking: <LocalParking />,
  Wc: <Wc />,
  Restaurant: <Restaurant />,
  Payment: <Payment />,
  Wifi: <Wifi />
}
export {
  facilities,
  facilitiesIcons
}