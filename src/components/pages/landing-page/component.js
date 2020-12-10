import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowForward, BugReportOutlined, ContactlessOutlined, InfoOutlined, StorefrontOutlined } from '@material-ui/icons';
import { FullSpinner } from '../../layouts/base/spinner';
import Slider from "react-slick";
import { getDestinationWithLimit } from '../../../services/api/destination';
import { getArticleWithLimit } from '../../../services/api/article';

const LandingPage = () => {
  const [destinationData, setDestinationData] = useState();
  const [articleData, setArticleData] = useState();

  const handleGetDestinationData = async () => {
    await getDestinationWithLimit(8)
      .then((response) => {
        if (response) {
          const listOfDestination = [];
          for (let destinationKey in response) {
            if (response[destinationKey].verified) {
              listOfDestination.push(response[destinationKey])
            }
          }

          setDestinationData(listOfDestination);
        } else {
          setDestinationData(null);
        }
      })
      .catch((error) => {
        setDestinationData(null);
      })
  }

  const handleGetArticleData = async () => {
    await getArticleWithLimit(6)
      .then((response) => {
        if (response) {
          const listOfArticle = [];
          for (let articleKey in response) {
            if (response[articleKey]) {
              for (let articleChilKey in response[articleKey]) {
                if (response[articleKey][articleChilKey]) {
                  listOfArticle.push({
                    ...response[articleKey][articleChilKey],
                    uid: articleKey,
                    id: articleChilKey
                  });
                }
              }
            }
          }

          setArticleData(listOfArticle);
        } else {
          setArticleData(null);
        }
      })
      .catch((error) => {
        setArticleData(null);
      })
  }

  useEffect(() => {
    if (!destinationData) {
      handleGetDestinationData();
    }
  }, [destinationData]);

  useEffect(() => {
    if (!articleData) {
      handleGetArticleData();
    }
  })

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
    <>{destinationData && articleData ?
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
            <div className="img" style={{ backgroundImage: `url(${require('../../../assets/images/landing-page/intro.webp')})` }}></div>
            <div className="description">
              <h1 className="font-playfair">Berwisata Aman di Masa Pandemi.</h1>
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
            <h1 className="font-playfair">Temukan Destinasi Terbaik<br />Untuk Liburanmu.</h1>
            <Slider {...settings} className="container-carousel">
              {destinationData.map(({ destinationImages, displayName, province, city, uid }, index) => (
                <Link to={`/destinasi/${uid}`}>
                  <div key={index}>
                    <div className="item-carousel animation">
                      <img src={destinationImages && destinationImages[0]} alt="" />
                      <div className="text-white position-relative item-detail">
                        <h4 className="font-playfair mb-0 text-capitalize">{displayName || '-'}</h4>
                        <p className="text-capitalize">{city && province ? `${city.label ? city.label.toLowerCase() : '-'}, ${province.label ? province.label.toLowerCase() : '-'}` : '-'}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </Slider>
          </div>

          {/* BLOG */}
          <div className="popular-article">
            <h1 className="font-playfair">Wawasan Wisata<br /> Hanya Untukmu.</h1>
            <div className="content-field">
              {articleData.map(({ title, user, image, uid, id }, index) => (
                <div key={index}>
                  <img src={image} alt="" />
                  <div className="text-white position-relative item-detail">
                    <Link to={`/artikel/${uid}/${id}`}>
                      <h4 className="font-playfair mb-0 text-white">{title ? `${title.slice(0, 40)}...` : '-'}</h4>
                    </Link>
                    <p>{user}</p>
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
            <h1 className="font-playfair">Ciptakan Kisahmu</h1>
            <h4 className="mt-1 font-beyond">#DiIndonesiaAja</h4>
            <h5 className="text-muted font-weight-light mt-4">
              There is a moment in the life of any aspiring astronomer that it is time to buy that first telescope. It’s exciting to think about setting up your own viewing station.
          </h5>
            <div className="content-field">
              <div>
                <div>
                  <img src={require('../../../assets/images/landing-page/img1.webp')} alt="" />
                </div>
              </div>

              <div>
                <div>
                  <img src={require('../../../assets/images/landing-page/img2.webp')} alt="" />
                </div>
                <div>
                  <img src={require('../../../assets/images/landing-page/img3.webp')} alt="" />
                </div>
              </div>

              <div>
                <div>
                  <img src={require('../../../assets/images/landing-page/img4.webp')} alt="" />
                </div>
                <div>
                  <img src={require('../../../assets/images/landing-page/img5.webp')} alt="" />
                </div>
              </div>

              <div>
                <div>
                  <img src={require('../../../assets/images/landing-page/img6.webp')} alt="" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div >
      :
      <FullSpinner />
    }
    </>
  )
}

export default LandingPage;