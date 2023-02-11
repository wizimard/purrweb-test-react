import React, { useCallback, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { userRegister } from "../../redux/action-creators/state.action-creator";

import FirstPage, { RegisterFormDataType } from "./FirstPage";
import SecondPage, { AboutFormDataType } from "./SecondPage";

type RegisterDataType = {
  email: string;
  password: string;
}


const Register: React.FC = () => {

  const dispatch = useAppDispatch();

  const [authData, setAuthData] = useState<RegisterDataType>({
    email: '',
    password: ''
  });
  const [page, setPage] = useState<1 | 2>(1);
  const [isAuthError, setIsAuthError] = useState(false);

  const handleOnSubmitFirstPage = useCallback((data: RegisterFormDataType) => {

    setAuthData(prev => ({...prev, ...data}));
    setPage(2);

  }, [setPage, setAuthData]);

  const handleOnSubmitSecondPage = useCallback(async(data: AboutFormDataType) => {

    setIsAuthError(false);

    const phone = data.phone.split('').filter((item, index) => {
      if (!isNaN(parseInt(item)) || (index === 0 && item === "+")) return item;
    }).join('');

    const status = await dispatch(userRegister(authData.email, data.name, data.surname, phone, authData.password));

    if (!status) {
      setPage(1);
      setIsAuthError(true);
    }

    setAuthData({ email: '', password: '' });

  }, [setAuthData, authData, setIsAuthError, setPage]);

  const handleBack = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    setPage(1);
    setAuthData(prev => ({
      ...prev,
      name: '',
      surname: '',
      phone: ''
    }));

    e.currentTarget.blur();

  }, [setPage]);

  return (
    <div className="auth-register">
      <div className="auth"
        style={{
          marginLeft: `${page === 2 ? '-100%' : '0'}`,
        }}>
        <FirstPage handleOnSubmit={handleOnSubmitFirstPage}
          isError={isAuthError} />
      </div>
      <div className="auth"
        style={{
          display: `${page === 1 ? 'none' : 'flex'}`
        }}>
        <SecondPage handleOnSubmit={handleOnSubmitSecondPage}
          handleBack={handleBack}
          isError={isAuthError} />
      </div>
    </div>
  );
};

export default Register;