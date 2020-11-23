import React from 'react';

const Spinner = (variant) => (
  <div className={`spinner-border text-${variant}`} style={{ height: '20px', width: '20px' }} role="status">
    <span className="sr-only">Loading...</span>
  </div>
)

export {
  Spinner
}