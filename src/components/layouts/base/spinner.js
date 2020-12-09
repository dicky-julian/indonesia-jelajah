import React from 'react';

const Spinner = (variant, className = '') => (
  <div className={`spinner-border text-${variant} ${className}`} style={{ height: '20px', width: '20px' }} role="status">
    <span className="sr-only">Loading...</span>
  </div>
)

const FullSpinner = () => (
  <div className="d-flex justify-content-center align-items-center vw-100 isloading-component position-absolute fullspinner">
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
)

export {
  Spinner,
  FullSpinner
}