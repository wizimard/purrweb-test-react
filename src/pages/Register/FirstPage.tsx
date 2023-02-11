import React, { useCallback, useEffect, useRef } from "react";
import { useForm, useFormState } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ButtonElement, InputElement } from "../../ui";
import { useNavigate, useSearchParams } from "react-router-dom";

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8).max(20).matches(/[a-zA-Z0-9]/),
  repeatPassword: yup.string().required().oneOf([yup.ref('password'), null], 'Пароли не совпадают')
});

export type RegisterFormDataType = yup.InferType<typeof schema>;

type FirstPageType = {
  handleOnSubmit: (data: RegisterFormDataType) => void;
  isError: boolean;
}

const FirstPage: React.FC<FirstPageType> = ({ handleOnSubmit, isError }) => {

  const [searchParams] = useSearchParams();

  const ref = useRef<HTMLFormElement | null>(null);

  const { control, handleSubmit, setValue, getValues, setError } = useForm<RegisterFormDataType>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: ''
    }
  });

  const { errors } = useFormState({ control });

  const navigate = useNavigate();

  const onSubmit = async(data: RegisterFormDataType) => {
    handleOnSubmit(data);
  };

  const handleOnClickLink = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    if (isError) {
      setError('email', { type: 'auth-error', message: 'Электронный адрес занят' });
      setValue('password', '');
      setValue('repeatPassword', '');
    }
  }, [isError, setError]);

  useEffect(() => {
    const email = searchParams.get('email');
    const password = searchParams.get('password');

    if (!email || !password || !ref.current) return;

    setValue('email', email, { shouldValidate: true, shouldTouch: true });
    setValue('password', password, { shouldValidate: true, shouldTouch: true });
    setValue('repeatPassword', password, { shouldValidate: true, shouldTouch: true });

    handleSubmit(onSubmit)();

  }, [searchParams, ref.current]);

  return (
    <form ref={ref}
      className="auth__form"
      onSubmit={handleSubmit(onSubmit)}>

      <h2 className="auth__title medium fz-20">Регистрация</h2>

      <InputElement control={control}
        title="Электронная почта"
        label="email"
        setValue={setValue}
        placeholder="example@mail.ru" />

      <InputElement control={control}
        title="Пароль"
        label="password"
        setValue={setValue}
        placeholder="Введите пароль"
        type="password" />

      <InputElement control={control}
        title="Повтор пароля"
        label="repeatPassword"
        setValue={setValue}
        placeholder="Повторите пароль"
        type="password" />

      <ButtonElement styleType="primary"
        attr={{
          type: "submit",
          disabled: !!(errors.email || errors.password || errors.repeatPassword
            || !getValues('email') || !getValues('password') || !getValues("repeatPassword"))
        }}>
        Продолжить
      </ButtonElement>
      <span className="regular fz-14 auth__change-mode">
        Уже есть аккаунта?
        <ButtonElement attr={{ type: "button", onClick: handleOnClickLink }}
          styleType="text-primary">
          Войти
        </ButtonElement>
      </span>
    </form>
  );
};

export default FirstPage;