import React, { useEffect, useState } from 'react';
import { Chip, TextField, MenuItem } from '@material-ui/core';
import Select from 'react-select';
import { PlayCircleFilledOutlined, PersonOutline, ConfirmationNumberOutlined, ArrowDropDownCircle } from '@material-ui/icons';
import { decodeToken } from '../../../helpers/jwt';
import { getCityByProvince } from '../../../services/api/location';

const Profile = (props) => {
  const { accessToken, province, handleGetAllProvince, history } = props;

  const [userAccount, setUserAccount] = useState();
  const [isSelectLoading, setIsSelectLoading] = useState();

  const [displayName, setDisplayName] = useState();
  const [provinceList, setProvinceList] = useState();
  const [selectedProvince, setSelectedProvince] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState(false);

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

  const isDisbaleButton = userAccount && selectedProvince && selectedCity ?
    displayName !== userAccount.displayName ||
    selectedProvince.label !== userAccount.province.label ||
    selectedCity.label !== userAccount.city.label
    : false;

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

  useEffect(() => {
    console.log(selectedProvince)
    console.log(selectedCity)
  }, [selectedCity])

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
                <span>Profil</span>
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

                    <button className={`mt-3 ${!isDisbaleButton ? 'disable' : 'cursor-pointer'}`} disabled={!isDisbaleButton}>
                      Simpan
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
                <p className="text-muted">Temukan pesananmu dengan mudah.</p>
                <div className="d-flex">
                  <TextField
                    error={false}
                    id="filled-select-currency"
                    select
                    label="Urutkan"
                    value="buy"
                    helperText=""
                    variant="filled"
                  >
                    <MenuItem value="buy">
                      Baru saja dibeli
                </MenuItem>
                    <MenuItem value="usage">
                      Tanggal Terdekat
                </MenuItem>
                  </TextField>
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