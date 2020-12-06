import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Drawer, Menu, MenuItem, Snackbar, IconButton, MobileStepper } from '@material-ui/core';
import { ShoppingCartOutlined, AccountCircleOutlined, PermIdentityOutlined, ExitToAppOutlined, Close } from '@material-ui/icons';
import Select from 'react-select';
import { getCityByProvince } from '../../../services/api/location';
import Modal from '../../layouts/base/modal';
import { randomAlphaNumeric } from '../../../helpers/random';

const Navbar = (props) => {
  const { handleLogin, handleRegister, handleGetAllProvince, province, accessToken, showFormRegister, showNotification, handleSignOut } = props;

  const [showDrawer, setShowDrawer] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [activeLink, setActiveLink] = useState();
  const [isPrimaryNav, setIsPrimaryNav] = useState();
  const [isSelectLoading, setIsSelectLoading] = useState();

  const [provinceList, setProvinceList] = useState();
  const [selectedProvince, setSelectedProvince] = useState();
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState();
  const [provinceError, setProvinceError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [fullAddressError, setFullAdressError] = useState(false);
  const [fullAddress, setFullAddress] = useState('');

  const [registrationModalStatus, setRegistrationModalStatus] = useState(0);
  const [userRegistrationData, setUserRegistrationData] = useState({});

  const location = useLocation();

  const listLink = [
    {
      path: '/',
      name: 'Beranda'
    },
    {
      path: '/destinasi',
      name: 'Destinasi'
    },
    {
      path: '/artikel',
      name: 'Artikel'
    }
  ];

  const handleToogleDrawer = () => {
    setShowDrawer(true);
  }

  const handleGetCityByProvince = async () => {
    const { value } = selectedProvince;

    await getCityByProvince(value)
      .then((response) => {
        if (response.data) {
          const dataKotaKabupaten = response.data;
          const newDataKotaKabupaten = [];
          dataKotaKabupaten.map((kotaKabupaten) => {
            const { id, name } = kotaKabupaten;
            return newDataKotaKabupaten.push({
              label: name,
              value: id
            });
          });
          setCityList(newDataKotaKabupaten);
        }
      });
    setIsSelectLoading();
  }

  const handleSubmitRegister = (payload) => {
    const status = registrationModalStatus;
    if (status === 0) {
      setUserRegistrationData({
        ...userRegistrationData,
        role: payload.role,
        money_code: randomAlphaNumeric(3, 5),
        money_balance: 0
      })
      setRegistrationModalStatus(1);
    } else if (status === 1) {
      if (!selectedProvince) {
        setProvinceError(true);
      }

      if (!selectedCity) {
        setCityError(true);
      }

      if (!fullAddress) {
        setFullAdressError(true);
      }

      if (selectedProvince && selectedCity && fullAddress) {
        const payload = {
          ...showFormRegister,
          ...userRegistrationData,
          displayName: showFormRegister.displayName.toLowerCase(),
          province: selectedProvince,
          city: selectedCity,
          adress: fullAddress
        }
        handleRegister(payload);
        setRegistrationModalStatus(2);
      }
    }
  }

  const handleCloseNotificationModal = () => {
    setShowNotificationModal(false);
  }

  useEffect(() => {
    setShowRegistrationModal(showFormRegister ? true : false);

    if (showFormRegister) {
      setShowDrawer(false);
    }
  }, [showFormRegister])

  useEffect(() => {
    setShowNotificationModal(showNotification ? true : false);
  }, [showNotification])

  useEffect(() => {
    const { pathname } = location;
    setActiveLink(pathname);

    const isPrimary = listLink.find((link) => link.path === pathname);
    if (isPrimary) {
      setIsPrimaryNav(true);
    } else {
      setIsPrimaryNav();
    }
  }, [location, listLink]);

  useEffect(() => {
    if (selectedProvince) {
      setIsSelectLoading(true);
      handleGetCityByProvince();
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (!provinceList && province) {
      const newProvinceList = [];
      province.map(({ id, name }) => {
        return newProvinceList.push({
          label: name,
          value: id
        });
      });

      setProvinceList(newProvinceList);
    } else if (!province) {
      handleGetAllProvince()
    }
  }, [provinceList, province]);

  return (
    <nav className="navbar d-flex justify-content-center">
      <div className="wrapper d-flex align-items-center justify-content-between">
        <Link to="/">
          <img src={require('../../../assets/images/logo.webp')} alt="Indonesia Jalajah" />
        </Link>
        <div>
          {listLink.map(({ path, name }, index) => (
            <Link
              to={path}
              key={index}
              className={`${isPrimaryNav ? 'text-white' : 'text-black'} ${activeLink === path ? 'active' : ''}`}
            >
              {name}
            </Link>
          ))}
        </div>

        {/* ACTION BAR DEKSTOP */}
        <div className="d-flex justify-content-end">
          {accessToken ?
            <div className="d-flex">
              <Link to="/cart" className={isPrimaryNav ? 'text-white' : 'text-black'}>
                <ShoppingCartOutlined />
              </Link>
              <div className={`cursor-pointer ${isPrimaryNav ? 'text-white' : 'text-black'}`}>
                <AccountCircleOutlined
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={(event) => setProfileMenuAnchor(event.currentTarget)}
                  className="ml-4"
                />
              </div>
              <Menu
                id="long-menu"
                anchorEl={profileMenuAnchor}
                keepMounted
                open={Boolean(profileMenuAnchor)}
                onClose={() => setProfileMenuAnchor(null)}
                className="mt-5"
              >
                <MenuItem>
                  <Link to="/profile" className="d-flex text-black">
                    <PermIdentityOutlined style={{ fontSize: '1.2rem' }} />
                    <span className="ml-2 mr-4">Profil</span>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <div className="d-flex" onClick={() => {
                    window.location.href = '/';
                    handleSignOut();
                  }}>
                    <ExitToAppOutlined style={{ fontSize: '1.2rem' }} />
                    <span className="ml-2 mr-4">Keluar</span>
                  </div>
                </MenuItem>
              </Menu>
            </div>
            :
            <button style={!isPrimaryNav ? { border: '1px solid #dee2ee' } : {}} className="btn-light-primary d-flex" onClick={() => handleLogin()}>
              <img src="https://gamequitters.com/wp-content/uploads/google-logo-transparent.png" className="mr-3" alt="google logo" />
              <p className="mb-0">Masuk dengan Google</p>
            </button>
          }

          {/* ACTION BAR MOBILE */}

          {/* toogle */}
          <div className="toogle-nav" onClick={() => handleToogleDrawer()}>
            <span style={!isPrimaryNav ? { backgroundColor: '#000' } : { backgroundColor: '#fff' }}></span>
            <span style={!isPrimaryNav ? { backgroundColor: '#000' } : { backgroundColor: '#fff' }}></span>
            <span style={!isPrimaryNav ? { backgroundColor: '#000' } : { backgroundColor: '#fff' }}></span>
          </div>

          {/* content bar */}
          <Drawer anchor="top" open={showDrawer} onClose={() => setShowDrawer(false)}>
            <div className="nav-link-drawer">
              {listLink.map(({ path, name }, index) => (
                <Link to={path} key={index}>{name}</Link>
              ))}
              {!accessToken &&
                <button className="btn-light-primary d-flex" onClick={() => handleLogin()}>
                  <img src="https://gamequitters.com/wp-content/uploads/google-logo-transparent.png" className="mr-3" alt="google logo" />
                  <p className="mb-0">Masuk dengan Google</p>
                </button>
              }
            </div>
          </Drawer>
          <div className="profile-menu-anchor"></div>
        </div>
      </div>

      {/* Registration Modal */}
      <Modal
        showModal={showRegistrationModal}
        setShowModal={setShowRegistrationModal}
      >
        <div className="preference-bar position-static">
          <h4 className="font-playfair">Form Pendaftaran</h4>
          <hr />
          {provinceList ?
            <>
              {registrationModalStatus === 0 && (
                <>
                  <button
                    className="btn btn-primary w-100 mt-3 mb-3"
                    onClick={() => handleSubmitRegister({ role: 1 })}>
                    Daftar sebagai Wisatawan
                  </button>
                  <p className="w-100 text-center mb-3">atau</p>
                  <button
                    className="btn btn-primary w-100 mb-3"
                    onClick={() => handleSubmitRegister({ role: 2 })}>
                    Daftar sebagai Penyedia Layanan
                  </button>
                </>
              )}

              {registrationModalStatus === 1 && (
                <>
                  <p className="mt-3 mb-2 text-secondary">Provinsi Domisili</p>
                  <Select
                    className={`custom-react-select mb-2 ${provinceError && 'danger-border'}`}
                    classNamePrefix="select"
                    isDisabled={isSelectLoading}
                    isLoading={isSelectLoading}
                    isClearable={true}
                    isSearchable={true}
                    options={provinceList}
                    onChange={(province) => {
                      setProvinceError(false);
                      setSelectedProvince(province);
                    }}
                  />
                  {provinceError && <p className="text-danger">Provinsi harus diisi!</p>}

                  <p className="mt-3 mb-2 text-secondary">Kota/Kabupaten Domisili</p>
                  <Select
                    className={`custom-react-select mb-2 ${cityError && 'danger-border'}`}
                    classNamePrefix="select"
                    isDisabled={isSelectLoading}
                    isLoading={isSelectLoading}
                    isClearable={true}
                    isSearchable={true}
                    options={cityList}
                    onChange={(city) => {
                      setCityError(false);
                      setSelectedCity(city);
                    }}
                  />
                  {cityError && <p className="text-danger">Kota harus diisi!</p>}

                  <p className="mt-3 mb-2 text-secondary">Alamat Lengkap</p>
                  <input
                    className={`custom-react-input w-100 ${fullAddressError && 'danger-border'}`}
                    placeholder="Jalan / Desa / Kelurahan"
                    value={fullAddress}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFullAddress(value);
                      if (value) setFullAdressError(false);
                      else (setFullAdressError(true))
                    }}
                  />
                  {fullAddressError && <p className="text-danger">Alamat Lengkap harus diisi!</p>}

                  <button
                    className="btn btn-primary mt-4 w-100 justify-content-center"
                    onClick={() => handleSubmitRegister()}>
                    Kirim
                  </button>
                </>
              )}
              <MobileStepper
                variant="dots"
                steps={2}
                position="static"
                activeStep={registrationModalStatus}
                className="bg-cyan justify-content-center mt-4"
              />
            </>
            :
            <div>Loading ...</div>
          }
        </div>
      </Modal>

      {/* Notification */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={showNotificationModal}
        autoHideDuration={6000}
        onClose={() => handleCloseNotificationModal()}
        message={showNotification || ''}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => handleCloseNotificationModal()}>
              <Close fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />

    </nav>
  )
}

export default Navbar;