import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import ProductList from '../../layouts/base/product-list';
import { getUserByKey } from '../../../services/api/user';
import { getDestinationByKey } from '../../../services/api/destination';
import { SearchOutlined } from '@material-ui/icons';
import { Spinner, FullSpinner } from '../../layouts/base/spinner';
import { HelpOutlineOutlined } from '@material-ui/icons';

const Destination = ({ handleGetLocation, dataLocation }) => {
  const [isSelectLoading, setIsSelectLoading] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [locationList, setLocationList] = useState();
  const [selectedProvince, setSelectedProvince] = useState();
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState();
  const [destinationList, setDestinationList] = useState(null);
  const [destinationName, setDestinationName] = useState(null);
  const [destinationPrice, setDestinationPrice] = useState(null);

  const handleGetAllDestination = async () => {
    await getUserByKey('verified', true)
      .then((response) => {
        if (response) {
          const listOfDestination = [];
          for (let destinationKey in response) {
            listOfDestination.push(response[destinationKey])
          }
          setDestinationList(listOfDestination);
        }
      })
      .catch(() => {
        setDestinationList(null);
      })
  }

  const handleChangeProvince = async (province) => {

    if (province) {
      const { label, value, key } = province;

      setIsSelectLoading(true);
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
  }

  // SUBMIT SEARCH DESTINATION
  const handleFindDestination = async () => {
    setIsSearchLoading(true);
    await getDestinationByKey('displayName', destinationName)
      .then((response) => {
        if (response) {
          let destinationResult = [];
          for (let destinationIndex in response) {
            destinationResult.push(response[destinationIndex]);
          }

          if (destinationResult && destinationResult.length) {
            destinationResult = destinationResult.filter(({ verified }) => (
              verified === true
            ))

            if (destinationPrice) {
              destinationResult = destinationResult.filter(({ cheapestPrice }) => (
                cheapestPrice <= destinationPrice
              ))
            }

            if (selectedProvince) {
              destinationResult = destinationResult.filter(({ province }) => (
                province.value === selectedProvince.value
              ))
            }

            if (selectedCity) {
              destinationResult = destinationResult.filter(({ city }) => (
                city.value === selectedCity.value
              ))
            }
          }

          setDestinationList(destinationResult);
        } else {
          setDestinationList([]);
        }
      })
    setIsSearchLoading(false);
  }

  useEffect(() => {
    handleGetAllDestination();
  }, [])

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
  }, [dataLocation]);

  return (
    <div>
      {destinationList ?
        <>
          <header className="header-destination d-flex justify-content-center align-items-center">
            <h1 className="font-beyond text-white">Destinasi</h1>
          </header>
          <main className="main-destination d-flex flex-column align-items-center bg-white">
            <div className="d-flex justify-content-between">
              <div className="product-container d-flex justify-content-between">
                {destinationList.length ?
                  destinationList.map(({
                    displayName, province, city, destinationImages, uid, cheapestPrice
                  }, index) => (
                      <ProductList
                        key={index}
                        title={displayName}
                        location={`${city.label}, ${province.label}`}
                        imageUrl={destinationImages[0]}
                        startPrice={cheapestPrice}
                        to={`/destinasi/${uid}`}
                      />
                    ))
                  :
                  <div className="empty-section">
                    <HelpOutlineOutlined />
                    <p className="mt-2">Upps....Pencarian tidak ditemukan.</p>
                  </div>
                }
              </div>
              <div className="preference-bar">
                {locationList ?
                  <>
                    <h4 className="font-playfair">Temukan Destinasi</h4>
                    <hr />

                    <p className="mb-2 text-secondary">Nama Destinasi</p>
                    <input
                      className="custom-react-input w-100"
                      placeholder="Monumen Nasional"
                      onChange={(e) => setDestinationName(e.target.value)}
                    />

                    <p className="mt-3 mb-2 text-secondary">Harga</p>
                    <input
                      className="custom-react-input w-100"
                      placeholder="100000"
                      type="number"
                      onChange={(e) => setDestinationPrice(e.target.value)}
                    />

                    <p className="mt-3 mb-2 text-secondary">Provinsi</p>
                    <Select
                      className="custom-react-select"
                      classNamePrefix="select"
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
                      isDisabled={isSelectLoading || !selectedProvince}
                      isLoading={isSelectLoading}
                      isClearable={true}
                      isSearchable={true}
                      options={cityList}
                      onChange={(city) => setSelectedCity(city)}
                    />
                    <button
                      className={`btn-dark-primary mt-4 w-100 justify-content-between ${(isSearchLoading || !destinationName) && 'disable'}`}
                      onClick={() => handleFindDestination()}
                      disabled={isSearchLoading || !destinationName}
                    >
                      <p className="mb-0 mr-2"> Cari</p>
                      {isSearchLoading ? <Spinner /> : <SearchOutlined />}
                    </button>
                  </>
                  :
                  <div>Loading</div>
                }
              </div>
            </div>
          </main>
        </>
        :
        <FullSpinner />
      }
    </div>
  );
}

export default Destination;