import React from 'react';
import { Link } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

const Cart = () => {
  return (
    <div>
      <main className="container-destination-detail d-flex flex-column align-items-center bg-white">
        <div className="d-flex justify-content-between cart-container">
          <div className="preference-bar">
            <h4 className="font-playfair">Temukan Pesanan</h4>
            <hr />

            <p className="mb-2 text-secondary">Nama Pesanan</p>
            <input
              className="custom-react-input w-100"
              placeholder="Monumen Nasional"
            />

            <p className="mt-3 mb-2 text-secondary">Tanggal Pesanan</p>
            <div className="custom-react-input w-100 pt-2 pb-2">
              <TextField
                id="date"
                type="date"
                defaultValue="2017-05-24"
                className="w-100"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <Link to="/artikel" className="bt bg-primary text-white d-flex mt-4 w-100 justify-content-between">
              <p className="mb-0 mr-2">Cari</p>
              <SearchOutlined />
            </Link>
          </div>

          <div>
            <div className="product-ticket-container">
              <div className="d-flex flex-column justify-content-center align-items-center bg-primary text-white">
                <h3>22</h3>
                <span>Desember 2020</span>
              </div>

              <div className="p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0">Kode Pesanan : <b>0132412112</b></p>
                  <h6 className="mb-0 text-success">Terverifikasi</h6>
                </div>
                <hr />
                <h5>Ini Adalah Title Ticket</h5>
                <h6 className="text-muted font-weight-normal">Ini adalah deskripsi singkat dari ticket yang dimaksudkan</h6>
                <h6 className="text-primary mb-0">Rp. 250.000</h6>
              </div>
            </div>

            <div className="product-ticket-container mt-3">
              <div className="d-flex flex-column justify-content-center align-items-center bg-primary text-white">
                <h3>22</h3>
                <span>Desember 2020</span>
              </div>

              <div className="p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0">Kode Pesanan : <b>0132412112</b></p>
                  <h6 className="mb-0 text-success">Terverifikasi</h6>
                </div>
                <hr />
                <h5>Ini Adalah Title Ticket</h5>
                <h6 className="text-muted font-weight-normal">Ini adalah deskripsi singkat dari ticket yang dimaksudkan</h6>
                <h6 className="text-primary mb-0">Rp. 250.000</h6>
              </div>
            </div>

            <div className="product-ticket-container mt-3">
              <div className="d-flex flex-column justify-content-center align-items-center bg-primary text-white">
                <h3>22</h3>
                <span>Desember 2020</span>
              </div>

              <div className="p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0">Kode Pesanan : <b>0132412112</b></p>
                  <h6 className="mb-0 text-success">Terverifikasi</h6>
                </div>
                <hr />
                <h5>Ini Adalah Title Ticket</h5>
                <h6 className="text-muted font-weight-normal">Ini adalah deskripsi singkat dari ticket yang dimaksudkan</h6>
                <h6 className="text-primary mb-0">Rp. 250.000</h6>
              </div>
            </div>

            <div className="product-ticket-container mt-3">
              <div className="d-flex flex-column justify-content-center align-items-center bg-primary text-white">
                <h3>22</h3>
                <span>Desember 2020</span>
              </div>

              <div className="p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0">Kode Pesanan : <b>0132412112</b></p>
                  <h6 className="mb-0 text-success">Terverifikasi</h6>
                </div>
                <hr />
                <h5>Ini Adalah Title Ticket</h5>
                <h6 className="text-muted font-weight-normal">Ini adalah deskripsi singkat dari ticket yang dimaksudkan</h6>
                <h6 className="text-primary mb-0">Rp. 250.000</h6>
              </div>
            </div>

            <div className="product-ticket-container mt-3">
              <div className="d-flex flex-column justify-content-center align-items-center bg-primary text-white">
                <h3>22</h3>
                <span>Desember 2020</span>
              </div>

              <div className="p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0">Kode Pesanan : <b>0132412112</b></p>
                  <h6 className="mb-0 text-success">Terverifikasi</h6>
                </div>
                <hr />
                <h5>Ini Adalah Title Ticket</h5>
                <h6 className="text-muted font-weight-normal">Ini adalah deskripsi singkat dari ticket yang dimaksudkan</h6>
                <h6 className="text-primary mb-0">Rp. 250.000</h6>
              </div>
            </div>

            <div className="product-ticket-container mt-3">
              <div className="d-flex flex-column justify-content-center align-items-center bg-primary text-white">
                <h3>22</h3>
                <span>Desember 2020</span>
              </div>

              <div className="p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0">Kode Pesanan : <b>0132412112</b></p>
                  <h6 className="mb-0 text-success">Terverifikasi</h6>
                </div>
                <hr />
                <h5>Ini Adalah Title Ticket</h5>
                <h6 className="text-muted font-weight-normal">Ini adalah deskripsi singkat dari ticket yang dimaksudkan</h6>
                <h6 className="text-primary mb-0">Rp. 250.000</h6>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}

export default Cart;