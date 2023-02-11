import React, { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ClearSvg } from '../../img';
import { ButtonElement } from '../../ui';
import { userLogout } from '../../redux/action-creators/state.action-creator';

import { stateReducer } from '../../redux/slices/stateSlice';

import './Modal.css';

const Modal: React.FC = () => {

  const dispatch = useAppDispatch();

  const isShow = useAppSelector(state => state.state.isShowModal);

  const [startTouch, setStartTouch] = useState(0);

  const handleLogOut = useCallback(() => {
    dispatch(userLogout());
  }, [dispatch]);

  const handleCancel = useCallback(() => {
    dispatch(stateReducer.hideModal());
  }, [dispatch]);

  const handleOnClickContainer = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    handleCancel();
  }, [handleCancel]);

  const handleOnClickModal = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    setStartTouch(e.touches[0].clientY);
  }, [setStartTouch]);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {

    const currentTouchPos = e.touches[0].clientY;

    if (currentTouchPos - startTouch > 50) {

      const parent = e.currentTarget.parentElement;

      if (parent)
        parent.style.animationName = "hideModal";


      setTimeout(() => {

        if (parent) parent.style.animationName = "";

        dispatch(stateReducer.hideModal());

      }, 200);

      setStartTouch(0);
    }

  }, [startTouch, setStartTouch]);

  return (
    <>
      {isShow && (
        <div className="modal-container"
          onClick={handleOnClickContainer}>
          <div className="modal"
            onClick={handleOnClickModal}>
            <div className="modal__mobile-header"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}>
              <div></div>
            </div>
            <div className="modal__top">
              <p className="medium fz-22">Вы уверены что хотите выйти из аккаунта?</p>
              <ButtonElement styleType="text-secondary"
                attr={{ onClick: handleCancel }}>
                <ClearSvg />
              </ButtonElement>
            </div>
            <div className="modal__btns">
              <ButtonElement styleType="secondary"
                attr={{ onClick: handleCancel }}>
                Отмена
              </ButtonElement>
              <ButtonElement styleType="primary"
                attr={{ onClick: handleLogOut }}>
                Выйти
              </ButtonElement>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;