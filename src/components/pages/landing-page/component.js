import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowForward, BugReportOutlined, ContactlessOutlined, InfoOutlined, StorefrontOutlined } from '@material-ui/icons';
import Slider from "react-slick";

const LandingPage = () => {

  const imageStores = [
    'https://preview.colorlib.com/theme/fantasy/img/travel/t3.jpg',
    'https://preview.colorlib.com/theme/fantasy/img/travel/t1.jpg',
    'https://preview.colorlib.com/theme/fantasy/img/travel/t2.jpg',
    'https://preview.colorlib.com/theme/fantasy/img/travel/t3.jpg',
    'https://preview.colorlib.com/theme/fantasy/img/travel/t1.jpg',
    'https://preview.colorlib.com/theme/fantasy/img/travel/t2.jpg',
  ];

  const imageStore2 = [
    'https://preview.colorlib.com/theme/fantasy/img/blog-post/b1.jpg',
    'https://preview.colorlib.com/theme/fantasy/img/blog-post/b2.jpg',
    'https://preview.colorlib.com/theme/fantasy/img/blog-post/b3.jpg',
    'https://preview.colorlib.com/theme/fantasy/img/blog-post/b4.jpg',
    'https://preview.colorlib.com/theme/fantasy/img/blog-post/b5.jpg',
    'https://preview.colorlib.com/theme/fantasy/img/blog-post/b6.jpg'
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    prevArrow: <></>,
    nextArrow: <></>,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]

  };

  return (
    <div>
      <header className="d-flex align-items-end header-landing">
        <div className="d-flex justify-content-center align-items-center vh-100 vw-100 position-fixed header-landing-bg">
          <div className="text-right">
            <h1 className="font-beyond text-light mb-1">Ayo Berwisata</h1>
            <h3 className="font-beyond text-light mb-3">#DiIndonesiaAja!</h3>
          </div>
        </div>
        <img className="w-100" src={require('../../../assets/images/landing-page/header-cloud.webp')} alt="cloud-parallax" />
      </header>

      <main className="main-landing d-flex flex-column align-items-center bg-white">

        {/* INTRODUCTION */}
        <div className="d-flex justify-content-between align-items-center introduction">
          <div className="img" style={{ backgroundImage: 'url(https://preview.colorlib.com/theme/vacation/images/xabout.jpg.pagespeed.ic.diSXLeSU2a.webp)' }}></div>
          <div className="description">
            <h1 className="font-playfair title">Berwisata Aman di Masa Pandemi.</h1>
            <h5 className="text-muted font-weight-light mt-4">
              Industri pariwisata tengah terkena dampak besar akibat Pandemi COVID-19. Banyak pelaku pariwisata yang terpaksa mundur karena pandemi. Melihat semua ini, kita perlu bergerak bersama untuk kembali bangkit dan memutar kembali roda perekonomian.
            </h5>
            <h5 className="text-muted font-weight-light mt-4">
              Melalui gerakan <b>#diIndonesiaAja</b>, Indonesia Jelajah mengajak masyarakat dan para pelaku pariwisata untuk mengambil langkah berani dalam proses pemulihan ekonomi pariwisata di Indonesia, melalui Adaptasi Kebiasaan Baru yang meminimalkan kontak sosial satu sama lain, yang memudahkan wisatawan untuk terhubung langsung dengan sisi pariwisata dengan meminimalisir resiko penularan COVID-19.
            </h5>
            <div className="service-lists mt-3">
              <div className="mt-3">
                <BugReportOutlined />
                <h5 className="mb-0">Standarisasi Covid</h5>
              </div>

              <div className="mt-3">
                <StorefrontOutlined />
                <h5 className="mb-0">Media Pemasaran Wisata</h5>
              </div>

              <div className="mt-3">
                <ContactlessOutlined />
                <h5 className="mb-0">Pemesanan Tiket Daring</h5>
              </div>

              <div className="mt-3">
                <InfoOutlined />
                <h5 className="mb-0">Media Informasi Wisata</h5>
              </div>
            </div>
          </div>
        </div>

        {/* DESTINASI POPULAR */}
        <div className="popular-destination">
          <h1 className="font-playfair title">Temukan Destinasi Terbaik<br />Untuk Liburanmu.</h1>
          <Slider {...settings} className="container-carousel">
            {imageStores.map((imageUrl) => (
              <div>
                <div className="item-carousel">
                  <img src={imageUrl} alt="" />
                  <div className="text-white position-relative item-detail">
                    <h4 className="font-playfair mb-0">Surabaya Curr</h4>
                    <p>Malang, Jawa Timur</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* BLOG */}
        <div className="popular-article">
          <h1 className="font-playfair title">Wawasan Wisata<br /> Hanya Untukmu.</h1>
          <div className="content-field">
            {imageStore2.map((imageUrl) => (
              <div>
                <img src={imageUrl} alt="" />
                <div className="text-white position-relative item-detail">
                  <h4 className="font-playfair mb-0">Artikel Menarik Hanya Untukmu Hanya Untukku</h4>
                  <p>Malang, Jawa Timur</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/artikel" className="btn-dark-primary d-flex mt-3">
            <p className="mb-0 mr-2">Baca Lebih Banyak</p>
            <ArrowForward />
          </Link>
        </div>

        {/* ADVERTISE WORD */}
        <div className="advertise-word">
          <h1 className="font-playfair title">Ciptakan Kisahmu</h1>
          <h4 className="mt-1 font-beyond">#DiIndonesiaAja</h4>
          <h5 className="text-muted font-weight-light mt-4">
            There is a moment in the life of any aspiring astronomer that it is time to buy that first telescope. It’s exciting to think about setting up your own viewing station.
          </h5>
          <div className="content-field">
            <div>
              <div>
                <img src="https://preview.colorlib.com/theme/fantasy/img/places/p1.jpg" />
              </div>
            </div>

            <div>
              <div>
                <img src="https://preview.colorlib.com/theme/fantasy/img/places/p2.jpg" />
              </div>
              <div>
                <img src="https://preview.colorlib.com/theme/fantasy/img/places/p1.jpg" />
              </div>
            </div>

            <div>
              <div>
                <img src="https://preview.colorlib.com/theme/fantasy/img/places/p4.jpg" />
              </div>
              <div>
                <img src="https://preview.colorlib.com/theme/fantasy/img/places/p3.jpg" />
              </div>
            </div>

            <div>
              <div>
                <img src="https://preview.colorlib.com/theme/fantasy/img/places/p3.jpg" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div >
  )
}

export default LandingPage;