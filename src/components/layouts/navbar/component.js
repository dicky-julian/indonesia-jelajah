import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Drawer, Menu, MenuItem, Snackbar, IconButton } from '@material-ui/core';
import { ShoppingCartOutlined, AccountCircleOutlined, PermIdentityOutlined, ExitToAppOutlined, Close } from '@material-ui/icons';
import Select from 'react-select';
import { getCityByProvince } from '../../../services/api/location';
import Modal from '../../layouts/base/modal';

const Navbar = (props) => {
  const { handleLogin, handleRegister, handleGetAllProvince, handleShowNotification, province, accessToken, showFormRegister, showNotification, handleSignOut } = props;

  const [showDrawer, setShowDrawer] = useState();
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

  const handleSubmitRegister = () => {
    if (!selectedProvince) {
      setProvinceError(true);
    } else if (!selectedCity) {
      setCityError(true);
    } else {
      const payload = {
        ...showFormRegister,
        province: selectedProvince,
        city: selectedCity
      }

      handleRegister(payload);
    }
  }

  const handleCloseNotificationModal = () => {
    setShowNotificationModal(false);
    handleShowNotification('');
  }

  useEffect(() => {
    console.log(accessToken);
  }, [accessToken])

  useEffect(() => {
    setShowRegistrationModal(showFormRegister ? true : false);
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
                  <div className="d-flex" onClick={() => handleSignOut()}>
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
          <Drawer anchor="top" open={showDrawer} onClose={() => setShowDrawer()}>
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
        footerStyle={{ backgroundColor: '#f1f9ff' }}
        closeTitle="Batal"
        submitTitle="Daftar"
        submitAction={() => handleSubmitRegister()}
      >
        <div className="preference-bar position-static">
          <h4 className="font-playfair">Form Pendaftaran</h4>
          <hr />
          {provinceList ?
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
              {provinceError && <p className="text-danger">Provinsi harus diisi</p>}

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
              {cityError && <p className="text-danger">Kota harus diisi</p>}
            </>
            :
            <div>Loading</div>
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