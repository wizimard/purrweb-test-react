import React, { useCallback } from "react";
import { useForm, useFormState } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ButtonElement, InputElement } from "../../ui";
import { SpinnerSvg } from "../../img";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { userLogin } from "../../redux/action-creators/state.action-creator";

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8).max(20).matches(/[a-zA-Z0-9]/)
});

type FormDataType = yup.InferType<typeof schema>;

const Login: React.FC = () => {

  const dispatch = useAppDispatch();

  const { control, handleSubmit, setValue, getValues, setError } = useForm<FormDataType>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const { errors, isSubmitting } = useFormState({ control });

  const navigate = useNavigate();

  const onSubmit = useCallback(async(data: FormDataType) => {
    try {
      const status = await dispatch(userLogin(data.email, data.password));

      if (!status) {
        setError('email', { type: 'auth-error', message: '' });
        setError('password', { type: 'auth-error', message: 'Неверная почта или пароль' });
      }

    } catch (e) {
      console.log(e);
    }
  }, [dispatch]);

  const handleOnClickLink = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  return (
    <div className="auth">
      <form className="auth__form"  onSubmit={handleSubmit(onSubmit)}>
        <h2 className="auth__title medium fz-20">Авторизация</h2>

        <InputElement title="Электронная почта"
          label="email"
          setValue={setValue}
          placeholder="example@mail.ru"
          control={control} />

        <InputElement title="Пароль"
          label="password"
          setValue={setValue}
          placeholder="Введите пароль"
          type="password"
          control={control} />

        <ButtonElement styleType="primary"
          attr={{
            type: "submit",
            disabled: !!(errors.email || errors.password
              || !getValues('email') || !getValues('password'))
          }}>
          {isSubmitting ? (
            <SpinnerSvg />
          ) : (
            <>Продолжить</>
          )}
        </ButtonElement>
        <span className="regular fz-14 auth__change-mode">
          Еще нет аккаунта?
          <ButtonElement attr={{ type: "button", onClick: handleOnClickLink }}
            styleType="text-primary">
            Зарегистрироваться
          </ButtonElement>
        </span>
      </form>
    </div>
  );
};

export default Login;