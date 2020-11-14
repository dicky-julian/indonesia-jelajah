import React from 'react';
import Slider from "react-slick";
import { Star, Check, LocalParking, Restaurant, Wc, Wifi, Payment, Commute, RoomServiceOutlined, HotelOutlined, PoolOutlined, AcUnitOutlined } from '@material-ui/icons';
import { LocalParkingIcon } from '../../layouts/icons';

const DestinasiDetail = () => {
  const mainSliderOptions = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <></>,
    nextArrow: <></>,
  };

  const subSliderOptions = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    vertical: true,
    verticalSwiping: true,
    prevArrow: <></>,
    nextArrow: <></>,
  }

  const imageStores = [
    'https://images.pexels.com/photos/5011070/pexels-photo-5011070.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/1657214/pexels-photo-1657214.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/5110646/pexels-photo-5110646.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/2916337/pexels-photo-2916337.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/2291648/pexels-photo-2291648.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  ];

  return (
    <div>
      <main className="container-destination-detail d-flex flex-column align-items-center bg-white">
        <div className="d-flex justify-content-between header-destination-detail">
          <Slider {...mainSliderOptions}>
            {imageStores.map((imageUrl, index) => (
              <div key={index}>
                <div className="item-carousel">
                  <img src={imageUrl} alt="" />
                </div>
              </div>
            ))}
          </Slider>
          <div>
            <Slider {...subSliderOptions}>
              {imageStores.map((imageUrl, index) => (
                <div key={index}>
                  <div className="item-carousel">
                    <img src={imageUrl} alt="" />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="main-destination-detail">

          {/* GENERAL DESCRIPTION */}
          <div className="d-flex justify-content-between mt-5 mb-4">
            <div>
              <h3>Astera Villa Seminyak</h3>
              <div className="d-flex align-items-center">
                <div className="d-flex">
                  <Star className="text-warning" style={{ fontSize: "18px" }} />
                  <Star className="text-warning" style={{ fontSize: "18px" }} />
                  <Star className="text-warning" style={{ fontSize: "18px" }} />
                  <Star className="text-warning" style={{ fontSize: "18px" }} />
                  <Star className="text-warning" style={{ fontSize: "18px" }} />
                </div>
                <span className="dot bg-fade ml-2 mr-2"></span>
                <h6 className="mb-0 text-secondary font-weight-normal">Seminyak, Bali, Indonesia</h6>
              </div>
              <div className="d-flex align-items-center covid-status mt-3">
                <Check className="mr-2" />
                <span>Standar COVID-19</span>
              </div>
            </div>
            <div className="text-right">
              <h6 className="text-secondary font-weight-normal mb-0">Mulai dari</h6>
              <h4 className="text-primary mb-0">Rp 1.000.000</h4>
              <h6 className="text-secondary font-weight-normal" style={{ fontSize: "13px" }}>per orang</h6>
              <a className="btn btn-primary pl-4 pr-4 mt-1" style={{ borderRadius: "30px" }} href="#pesan-tiket">Pesan Tiket</a>
            </div>
          </div>
          <hr />
          {/* FEATURES DESCRIPTION */}
          <div className="d-flex justify-content-between features-description">
            <div>
              <h5>Deskripsi Destinasi</h5>
              <p className="mt-3">
                Yuk, jelajahi Garuda Wisnu Kencana (GWK) Cultural Park dan lihat patung GWK, salah satu ikon budaya populer di Bali, yang menakjubkan! Lihat langsung patung Dewa Wisnu mengendarai burung Garuda, sebuah mahakarya yang telah melewati 28 tahun perjalanan hingga penyelesaiannya. Ide brilian ini dicetuskan oleh seniman hebat I Nyoman Nuarta di tahun 1989, direalisasikan pada tahun 1997 dan akhirnya selesai pada tahun 2018. Bersama dengan timnya yang luar biasa, I Nyoman Nuarta akhirnya meletakkan modul terakhir dari total 754 modul untuk patungnya! Kini, Anda dapat langsung berdiri di depan karya luar biasa ini hanya dengan 1 tiket saja. Jelajahi tamannya dengan berjalan kaki ataupun Segway, dan jangan lupa untuk menyaksikan tarian Kecak yang legendaris saat matahari terbenam!
              </p>
              <hr />
              <h5>Fasilitas</h5>
              <div className="facility-container mt-3">
                <div className="d-flex align-items-center mt-2 mb-2">
                  <LocalParking className="mr-3" />
                  <p className="mb-0">Tempat Parkir</p>
                </div>
                <div className="d-flex align-items-center mt-2 mb-2">
                  <Wc className="mr-3" />
                  <p className="mb-0">Toilet</p>
                </div>
                <div className="d-flex align-items-center mt-2 mb-2">
                  <Restaurant className="mr-3" />
                  <p className="mb-0">Tempat Makan</p>
                </div>
                <div className="d-flex align-items-center mt-2 mb-2">
                  <Payment className="mr-3" />
                  <p className="mb-0">ATM</p>
                </div>
                <div className="d-flex align-items-center mt-2 mb-2">
                  <Wifi className="mr-3" />
                  <p className="mb-0">Wifi</p>
                </div>
              </div>
              <hr />
              <h5 id="pesan-tiket">Daftar Harga Layanan</h5>
              <div className="ticket-container mt-3">
                <h5>Ini Adalah Title Ticket</h5>
                <p className="text-secondary mb-0">Total 1 tiket untuk 1 orang</p>
                <p>Ini adalah deskripsi singkat dari ticket yang dimaksudkan</p>
                <hr />
                <div className="d-flex justify-content-between">
                  <h5>Rp. 250.000</h5>
                  <button className="btn btn-primary mw-100" style={{ borderRadius: "30px" }} >
                    Beli Tiket
                    </button>
                </div>
              </div>
              <div className="ticket-container mt-3">
                <h5>Ini Adalah Title Ticket</h5>
                <p className="text-secondary mb-0">Total 1 tiket untuk 1 orang</p>
                <p>Ini adalah deskripsi singkat dari ticket yang dimaksudkan</p>
                <hr />
                <div className="d-flex justify-content-between">
                  <h5>Rp. 250.000</h5>
                  <button className="btn btn-primary mw-100" style={{ borderRadius: "30px" }} >
                    Beli Tiket
                    </button>
                </div>
              </div>
            </div>

            <div>
              <div>
                <h6>Lokasi</h6>
                <p>JL. Gempol Marga Bhakti 02/10 No 31, Kelurahan Tanjungrejo, Kecamatan Sukun, Kota Malang, Jawa Timur, Indonesia - 65147</p>
              </div>

              <div className="mt-4">
                <h6>Waktu Buka</h6>
                <p className="mb-0">Senin - Jumat, 08.00 - 15.00</p>
                <p className="mb-0">Sabtu - Minggu, 08.00 - 17.00</p>
              </div>

              <div className="mt-4 review-bar">
                <h6 className="text-primary">Penilaian Umum</h6>
                <hr className="mb-0" />

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <h6 className="mb-0">Kebersihan</h6>
                  <div className="d-flex align-items-center">
                    <Star className="text-warning" style={{ fontSize: "18px" }} />
                    <Star className="text-warning" style={{ fontSize: "18px" }} />
                    <Star className="text-warning" style={{ fontSize: "18px" }} />
                    <Star className="text-warning" style={{ fontSize: "18px" }} />
                    <Star className="text-warning" style={{ fontSize: "18px" }} />
                    <span className="text-muted text-right" style={{ width: "30px" }}>4.2</span>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <h6 className="mb-0">Fasilitas</h6>
                  <div className="d-flex align-items-center">
                    <Star className="text-warning" style={{ fontSize: "18px" }} />
                    <Star className="text-warning" style={{ fontSize: "18px" }} />
                    <Star className="text-warning" style={{ fontSize: "18px" }} />
                    <Star className="text-warning" style={{ fontSize: "18px" }} />
                    <Star className="text-warning" style={{ fontSize: "18px" }} />
                    <span className="text-muted text-right" style={{ width: "30px" }}>4.1</span>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <h6 className="mb-0">Fasilitas</h6>
                  <div className="d-flex align-items-center">
                    <Star className="text-warning" style={{ fontSize: "18px" }} />
                    <Star className="text-warning" style={{ fontSize: "18px" }} />
                    <Star className="text-warning" style={{ fontSize: "18px" }} />
                    <Star className="text-warning" style={{ fontSize: "18px" }} />
                    <Star className="text-warning" style={{ fontSize: "18px" }} />
                    <span className="text-muted text-right" style={{ width: "30px" }}>4.1</span>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <h6 className="mb-0">Fasilitas</h6>
                  <div className="d-flex align-items-center">
                    <Star className="text-warning" style={{ fontSize: "18px" }} />
                    <Star className="text-warning" style={{ fontSize: "18px" }} />
                    <Star className="text-warning" style={{ fontSize: "18px" }} />
                    <Star className="text-warning" style={{ fontSize: "18px" }} />
                    <Star className="text-warning" style={{ fontSize: "18px" }} />
                    <span className="text-muted text-right" style={{ width: "30px" }}>4.1</span>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <h6 className="mb-0">Fasilitas</h6>
                  <div className="d-flex align-items-center">
                    <Star className="text-warning" style={{ fontSize: "18px" }} />
                    <Star className="text-warning" style={{ fontSize: "18px" }} />
                    <Star className="text-warning" style={{ fontSize: "18px" }} />
                    <Star className="text-warning" style={{ fontSize: "18px" }} />
                    <Star className="text-warning" style={{ fontSize: "18px" }} />
                    <span className="text-muted text-right" style={{ width: "30px" }}>4.1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DestinasiDetail;