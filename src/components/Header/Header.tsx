import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import LogoSvg from '../../assets/img/logo.svg';

import { OutSvg } from "../../img";
import useWindowSize from "../../hooks/window";

import { ButtonElement } from "../../ui";

import "./Header.css";
import { stateReducer } from "../../redux/slices/stateSlice";

const Header: React.FC = () => {

  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.state.user);

  const windowSize = useWindowSize();

  const handleLogOut = useCallback(() => {
    dispatch(stateReducer.showModal());
  }, [dispatch]);

  return (
    <header className="header">
      <div className="header__logo">
        <img src={LogoSvg} alt="logo" />
        <>
          {(!user || (windowSize.width > 600)) && (
            <span className="medium fz-22">Purrweb</span>
          )}
        </>
      </div>
      {user && (
        <div className="header__user">
          <span className="medium fz-16">{`${user.name} ${user.surname}`}</span>
          <ButtonElement styleType="text-primary"
            attr={{ onClick: handleLogOut }}>
            Выйти
            <OutSvg />
          </ButtonElement>
        </div>
      )}
    </header>
  );
};

export default Header;