import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import Select from 'react-select';

const Login = ({ handleLogin, handleGetAllProvince, showFormRegister, province }) => {
  const [optionProvince, setOptionProvince] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState([]);
  // const [selectedCity, setSelectedCity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!province) {
      handleGetAllProvince();
    } else if (province && !optionProvince.length) {
      const options = [];

      province.map(({ id, nama }) => {
        options.push({
          label: nama,
          value: id
        });
      });

      setOptionProvince(options);
    }
  });

  useEffect(() => {
    console.log(selectedProvince);
  }, [selectedProvince]);

  return (
    <>
      <Button variant="contained" color="secondary" onClick={() => handleLogin()}>
        Secondary
      </Button>
      {
        showFormRegister && optionProvince.length &&
        <>
          <Select
            className="basic-single"
            classNamePrefix="select"
            isLoading={!optionProvince.length}
            options={optionProvince}
            onChange={(options) => setSelectedProvince(options)}
          />
        </>
      }
    </>
  )
}

export default Login;