import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ title, location, imageUrl, startPrice, to }) => (
  <Link to={to}
    className="d-flex align-items-end product-list"
    style={{ background: `linear-gradient(to bottom,transparent 0%,transparent 18%,rgb(0 0 0 / 58%) 99%,rgba(0,0,0,.8) 100%), url(${imageUrl})` }}
  >
    <div className="product-list-description">
      <h6 className="text-light font-weight-normal">Mulai Rp.{startPrice}</h6>
      <h3 className="text-light">{title}</h3>
      <h6 className="text-fade font-weight-normal">{location}</h6>
    </div>
  </Link>
);

export default ProductList;