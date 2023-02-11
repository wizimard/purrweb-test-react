import React, { useCallback, useState } from "react";
import { Control, Controller, ControllerRenderProps, UseFormSetValue } from "react-hook-form";
import { AssertsShape } from "yup/lib/object";
import { AcceptSvg, ClearSvg, EyeCloseSvg, EyeOpenSvg } from "../../img";

import './InputElement.css';

type InputElementType = {
  title: string;
  label: string;
  setValue: UseFormSetValue<any>;
  placeholder: string;
  type?: string;
  control: Control<AssertsShape<any>>;
  handleOnChange?: (data: any) => any;
}

const InputElement: React.FC<InputElementType> = ({ control, title, label, setValue, placeholder, type, handleOnChange }) => {

  const [inputType, setInputType] = useState(type ?? "text");
  
  const handleClearInputField = useCallback((e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault();

    setValue(label, '', { shouldValidate: true });
  }, [setValue]);

  const handleChangePasswordMode = useCallback(() => {
    if (type !== "password") return;

    setInputType(prev => prev === "text" ? "password" : "text");

  },[setInputType, type]);

  const onChangeHandler = useCallback((field: ControllerRenderProps<AssertsShape<any>, string>) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const data = handleOnChange ? handleOnChange(e.currentTarget.value) : e.currentTarget.value;
   
      field.onChange(data);
    };
  }, [handleOnChange]);
  
  return (
    <Controller control={control}
      name={label}
      render={({ field, fieldState, formState: { isSubmitted } }) => {
        return (
          <div className='input'>
            <label className="input__label regular fz-12">{ title }</label>
            <div className="input__input-container">
              <input className="regular fz-14"
                {...field}
                aria-invalid={!!fieldState.error}
                placeholder={placeholder}
                type={inputType}
                data-accept={isSubmitted && !!fieldState.isTouched && !fieldState.error && !!field.value}
                data-type={type}
                onChange={onChangeHandler(field)} />
              {!(!!fieldState.isTouched && !fieldState.error) && field.value && (type !== "password" || fieldState.error) && (
                <ClearSvg className="input__svg input__clear"
                  onClick={handleClearInputField} />
              )}
              {isSubmitted && !!fieldState.isTouched && !fieldState.error && !!field.value && (
                <AcceptSvg className="input__svg input__accept" />
              )}
              {type === "password" && (
                <>
                  {inputType === "password" ? (
                    <EyeCloseSvg className="input__svg input__eye"
                      onClick={handleChangePasswordMode} />
                  ) : (
                    <EyeOpenSvg className="input__svg input__eye"
                      onClick={handleChangePasswordMode} />
                  )}
                </>
              )}
            </div>
            <p className="input__error regular fz-14">{ fieldState.error?.message }</p>
          </div>
        );
      }} />
  );
};

export default InputElement;