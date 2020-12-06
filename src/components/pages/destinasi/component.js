import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import ProductList from '../../layouts/base/product-list';
import { getUserByKey } from '../../../services/api/user';
import { getDestinationByKey } from '../../../services/api/destination';
import { getCityByProvince } from '../../../services/api/location';
import { SearchOutlined } from '@material-ui/icons';
import { Spinner, FullSpinner } from '../../layouts/base/spinner';
import { HelpOutlineOutlined } from '@material-ui/icons';

const Destination = ({ province }) => {
  const [isSelectLoading, setIsSelectLoading] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [provinceList, setProvinceList] = useState();
  const [selectedProvince, setSelectedProvince] = useState();
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState();
  const [destinationList, setDestinationList] = useState(null);
  const [destinationName, setDestinationName] = useState(null);
  const [destinationPrice, setDestinationPrice] = useState(null);

  const handleGetCityByProvince = async () => {
    const { value } = selectedProvince;

    await getCityByProvince(value)
      .then((response) => {
        if (response.data) {
          const dataKotaKabupaten = response.data;
          const newDataKotaKabupaten = [];
          dataKotaKabupaten.map((kotaKabupaten) => {
            const { id, name } = kotaKabupaten;
            return newDataKotaKabupaten.push({
              label: name,
              value: id
            });
          });
          setCityList(newDataKotaKabupaten);
        }
      });
    setIsSelectLoading();
  }

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
      .catch((error) => {
        console.log(error);
      })
  }

  // SUBMIT SEARCH DESTINATION
  const handleFindDestination = async () => {
    setIsSearchLoading(true);
    await getDestinationByKey('displayName', destinationName)
      .then((response) => {
        console.log(response);
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
          console.log(response)
          setDestinationList([]);
        }
      })
    setIsSearchLoading(false);
  }

  useEffect(() => {
    handleGetAllDestination();
  }, [])

  useEffect(() => {
    if (selectedProvince) {
      setIsSelectLoading(true);
      handleGetCityByProvince();
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (!provinceList && province) {
      const newProvinceList = [];
      province.map(({ id, name }) => {
        return newProvinceList.push({
          label: name,
          value: id
        });
      });
      setProvinceList(newProvinceList);
    }
  }, [provinceList, province]);

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
                {provinceList ?
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
                      defaultValue={provinceList[0]}
                      isDisabled={isSelectLoading}
                      isLoading={isSelectLoading}
                      isClearable={true}
                      isSearchable={true}
                      options={provinceList}
                      onChange={(province) => setSelectedProvince(province)}
                    />

                    <p className="mt-3 mb-2 text-secondary">Kota/Kabupaten</p>
                    <Select
                      className="custom-react-select"
                      classNamePrefix="select"
                      isDisabled={isSelectLoading}
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