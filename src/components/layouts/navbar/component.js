import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Drawer } from '@material-ui/core';

const Navbar = ({ handleLogin, handleGetAllProvince, province }) => {
  const [showDrawer, setShowDrawer] = useState();
  const [activeLink, setActiveLink] = useState();
  const [isPrimaryNav, setIsPrimaryNav] = useState();

  const handleToogleDrawer = () => {
    setShowDrawer(true);
  }

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

  useEffect(() => {
    const { pathname } = location;
    setActiveLink(pathname);

    const isPrimary = listLink.find((link) => link.path === pathname);
    if (isPrimary) {
      setIsPrimaryNav(true);
    } else {
      setIsPrimaryNav();
    }
  }, [location]);

  useEffect(() => {
    if (!province) {
      handleGetAllProvince();
    }
  }, [province, handleGetAllProvince]);

  return (
    <nav className="navbar d-flex justify-content-center">
      <div className="wrapper d-flex align-items-center justify-content-between">
        <Link to="/">
          <img src={require('../../../assets/images/logo.webp')} alt="Indonesia Jalajah" />
        </Link>
        <div>
          {listLink.map(({ path, name }, index) => (
            <Link to={path} key={index} style={isPrimaryNav ? { color: '#fff' } : { color: '#000' }} className={activeLink === path ? 'active' : ''}>{name}</Link>
          ))}
        </div>
        <div className="d-flex justify-content-end">
          <button style={!isPrimaryNav ? { border: '1px solid #dee2ee' } : {}} className="btn-light-primary d-flex" onClick={() => handleLogin()}>
            <img src="https://gamequitters.com/wp-content/uploads/google-logo-transparent.png" className="mr-3" alt="google logo" />
            <p className="mb-0">Masuk dengan Google</p>
          </button>
          <div className="toogle-nav" onClick={() => handleToogleDrawer()}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <Drawer anchor="top" open={showDrawer} onClose={() => setShowDrawer()}>
            <div className="nav-link-drawer">
              {listLink.map(({ path, name }, index) => (
                <Link to={path} key={index}>{name}</Link>
              ))}
              <button className="btn-light-primary d-flex" onClick={() => handleLogin()}>
                <img src="https://gamequitters.com/wp-content/uploads/google-logo-transparent.png" className="mr-3" alt="google logo" />
                <p className="mb-0">Masuk dengan Google</p>
              </button>
            </div>
          </Drawer>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;