import React, { useCallback, useEffect, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ButtonElement, InputElement } from "../../ui";
import { ArrowLeftSvg, SpinnerSvg } from "../../img";

const schema = yup.object({
  name: yup.string().required().min(1).max(254),
  surname: yup.string().required().min(1).max(254),
  phone: yup.string().required().min(17, 'Invalid phone number').max(18, 'Invalid phone number')
});

export type AboutFormDataType = yup.InferType<typeof schema>;

type SecondPageType = {
  handleOnSubmit: (data: AboutFormDataType) => void;
  handleBack: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isError: boolean;
}

const SecondPage: React.FC<SecondPageType> = ({ handleOnSubmit, handleBack, isError }) => {

  const { control, handleSubmit, setValue, getValues, resetField } = useForm<AboutFormDataType>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      surname: '',
      phone: ''
    }
  });

  const { errors, isSubmitting } = useFormState({ control });

  const [prevPhone, setPrevPhone] = useState('');

  const onSubmit = useCallback(async(data: AboutFormDataType) => {
    await handleOnSubmit(data);
  }, [handleOnSubmit]);

  const handleChangePhone = useCallback((data: string): string => {

    if (!data) return '';

    let numberStr = data.split('').filter((item, index) => {
      if (!isNaN(parseInt(item)) || (index === 0 && item === "+")) return item;
    }).join('');

    if (prevPhone.length > data.length && isNaN(parseInt(prevPhone.at(-1) ?? ''))) {
      console.log(numberStr, numberStr.slice(0, -1));
      numberStr = numberStr.slice(0, -1);
    }

    let pos = numberStr[0] === '+' ? 2 : 1;

    let result = numberStr.slice(0, pos) + '';

    if (pos >= numberStr.length) {
      setPrevPhone(result);
      return result;
    }

    result += ` (${numberStr.slice(pos, pos + 3)})`;

    pos += 3;

    if (pos >= numberStr.length) {
      setPrevPhone(result);
      return result;
    }

    result += `-${numberStr.slice(pos, pos + 3)}`;

    pos += 3;

    if (pos >= numberStr.length) {
      setPrevPhone(result);
      return result;
    }

    result += `-${numberStr.slice(pos, pos + 2)}`;

    pos += 2;

    if (pos >= numberStr.length) {
      setPrevPhone(result);
      return result;
    }

    result += `-${numberStr.slice(pos, pos + 2)}`;

    pos += 2;

    {
      setPrevPhone(result);
      return result;
    }

  }, [prevPhone, setPrevPhone]);

  useEffect(() => {
    if (isError) {
      resetField('name');
      resetField('surname');
      resetField('phone');
    }
  }, [isError]);
  
  return (
    <>
      <ButtonElement styleType="text-secondary"
        attr={{
          className: "auth__back",
          onClick: handleBack
        }}>
        <ArrowLeftSvg />
        Назад
      </ButtonElement>
      <form className="auth__form"  onSubmit={handleSubmit(onSubmit)}>
        <h2 className="auth__title medium fz-20">Заполните данные о себе</h2>

        <InputElement control={control}
          title="Имя"
          label="name"
          setValue={setValue}
          placeholder="Введите имя" />

        <InputElement control={control}
          title="Фамилия"
          label="surname"
          setValue={setValue}
          placeholder="Введите фамилию" />

        <InputElement control={control}
          title="Телефон"
          label="phone"
          setValue={setValue}
          placeholder="+7 (333)-333-33-33"
          handleOnChange={handleChangePhone} />

        <ButtonElement styleType="primary"
          attr={{
            type: "submit",
            disabled: !!(errors.name || errors.surname || errors.phone
              || !getValues('name') || !getValues('surname') || !getValues("phone"))
          }}>
          {isSubmitting ? (
            <SpinnerSvg />
          ) : (
            <>Продолжить</>
          )}
        </ButtonElement>
      </form>
    </>
  );
};

export default SecondPage;