import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import { TextField } from '@material-ui/core';
import { Star, Check } from '@material-ui/icons';
import Modal from '../../layouts/base/modal';
import { getUserByUid } from '../../../services/api/user';
import { getDestinationTicketbyUid } from '../../../services/api/destination';
import { createTransaction } from '../../../services/api/transaction';
import { createUser } from '../../../services/api/user';
import { showNotification } from '../../layouts/base/notification';
import { FullSpinner } from '../../layouts/base/spinner';
import { facilitiesIcons } from '../.././../services/dummy/destination';
import { decodeToken, generateToken } from '../../../helpers/jwt';
import { randomAlphaNumeric } from '../../../helpers/random';

const DestinasiDetail = (props) => {
  const { match, accessToken, setAuthToken } = props;
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [dataDestination, setDataDestination] = useState(null);
  const [dataTicket, setDataTicket] = useState(null);
  const [userAccount, setUserAccount] = useState(null);
  const [dateFormTicket, setDateFormTicket] = useState(null);
  const id_destination = match.params.id_destinasi;
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
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          dots: false
        }
      }
    ]
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
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
        }
      },
    ]
  }

  const handleFetchDestination = async () => {
    await getUserByUid(id_destination)
      .then((response) => {
        const { data, error } = response;
        if (!error && data) {
          setDataDestination(data);
        } else {
          setDataDestination();
        }
      })
      .catch(() => {
        setDataDestination();
      })

    await getDestinationTicketbyUid(id_destination)
      .then((response) => {
        const { data, error } = response;
        if (!error && data) {
          const listOfTicket = [];
          for (let ticketKey in data) {
            listOfTicket.push({
              ...data[ticketKey],
              id_ticket: ticketKey
            });
          }
          setDataTicket(listOfTicket);
        } else {
          setDataTicket();
        }
      })
      .catch(() => {
        setDataTicket();
      })
  }

  const handlePaidTicket = (ticketDetail) => {
    if (!dateFormTicket || dateFormTicket === 'error') {
      setDateFormTicket('error');
    } else {
      const transactionData = {
        id_transaction: randomAlphaNumeric(5, 3),
        id_destination,
        id_user: userAccount.uid,
        details: ticketDetail,
        date: dateFormTicket
      }
      const payload = {
        ...userAccount,
        money_balance: userAccount.money_balance - ticketDetail.price
      }

      createTransaction(transactionData)
        .then(() => {
          createUser(payload, userAccount.uid)
            .then(() => {
              const newAccessToken = generateToken(payload);
              setAuthToken(newAccessToken);
              showNotification('Berhasil', 'Berhasil menambahkan transaksi.', 'success');
            })
            .catch(() => {
              showNotification('Kesalahan', 'Kesalahan ketika menambahkan transaksi.', 'danger');
            })
        })
        .catch(() => {
          showNotification('Kesalahan', 'Kesalahan ketika menambahkan transaksi.', 'danger');
        })
    }

    setShowTransactionModal(false);
  }

  useEffect(() => {
    handleFetchDestination();
  }, [])

  // SET USER ACCOUNT
  useEffect(() => {
    if (accessToken) {
      const tokenData = decodeToken(accessToken);
      console.log(tokenData);
      setUserAccount(tokenData);
    } else {
      setUserAccount(null);
    }
  }, [accessToken])

  return (
    <div>
      {dataDestination === null && dataTicket === null ?
        <FullSpinner />
        :
        dataDestination ?
          <main className="container-destination-detail d-flex flex-column align-items-center bg-white">
            <div className="d-flex justify-content-between header-destination-detail">
              <Slider {...mainSliderOptions}>
                {dataDestination.destinationImages && dataDestination.destinationImages.map((imageUrl, index) => (
                  <div key={index}>
                    <div className="item-carousel">
                      <img src={imageUrl} alt="" />
                    </div>
                  </div>
                ))}
              </Slider>
              <div>
                <Slider {...subSliderOptions}>
                  {dataDestination.destinationImages && dataDestination.destinationImages.map((imageUrl, index) => (
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
                  <h3 className="text-capitalize">{dataDestination.displayName}</h3>
                  <div className="d-flex align-items-center">
                    <div className="d-flex">
                      <Star className="text-warning" style={{ fontSize: "18px" }} />
                      <Star className="text-warning" style={{ fontSize: "18px" }} />
                      <Star className="text-warning" style={{ fontSize: "18px" }} />
                      <Star className="text-warning" style={{ fontSize: "18px" }} />
                      <Star className="text-warning" style={{ fontSize: "18px" }} />
                    </div>
                    <span className="dot bg-fade ml-2 mr-2"></span>
                    <h6 className="mb-0 text-secondary font-weight-normal text-capitalize">{dataDestination.city ? dataDestination.city.label.toLowerCase() : ''}, {dataDestination.province ? dataDestination.province.label.toLowerCase() : ''}, Indonesia</h6>
                  </div>
                  <div className="d-flex align-items-center covid-status mt-3">
                    <Check className="mr-2" />
                    <span>Standar COVID-19</span>
                  </div>
                </div>
                <div className="text-right">
                  <h6 className="text-secondary font-weight-normal mb-0">Mulai dari</h6>
                  <h4 className="text-primary mb-0">Rp. {dataDestination.cheapestPrice}</h4>
                  <h6 className="text-secondary font-weight-normal" style={{ fontSize: "13px" }}>per orang</h6>
                  {(userAccount && userAccount.role === 1) && (
                    <a className="btn btn-primary pl-4 pr-4 mt-1" style={{ borderRadius: "30px" }} href="#pesan-tiket">Beli Tiket</a>
                  )}
                </div>
              </div>
              <hr />
              {/* FEATURES DESCRIPTION */}
              <div className="d-flex justify-content-between features-description">
                <div>
                  <h5>Deskripsi Destinasi</h5>
                  <p className="mt-3 text-justify">{dataDestination.destinationDescription}</p>
                  <hr />
                  <h5>Fasilitas</h5>
                  <div className="facility-container mt-3">
                    {(dataDestination.destinationFacilities && dataDestination.destinationFacilities) &&
                      dataDestination.destinationFacilities.map(({ label, value }, index) => (
                        <div className="d-flex align-items-center mt-2 mb-2" key={index}>
                          {facilitiesIcons[value]}
                          <p className="mb-0 ml-3">{label}</p>
                        </div>
                      ))
                    }
                  </div>
                  <hr />
                  <h5 id="pesan-tiket">Daftar Harga Layanan</h5>
                  {dataTicket && dataTicket.length ?
                    dataTicket.map((ticket, index) => (
                      <div className="ticket-container mt-3" key={index}>
                        <div className="d-flex justify-content-between">
                          <h5>{ticket.title}</h5>
                          {/* <div className="text-primary cursor-pointer">Detail</div> */}
                        </div>
                        <p className="text-secondary mb-0">{ticket.description.slice(0, 200)}...</p>
                        <hr />
                        <div className="d-flex justify-content-between">
                          <h5>Rp. {ticket.price}</h5>
                          {(userAccount && userAccount.role === 1) && (
                            <button className="btn btn-primary mw-100" style={{ borderRadius: "30px" }} onClick={() => setShowTransactionModal(ticket)}>
                              Beli Tiket
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                    :
                    <div>Kosong</div>
                  }
                </div>

                <div>
                  <div>
                    <h6>Lokasi</h6>
                    <p>{dataDestination.adress}</p>
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
                      <h6 className="mb-0">Lokasi</h6>
                      <div className="d-flex align-items-center">
                        <Star className="text-warning" style={{ fontSize: "18px" }} />
                        <Star className="text-warning" style={{ fontSize: "18px" }} />
                        <Star className="text-warning" style={{ fontSize: "18px" }} />
                        <Star className="text-warning" style={{ fontSize: "18px" }} />
                        <Star className="text-warning" style={{ fontSize: "18px" }} />
                        <span className="text-muted text-right" style={{ width: "30px" }}>4.3</span>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <h6 className="mb-0">Layanan</h6>
                      <div className="d-flex align-items-center">
                        <Star className="text-warning" style={{ fontSize: "18px" }} />
                        <Star className="text-warning" style={{ fontSize: "18px" }} />
                        <Star className="text-warning" style={{ fontSize: "18px" }} />
                        <Star className="text-warning" style={{ fontSize: "18px" }} />
                        <Star className="text-warning" style={{ fontSize: "18px" }} />
                        <span className="text-muted text-right" style={{ width: "30px" }}>4.5</span>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <h6 className="mb-0">Kepuasan</h6>
                      <div className="d-flex align-items-center">
                        <Star className="text-warning" style={{ fontSize: "18px" }} />
                        <Star className="text-warning" style={{ fontSize: "18px" }} />
                        <Star className="text-warning" style={{ fontSize: "18px" }} />
                        <Star className="text-warning" style={{ fontSize: "18px" }} />
                        <Star className="text-warning" style={{ fontSize: "18px" }} />
                        <span className="text-muted text-right" style={{ width: "30px" }}>4.2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Modal
              showModal={showTransactionModal ? true : false}
              setShowModal={setShowTransactionModal}
              footerStyle={{ backgroundColor: '#f1f9ff' }}
              closeTitle="Batal"
              submitTitle={(showTransactionModal && showTransactionModal.price <= userAccount.money_balance) ? 'Beli Tiket' : null}
              submitAction={(showTransactionModal && showTransactionModal.price <= userAccount.money_balance) ? () => handlePaidTicket(showTransactionModal) : null}
              style={{ width: 500, maxWidth: '80vw' }}
            >
              <div style={{ backgroundColor: '#f1f9ff', padding: 30 }}>
                <h4 className="font-playfair">Detail Pesanan</h4>
                <hr />
                {(showTransactionModal && showTransactionModal.price > userAccount.money_balance) && (
                  <div className="alert alert-danger" role="alert">
                    Saldo anda tidak cukup untuk melakukan transaksi ini.
                  </div>
                )}

                <p className="mt-3 mb-2">Tanggal Pesanan</p>
                <div
                  className="custom-react-input w-100 pt-2 pb-2"
                  style={{
                    border: `1px solid ${dateFormTicket === 'error' ? '#ff9595' : 'rgba(0, 0, 0, 0.1)'}`
                  }}
                >
                  <TextField
                    id="date"
                    type="date"
                    defaultValue={dateFormTicket || ''}
                    onChange={(e) => setDateFormTicket(e.target.value)}
                    className="w-100"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                {dateFormTicket === 'error' && (
                  <small className="mt-1 text-danger">Tanggal pesanan tidak boleh kosong.</small>
                )}
              </div>
            </Modal>
          </main>
          :
          <div>Kosong Pak</div>
      }
    </div >
  )
}

export default DestinasiDetail;