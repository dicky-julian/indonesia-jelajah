import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import ProductList from '../../layouts/base/product-list';
import { getCityByProvince } from '../../../services/api/location';
import { SearchOutlined } from '@material-ui/icons';

const Destination = ({ province }) => {
  const [isSelectLoading, setIsSelectLoading] = useState();
  const [provinceList, setProvinceList] = useState();
  const [selectedProvince, setSelectedProvince] = useState();
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState();

  const destinationList = [
    'https://preview.colorlib.com/theme/voyage/images/xhotel-1.jpg.pagespeed.ic.K9c20l8TRS.webp',
    'https://preview.colorlib.com/theme/voyage/images/xhotel-2.jpg.pagespeed.ic.A1AJWsIUvX.webp',
    'https://preview.colorlib.com/theme/voyage/images/xhotel-3.jpg.pagespeed.ic.O-33yulQul.webp',
    'https://preview.colorlib.com/theme/voyage/images/xhotel-4.jpg.pagespeed.ic.3KjsOlJLS8.webp',
    'https://preview.colorlib.com/theme/voyage/images/xhotel-5.jpg.pagespeed.ic.Knu6_CUPix.webp'
  ];

  const handleGetCityByProvince = async () => {
    const { value } = selectedProvince;

    await getCityByProvince(value)
      .then((response) => {
        if (response.data) {
          const dataKotaKabupaten = response.data.kota_kabupaten;
          const newDataKotaKabupaten = [];
          dataKotaKabupaten.map((kotaKabupaten) => {
            const { id, nama } = kotaKabupaten;
            return newDataKotaKabupaten.push({
              label: nama,
              value: id
            });
          });
          setCityList(newDataKotaKabupaten);
        }
      });
    setIsSelectLoading();
  }

  useEffect(() => {
    if (selectedProvince) {
      setIsSelectLoading(true);
      handleGetCityByProvince();
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (!provinceList && province) {
      const newProvinceList = [];
      province.map(({ id, nama }) => {
        return newProvinceList.push({
          label: nama,
          value: id
        });
      });

      setProvinceList(newProvinceList);
    }
  }, [provinceList, province]);

  return (
    <div>
      <header className="header-destination d-flex justify-content-center align-items-center">
        <h1 className="font-beyond text-white">Destinasi</h1>
      </header>
      <main className="main-destination d-flex flex-column align-items-center bg-white">
        <div className="d-flex justify-content-between">
          <div className="product-container d-flex justify-content-between">
            {destinationList.map((destination, index) => (
              <ProductList
                key={index}
                title="Luxe Hotel"
                location="Ameeru Ahmed Magu Male’, Maldives"
                imageUrl={destination}
                startPrice="200.000"
                to="/destinasi/id_destinasi"
              />
            ))}
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
                />

                <p className="mt-3 mb-2 text-secondary">Harga</p>
                <input
                  className="custom-react-input w-100"
                  placeholder="000.000.000"
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
                <Link to="/artikel" className="btn-dark-primary d-flex mt-4 w-100 justify-content-between">
                  <p className="mb-0 mr-2">Cari</p>
                  <SearchOutlined />
                </Link>
              </>
              :
              <div>Loading</div>
            }
          </div>
        </div>
      </main>
    </div>
  );
}

export default Destination;