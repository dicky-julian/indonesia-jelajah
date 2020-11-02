import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer } from '@material-ui/core';

const Navbar = () => {
  const [showDrawer, setShowDrawer] = useState();

  const handleToogleDrawer = () => {
    setShowDrawer(true);
  }

  return (
    <nav className="navbar d-flex justify-content-center">
      <div className="wrapper d-flex align-items-center">
        <div>
          <img src={require('../../../assets/images/logo.webp')} alt="Indonesia Jalajah" />
        </div>
        <div>
          <Link to="/">Beranda</Link>
          <Link to="/">Destinasi</Link>
          <Link to="/">Artikel</Link>
        </div>
        <div className="d-flex justify-content-end">
          <Link to="/artikel" className="btn-light-primary d-flex">
            <img src="https://gamequitters.com/wp-content/uploads/google-logo-transparent.png" className="mr-3" alt="google logo" />
            <p className="mb-0">Masuk dengan Google</p>
          </Link>
          <div className="toogle-nav ml-4" onClick={() => handleToogleDrawer()}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <Drawer anchor="top" open={showDrawer} onClose={() => setShowDrawer()}>
            <div className="nav-link-drawer">
              <Link to="/">Beranda</Link>
              <Link to="/">Destinasi</Link>
              <Link to="/">Artikel</Link>
              <Link to="/artikel" className="btn-light-primary d-flex">
                <img src="https://gamequitters.com/wp-content/uploads/google-logo-transparent.png" className="mr-3" alt="google logo" />
                <p className="mb-0">Masuk dengan Google</p>
              </Link>
            </div>
          </Drawer>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;