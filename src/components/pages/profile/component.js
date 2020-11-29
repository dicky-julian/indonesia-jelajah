import React, { useEffect, useState } from 'react';
import { Chip, TextField, MenuItem } from '@material-ui/core';
import Select from 'react-select';
import { Spinner } from '../../layouts/base/spinner';
import { Check, PlayCircleFilledOutlined, PersonOutline, ConfirmationNumberOutlined, ArrowDropDownCircle, BrandingWatermarkOutlined } from '@material-ui/icons';
import { decodeToken } from '../../../helpers/jwt';
import { getCityByProvince } from '../../../services/api/location';
import { createUser, getUserByKey } from '../../../services/api/user';
import { addDestinationImage } from '../../../services/api/destination';
import { generateToken } from '../../../helpers/jwt';

const Profile = (props) => {
  const { accessToken, province, setAuthToken, handleGetAllProvince, history } = props;

  const [userAccount, setUserAccount] = useState();
  const [isSelectLoading, setIsSelectLoading] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [displayName, setDisplayName] = useState();
  const [provinceList, setProvinceList] = useState();
  const [selectedProvince, setSelectedProvince] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState(false);
  const [fullAdress, setFullAddress] = useState();
  const [facilitieLists, setFacilitieLists] = useState();
  const [destinationDescription, setDestinationDescription] = useState();

  const currencies = [
    {
      value: 'Jawa Timur',
      label: 'Jawa Timur',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];

  const facilities = [
    {
      label: 'Tempat Parkir',
      value: 'LocalParking',
    },
    {
      label: 'Toilet',
      value: 'Wc'
    },
    {
      label: 'Tempat Makan',
      value: 'Restaurant'
    },
    {
      label: 'ATM',
      value: 'Payment'
    },
    {
      label: 'Wifi',
      value: 'Wifi'
    }
  ]

  const isDisbaleButton = userAccount && selectedProvince && selectedCity ?
    displayName !== userAccount.displayName ||
    selectedProvince.label !== userAccount.province.label ||
    selectedCity.label !== userAccount.city.label ||
    fullAdress !== userAccount.adress
    : false;

  const isDisableDestinationButton = !destinationDescription || !facilitieLists || (facilitieLists && !facilitieLists.length > 2) ? true : false;

  const handleGetCityByProvince = async () => {
    if (selectedProvince) {
      const { value } = selectedProvince;

      await getCityByProvince(value)
        .then((response) => {
          if (response.data) {
            const dataKotaKabupaten = response.data.kota_kabupaten;
            const newDataKotaKabupaten = [];
            dataKotaKabupaten.map((kotaKabupaten) => {
              const { id, nama } = kotaKabupaten;
              return newDataKotaKabupaten.push({
                label: nama,
                value: id
              });
            });

            setCityList(newDataKotaKabupaten);
          }
        });
      setIsSelectLoading();
    }
  }

  const handleProfileSubmit = async () => {
    setIsLoading(true);
    const payload = {
      ...userAccount,
      displayName: displayName,
      province: selectedProvince,
      city: selectedCity,
      adress: fullAdress
    }

    await getUserByKey('email', userAccount.email)
      .then((userKey) => {
        createUser(payload, userKey)
          .then(() => {
            const newAccessToken = generateToken(payload);
            setAuthToken(newAccessToken);
          })
          .catch((error) => {
            console.log(error, 'createUser')
          })
      })

    setIsLoading(false);
  }

  const handleAddDestinationImage = async (files) => {
    await addDestinationImage(userAccount, files)
      .then((response) => {
        console.log(response, 'handleAddDestinationImage')
      })
      .catch((error) => {
        console.log(error, 'errorhandleAddDestinationImage')
      })
  }

  const imageStores = [
    'https://images.pexels.com/photos/5011070/pexels-photo-5011070.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/1657214/pexels-photo-1657214.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/5110646/pexels-photo-5110646.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/2916337/pexels-photo-2916337.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/2291648/pexels-photo-2291648.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  ];

  // SET USER ACCOUNT
  useEffect(() => {
    if (accessToken) {
      const tokenData = decodeToken(accessToken);
      setUserAccount(tokenData);
    } else {
      setUserAccount();
      history.push('/');
    }
  }, [accessToken])

  // SET USER LOCATION
  useEffect(() => {
    if (userAccount) {
      setSelectedProvince(userAccount.province);
      setSelectedCity(userAccount.city);
      setDisplayName(userAccount.displayName);
      setFullAddress(userAccount.adress)
    }
  }, [userAccount])

  // GET PROVINCE LIST
  useEffect(() => {
    if (!provinceList && province) {
      const newProvinceList = [];
      province.map(({ id, nama }) => {
        return newProvinceList.push({
          label: nama,
          value: id
        });
      });

      setProvinceList(newProvinceList);
    } else if (!province) {
      handleGetAllProvince()
    }
  }, [provinceList, province]);

  // GET CITY LIST WHEN PROVINCE UPDATED
  useEffect(() => {
    if (selectedProvince) {
      setIsSelectLoading(true);
      handleGetCityByProvince();
    }
  }, [selectedProvince])

  return (
    <div>
      <main className="container-destination-detail d-flex flex-column align-items-center bg-white">
        {accessToken && userAccount && provinceList && cityList && selectedProvince !== false && selectedCity !== false ?
          <div className="d-flex justify-content-between cart-container">
            <div className="preference-bar">
              <h4>Dicky Julian</h4>
              <p className="text-muted mb-0">{userAccount.email}</p>
              <hr />
              <a href="#profil-saya" className="d-flex w-100 align-items-center pt-3 pb-3 text-black">
                <PersonOutline className="mr-2" />
                <span>Profil Saya</span>
              </a>

              <a href="#profil-wisata" className="d-flex w-100 align-items-center pt-3 pb-3 text-black">
                <BrandingWatermarkOutlined className="mr-2" />
                <span>Profil Destinasi</span>
              </a>

              <a href="#pesanan-saya" className="d-flex w-100 align-items-center pt-3 pb-3 text-black">
                <ConfirmationNumberOutlined className="mr-2" />
                <span>Pesanan Saya</span>
              </a>
            </div>
            <div className="profile-container">

              {/* LIST ACCOUNT'S INFORMATIONS */}
              <div id="profil-saya" className="p-3">
                <div className="d-flex">
                  <PersonOutline className="mr-2" />
                  <h4>Informasi Akun</h4>
                </div>
                <p className="text-muted">Atur dan Kelola data profilmu.</p>
                <div className="account-view">
                  <div className="p-3">
                    <div className="mb-3">
                      <small className="text-muted">Email</small>
                      <h6 className="font-weight-normal">{userAccount.email}</h6>
                    </div>
                    <div className="mb-3">
                      <small className="text-muted">Kode Uang Digital</small>
                      <h6 className="font-weight-normal">AX-830BC-6KHA</h6>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <small className="text-muted">Saldo Uang Digital</small>
                        <h6 className="font-weight-normal">Rp. 1.350.000</h6>
                      </div>
                      <Chip
                        label="Tambah Saldo"
                        onDelete={() => alert('Add Money')}
                        deleteIcon={<PlayCircleFilledOutlined />}
                      />
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-secondary">Nama Pengguna</p>
                    <input
                      className="custom-react-input w-100"
                      defaultValue={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />

                    <p className="mt-4 mb-2 font-weight-bold">Alamat Pengguna</p>
                    <p className="mb-2 text-secondary">Provinsi</p>
                    <Select
                      className="custom-react-select"
                      classNamePrefix="select"
                      defaultValue={selectedProvince}
                      isDisabled={isSelectLoading}
                      isLoading={isSelectLoading}
                      isClearable={true}
                      isSearchable={true}
                      options={provinceList}
                      onChange={(province) => {
                        setSelectedProvince(province);
                        setSelectedCity(null);
                      }}
                    />

                    <p className="mt-3 mb-2 text-secondary">Kota/Kabupaten</p>
                    <Select
                      className="custom-react-select"
                      classNamePrefix="select"
                      defaultValue={selectedCity}
                      isDisabled={isSelectLoading}
                      isLoading={isSelectLoading}
                      isClearable={true}
                      isSearchable={true}
                      options={cityList}
                      onChange={(city) => setSelectedCity(city)}
                    />

                    <p className="mt-3 mb-2 text-secondary">Alamat Lengkap</p>
                    <input
                      className="custom-react-input w-100"
                      defaultValue={fullAdress}
                      onChange={(e) => setFullAddress(e.target.value)}
                    />

                    <button onClick={() => handleProfileSubmit()} className={`mt-3 ${!isDisbaleButton ? 'disable' : 'cursor-pointer'}`} disabled={!isDisbaleButton}>
                      {isLoading ? <Spinner variant="light" /> : 'Simpan'}
                    </button>
                  </div>
                </div>
              </div>

              {/* LIST OF PRODUCT'S INFORMATIONS */}
              <div id="profil-wisata" className="p-3 mt-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <div className="d-flex">
                      <PersonOutline className="mr-2" />
                      <h4>Informasi Destinasi</h4>
                    </div>
                    <p className="text-muted">Ciptakan profil menarik untuk wisatamu.</p>
                  </div>
                  <div className="d-flex align-items-center covid-status mt-3 h-fit-content">
                    <Check className="mr-2" />
                    <span>Standar COVID-19</span>
                  </div>
                </div>
                <div className="destination-account-view">
                  <div className="d-flex destination-gallery">
                    {imageStores.map((imageUrl, index) => (
                      <img src={imageUrl} key={index} />
                    ))}
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <p className="text-danger mb-0 warning-text">Foto setidaknya harus berjumlah 3 agar destinasi dapat tervalidasi *</p>
                    <button className="btn btn-sm btn-primary d-inline-flex btn-add-img">
                      Tambahkan Foto
                      <input type="file" className="position-absolute" onChange={(e) => handleAddDestinationImage(e.target.files)} multiple />
                    </button>
                  </div>

                  <div className="destination-details">
                    <p className="mt-3 mb-2 text-muted">Deskripsi Destinasi</p>
                    <textarea rows="10" onChange={(e) => setDestinationDescription(e.target.value)}></textarea>

                    <p className="mt-3 mb-2 text-muted">Fasilitas Destinasi</p>
                    <Select
                      isMulti
                      options={facilities}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={(e) => setFacilitieLists(e)}
                    />
                    <button onClick={() => handleProfileSubmit()} className={`mt-3 ${isDisableDestinationButton ? 'disable' : 'cursor-pointer'}`} disabled={isDisableDestinationButton}>
                      {isLoading ? <Spinner variant="light" /> : 'Simpan'}
                    </button>
                  </div>
                </div>
              </div>

              {/* LIST ORDER'S INFORMATIONS */}
              <div id="pesanan-saya" className="p-3 mt-3">
                <div className="d-flex">
                  <ConfirmationNumberOutlined className="mr-2" />
                  <h4>Informasi Pesanan</h4>
                </div>

                {currencies.map((data, index) => (
                  <div className="ticket-container mt-3" key={index}>
                    <h5>Ini Adalah Title Ticket</h5>
                    <p className="text-secondary mb-0">Ini adalah deskripsi singkat dari ticket yang dimaksudkan</p>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <h5>Rp. 250.000</h5>
                      <span>18 Maret 2020</span>
                    </div>
                  </div>
                ))}

                <div className="w-100 text-center mt-3">
                  <button className="bg-muted">
                    <span className="m-2">Lihat Lebih Banyak</span>
                    <ArrowDropDownCircle />
                  </button>
                </div>
              </div>
            </div>
          </div>
          :
          <div>Loading</div>}
      </main>
    </div>
  )
}

export default Profile;