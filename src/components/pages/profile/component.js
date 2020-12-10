import React, { useEffect, useState } from 'react';
import { Chip } from '@material-ui/core';
import Select from 'react-select';
import { Spinner, FullSpinner } from '../../layouts/base/spinner';
import { Dialog } from '../../layouts/base/dialog';
import { Check, PlayCircleFilledOutlined, PersonOutline, ConfirmationNumberOutlined, ArrowDropDownCircle, BrandingWatermarkOutlined, HelpOutlineOutlined } from '@material-ui/icons';
import QrCode from '../../layouts/base/qrcode';
import Modal from '../../layouts/base/modal';
import { decodeToken } from '../../../helpers/jwt';
import { createUser } from '../../../services/api/user';
import { getDestinationTicketbyUid } from '../../../services/api/destination';
import { addDestinationImage, addDestinationTicket } from '../../../services/api/destination';
import { getTransaction } from '../../../services/api/transaction';
import { generateToken } from '../../../helpers/jwt';
import { showNotification } from '../../layouts/base/notification';
import { facilities } from '../../../services/dummy/destination';
import moment from 'moment';

const Profile = (props) => {
  const { accessToken, setAuthToken, history, dataLocation, handleGetLocation } = props;

  const [userAccount, setUserAccount] = useState();
  const [ticketList, setTicketList] = useState(null);
  const [addTicketData, setAddTicketData] = useState({});

  // Form Input
  const [locationList, setLocationList] = useState();
  const [displayName, setDisplayName] = useState();
  const [selectedProvince, setSelectedProvince] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState(false);
  const [fullAdress, setFullAddress] = useState();
  const [facilitieLists, setFacilitieLists] = useState([]);
  const [destinationDescription, setDestinationDescription] = useState('');
  const [moneyBalance, setMoneyBalanca] = useState(null);

  // Modal Status
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showMoneyModal, setShowMoneyModal] = useState(false);

  // Loading Status
  const [isLoading, setIsLoading] = useState(false);
  const [isSelectLoading, setIsSelectLoading] = useState();
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isMoneyLoading, setIsMoneyLoading] = useState(false);

  const isDisbaleButton = userAccount && selectedProvince && selectedCity ?
    displayName !== userAccount.displayName ||
    selectedProvince.label !== userAccount.province.label ||
    selectedCity.label !== userAccount.city.label ||
    fullAdress !== userAccount.adress
    : false;

  const isDisableDestinationButton = !destinationDescription || !facilitieLists || (facilitieLists && !facilitieLists.length > 2) ? true : false;

  // SUBMIT PROFILE
  const handleProfileSubmit = (actionRole) => {
    const payload = {
      ...userAccount,
      displayName: displayName ? displayName.toLowerCase() : '',
      province: selectedProvince,
      city: selectedCity,
      adress: fullAdress
    }

    if (actionRole === 'destination') {
      payload.destinationDescription = destinationDescription;
      payload.destinationFacilities = facilitieLists;
      if (payload.destinationImages && payload.destinationImages.length > 3 && payload.cheapestPrice) {
        payload.verified = true;
      }
    }

    setIsLoading(true);
    createUser(payload, userAccount.uid)
      .then(() => {
        const newAccessToken = generateToken(payload);
        setAuthToken(newAccessToken);
        showNotification('Berhasil', 'Berhasil menambahkan data', 'success');
      })
      .catch((error) => {
        showNotification('Kesalahan', 'Terjadi Kesalahan ketika menambahkan data', 'danger');
      })
    setIsLoading(false);
  }

  // SUBMIT DESTINATION IMAGE
  const handleAddDestinationImage = async (files) => {
    setIsImageLoading(true);
    await addDestinationImage(userAccount, files)
      .then((payload) => {
        const newAccessToken = generateToken(payload);
        setAuthToken(newAccessToken);
        showNotification('Berhasil', 'Berhasil menambahkan file', 'success');
      })
      .catch((error) => {
        showNotification('Kesalahan', 'Terjadi Kesalahan ketika menambahkan file', 'danger');
      })
    setIsImageLoading(false);
  }


  // HANDLE CHANGE TICKET FIELD
  const handleChangeAddTicket = (e, key) => {
    setAddTicketData({
      ...addTicketData,
      [key]: e.target.value
    })
  }

  // SUBMIT TICKET
  const handleSubmitAddTicket = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    await addDestinationTicket(addTicketData, userAccount.uid)
      .then((response) => {
        if (response.data) {
          let cheapestPrice = userAccount.cheapestPrice;
          if (!cheapestPrice || (addTicketData.price < cheapestPrice)) {
            const payload = {
              ...userAccount,
              cheapestPrice: addTicketData.price
            }

            if (payload.destinationImages && payload.destinationImages.length > 3) {
              payload.verified = true;
            }
            const newAccessToken = generateToken(payload);
            setAuthToken(newAccessToken);
            createUser(payload, userAccount.uid);
          }
          const listOfTicket = [
            ...ticketList
          ];

          listOfTicket.push(response.data);
          setTicketList(listOfTicket);
          showNotification('Berhasil', 'Berhasil menambahkan tiket', 'success');
        }
      })
      .catch((e) => {
        showNotification('Kesalahan', 'Terjadi Kesalahan ketika menambahkan tiket', 'danger');
      })
    setShowTicketModal(false);
    setIsLoading(false);
  }

  // SUBMIT DIGITAL MONEY
  const handleSubmitMoney = async (e) => {
    e.preventDefault();
    setIsMoneyLoading(true);
    const payload = {
      ...userAccount,
      money_balance: userAccount.money_balance ? parseInt(userAccount.money_balance) + parseInt(moneyBalance) : parseInt(moneyBalance)
    }

    await createUser(payload, userAccount.uid)
      .then(() => {
        const newAccessToken = generateToken(payload);
        setAuthToken(newAccessToken);
        showNotification('Berhasil', 'Berhasil tambah uang digital', 'success');
      })
      .catch(() => {
        showNotification('Kesalahan', 'Kesalahan ketika menambahkan uang digital', 'error');
      })

    setIsMoneyLoading(false);
    setShowMoneyModal(false);
  }

  const handleChangeProvince = async ({ label, value, key }) => {
    setIsSelectLoading(true);
    setSelectedCity(null);
    setSelectedProvince({ label, value });

    const listOfCity = [];
    locationList[key].regency.map(({ id, name }) => {
      listOfCity.push({
        label: name,
        value: id
      })
    })

    setCityList(listOfCity);
    setIsSelectLoading(false);
  }

  useEffect(() => {
    if (!locationList && dataLocation) {
      const newLocationList = [];
      dataLocation.map(({ id, name, regency }, index) => {
        newLocationList.push({
          label: name,
          value: id,
          regency,
          key: index
        });
      });
      setLocationList(newLocationList);
    } else if (!dataLocation) {
      handleGetLocation();
    }
  }, [dataLocation])

  // SET USER ACCOUNT
  useEffect(() => {
    if (accessToken) {
      const tokenData = decodeToken(accessToken);
      setUserAccount(tokenData);
    } else {
      setUserAccount();
      history.push('/');
    }
  }, [accessToken])

  // SET USER LOCATION
  useEffect(() => {
    if (userAccount) {
      setSelectedProvince(userAccount.province);
      setSelectedCity(userAccount.city);
      setDisplayName(userAccount.displayName);
      setFullAddress(userAccount.adress);

      if (userAccount.role === 1) {
        getTransaction(userAccount.uid)
          .then((response) => {
            if (response.data) {
              const listOfTicket = [];
              for (let ticketKey in response.data) {
                const ticketData = {
                  ...response.data[ticketKey],
                  code_transaction: ticketKey
                }
                listOfTicket.push(ticketData);
              }
              setTicketList(listOfTicket);
            } else {
              setTicketList([]);
            }
          }).catch(() => {
            setTicketList([]);
          })
      } else if (userAccount.role === 2) {
        setDestinationDescription(userAccount.destinationDescription);
        setFacilitieLists(userAccount.destinationFacilities);

        if (!ticketList) {
          getDestinationTicketbyUid(userAccount.uid)
            .then((response) => {
              if (response.data) {
                const listOfTicket = [];
                for (let ticketKey in response.data) {
                  listOfTicket.push(response.data[ticketKey]);
                }
                setTicketList(listOfTicket);
              } else {
                setTicketList([]);
              }
            })
        }
      } else {
        setTicketList([])
      }
    }
  }, [userAccount])

  return (
    <div>
      <main className="container-destination-detail d-flex flex-column align-items-center bg-white">
        {accessToken && userAccount && locationList && cityList && selectedProvince !== false && selectedCity !== false && ticketList ?
          <div className="d-flex cart-container">
            <div className="preference-bar">
              <h4 className="text-capitalize">{userAccount.displayName}</h4>
              <p className="text-muted mb-0">{userAccount.email}</p>
              <hr />
              <a href="#profil-saya" className="d-flex w-100 align-items-center pt-3 pb-3 text-black">
                <PersonOutline className="mr-2" />
                <span>Profil Saya</span>
              </a>

              {userAccount.role === 2 && (
                <a href="#profil-wisata" className="d-flex w-100 align-items-center pt-3 pb-3 text-black">
                  <BrandingWatermarkOutlined className="mr-2" />
                  <span>Profil Destinasi</span>
                </a>
              )}

              {userAccount.role === 1 &&
                <a href="#pesanan-saya" className="d-flex w-100 align-items-center pt-3 pb-3 text-black">
                  <ConfirmationNumberOutlined className="mr-2" />
                  <span>Tiket Saya</span>
                </a>
              }

              {userAccount.role === 2 &&
                <a href="#daftar-tiket" className="d-flex w-100 align-items-center pt-3 pb-3 text-black">
                  <ConfirmationNumberOutlined className="mr-2" />
                  <span>Daftar Tiket</span>
                </a>}
            </div>
            <div className="profile-container">

              {/* LIST ACCOUNT'S INFORMATIONS */}
              <div id="profil-saya" className="p-3">
                <div className="d-flex">
                  <PersonOutline className="mr-2" />
                  <h4>Informasi Akun</h4>
                </div>
                <p className="text-muted">Atur dan Kelola data profilmu.</p>
                <div className="account-view">
                  <div className="p-3">
                    <div className="mb-3">
                      <small className="text-muted">Email</small>
                      <h6 className="font-weight-normal">{userAccount.email}</h6>
                    </div>
                    <div className="mb-3">
                      <small className="text-muted">Kode Uang Digital</small>
                      <h6 className="font-weight-normal">{userAccount.money_code}</h6>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <small className="text-muted">Saldo Uang Digital</small>
                        <h6 className="font-weight-normal">Rp. {userAccount.money_balance}</h6>
                      </div>
                      {userAccount.role === 1 &&
                        <Chip
                          label="Tambah Saldo"
                          onDelete={() => setShowMoneyModal(true)}
                          deleteIcon={<PlayCircleFilledOutlined />}
                        />
                      }
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-secondary">Nama Pengguna</p>
                    <input
                      className="custom-react-input w-100"
                      defaultValue={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />

                    <p className="mt-4 mb-2 font-weight-bold">Alamat Pengguna</p>
                    <p className="mb-2 text-secondary">Provinsi</p>
                    <Select
                      className="custom-react-select"
                      classNamePrefix="select"
                      defaultValue={selectedProvince}
                      isDisabled={isSelectLoading}
                      isLoading={isSelectLoading}
                      isClearable={true}
                      isSearchable={true}
                      options={locationList}
                      onChange={(province) => handleChangeProvince(province)}
                    />

                    <p className="mt-3 mb-2 text-secondary">Kota/Kabupaten</p>
                    <Select
                      className="custom-react-select"
                      classNamePrefix="select"
                      defaultValue={selectedCity}
                      isDisabled={isSelectLoading}
                      isLoading={isSelectLoading}
                      isClearable={true}
                      isSearchable={true}
                      options={cityList}
                      onChange={(city) => setSelectedCity(city)}
                    />

                    <p className="mt-3 mb-2 text-secondary">Alamat Lengkap</p>
                    <input
                      className="custom-react-input w-100"
                      defaultValue={fullAdress}
                      onChange={(e) => setFullAddress(e.target.value)}
                    />

                    <button onClick={() => handleProfileSubmit('user')} className={`mt-3 ${!isDisbaleButton ? 'disable' : 'cursor-pointer'}`} disabled={!isDisbaleButton}>
                      {isLoading ? <Spinner variant="light" /> : 'Simpan'}
                    </button>
                  </div>
                </div>
              </div>

              {/* LIST ORDER'S INFORMATIONS */}
              {userAccount.role === 1 ?
                <div id="pesanan-saya" className="p-3 mt-3">
                  <div className="d-flex">
                    <ConfirmationNumberOutlined className="mr-2" />
                    <h4>Informasi Pesanan</h4>
                  </div>
                  {ticketList.length ?
                    <>
                      {ticketList.map((data, index) => (
                        <div className="product-ticket-container mt-3" key={index}>
                          <div className="d-flex flex-column justify-content-center align-items-center bg-primary text-white">
                            <h3>{data.date ? moment(data.date).format('DD') : ''}</h3>
                            <span>{data.date ? moment(data.date).format('MMMM YYYY') : ''}</span>
                          </div>

                          <div className="p-3">
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="mb-0">Kode Pesanan : <b>{data.code_transaction}</b></p>
                              <h6 className="mb-0 text-success">Terverifikasi</h6>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between align-items-end ticket-lists">
                              <div style={{ width: 'calc(100% - 90px)' }}>
                                <h5>{data.details ? data.details.title : ''}</h5>
                                <h6 className="text-muted font-weight-normal">{data.details && data.details.description ? data.details.description.slice(0, 60) : ''}...</h6>
                                <h6 className="text-primary mb-0">Rp. {data.details ? data.details.price : ''}</h6>
                              </div>
                              <QrCode value={data.id_transaction} />
                            </div>
                          </div>
                        </div>
                      ))
                      }
                    </>
                    :
                    <div className="empty-section mt-3">
                      <HelpOutlineOutlined />
                      <p className="mt-2">Upps....Pencarian tidak ditemukan.</p>
                    </div>
                  }
                </div>
                :
                <div id="daftar-tiket" className="p-3 mt-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex">
                      <ConfirmationNumberOutlined className="mr-2" />
                      <h4>Informasi Tiket Layanan</h4>
                    </div>
                    <button className="btn btn-primary" onClick={() => setShowTicketModal(true)}>
                      Tambah Tiket
                  </button>
                  </div>
                  {ticketList.map((ticket, index) => (
                    <div className="ticket-container mt-3" key={index}>
                      <h5>{ticket.title}</h5>
                      <p className="text-secondary mb-0 text-break">{ticket.description.slice(0, 200)}...</p>
                      <hr />
                      <div className="d-flex justify-content-between">
                        <h5>Rp. {ticket.price}</h5>
                      </div>
                    </div>
                  ))}
                </div>
              }

              {/* LIST OF PRODUCT'S INFORMATIONS */}
              {userAccount.role === 2 &&
                <div id="profil-wisata" className="p-3 mt-3">
                  <div className="d-flex justify-content-between">
                    <div>
                      <div className="d-flex">
                        <PersonOutline className="mr-2" />
                        <h4>Informasi Destinasi</h4>
                      </div>
                      <p className="text-muted">Ciptakan profil menarik untuk wisatamu.</p>
                    </div>
                    <div className="d-flex align-items-center covid-status mt-3 h-fit-content">
                      <Check className="mr-2" />
                      <span>Standar COVID-19</span>
                    </div>
                  </div>
                  <div className="destination-account-view">
                    <div className="d-flex destination-gallery">
                      {userAccount.destinationImages && userAccount.destinationImages.map((imageUrl, index) => (
                        <img src={imageUrl} key={index} />
                      ))}
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <ul>
                        <li className="text-danger mb-0 warning-text">Foto setidaknya harus berjumlah 4 agar destinasi dapat tervalidasi *</li>
                        <li className="text-danger mb-0 warning-text">Foto harus berukuran di bawah 3MB *</li>
                      </ul>
                      <button className="btn btn-sm btn-primary d-inline-flex btn-add-img" disabled={isImageLoading}>
                        {isImageLoading ? <Spinner variant="light" /> : 'Tambahkan Foto'}
                        <input type="file" className="position-absolute" onChange={(e) => handleAddDestinationImage(e.target.files)} />
                      </button>
                    </div>

                    <div className="destination-details">
                      <p className="mt-3 mb-2 text-muted">Deskripsi Destinasi</p>
                      <textarea rows="10" onChange={(e) => setDestinationDescription(e.target.value)} defaultValue={destinationDescription}></textarea>

                      <p className="mt-3 mb-2 text-muted">Fasilitas Destinasi</p>
                      <Select
                        isMulti
                        options={facilities}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        value={facilitieLists}
                        onChange={(e) => setFacilitieLists(e)}
                      />
                      <button onClick={() => handleProfileSubmit('destination')} className={`mt-3 ${isDisableDestinationButton ? 'disable' : 'cursor-pointer'}`} disabled={isDisableDestinationButton}>
                        {isLoading ? <Spinner variant="light" /> : 'Simpan'}
                      </button>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
          :
          <FullSpinner />}
      </main>

      {/* TICKET MODAL */}
      <Modal showModal={showTicketModal}>
        <form onSubmit={(e) => handleSubmitAddTicket(e)} className="p-3">
          <h4>Tambah Tiket Layanan</h4>
          <div className="ticket-container ticket-form-container p-3 mt-3">
            <input
              placeholder="Judul/Label Tiket"
              onChange={(e) => handleChangeAddTicket(e, 'title')}
              defaultValue={addTicketData && addTicketData.title ? addTicketData.title : ''}
              required
            />
            <textarea
              className="w-100"
              placeholder="Deskripsi Tiket"
              onChange={(e) => handleChangeAddTicket(e, 'description')}
              defaultValue={addTicketData && addTicketData.description ? addTicketData.description : ''}
              required
            >
            </textarea>
            <hr />
            <div className="d-flex justify-content-between">
              <input
                placeholder="Harga Tiket"
                onChange={(e) => handleChangeAddTicket(e, 'price')}
                defaultValue={addTicketData && addTicketData.price ? addTicketData.price : ''}
                type="number"
                required
              />
            </div>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <button type="button" className="btn btn-secondary w-50 mr-1" onClick={() => setShowTicketModal(false)}>Kembali</button>
            <button
              type="submit"
              className="btn btn-primary w-50 ml-1"
            >
              {isLoading ? <Spinner /> : 'Simpan'}
            </button>
          </div>
        </form>
      </Modal>

      {/* MONEY MODAL */}
      <Dialog
        open={showMoneyModal}
        onClose={setShowMoneyModal}
        title="Tambah Saldo Uang Digital"
      >
        <form onSubmit={handleSubmitMoney}>
          <p className="mt-3 mb-2 text-secondary">Nominal Penambahan</p>
          <input
            className="custom-react-input w-100"
            onChange={(e) => setMoneyBalanca(e.target.value)}
            type="number"
            placeholder="Rp. "
            required
          />
          <button type="submit" className="btn btn-primary w-100 mt-3">
            {isMoneyLoading ? <Spinner /> : 'Tambah'}
          </button>
        </form>
      </Dialog>
    </div >
  )
}

export default Profile;