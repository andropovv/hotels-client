import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import RadioField from "../../components/UI/Fields/RadioField";
import TextField from "../../components/UI/Fields/TextField";
import { signUp } from "../../store/slices/auth";
import styles from "./RegisterPage.module.css";
import * as yup from "yup";
import BlueButton from "../../components/UI/Buttons/BlueButton";

const RegisterPage = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    sex: "",
  });
  const isLoading = useSelector((state) => state.auth.isLoading);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateScheme = yup.object().shape({
    name: yup.string().required("Введите имя"),
    email: yup
      .string()
      .required("Поле электронной почты обязательно для заполнения")
      .email("Email введен некорректно"),
    password: yup
      .string()
      .required("Обязательно введите пароль")
      .min(8, "Пароль должен состоять минимум из 8 символов"),
    sex: yup.string().required("Выберите пол"),
  });

  const validate = () => {
    validateScheme
      .validate(registerData)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }));
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
  }, [registerData]);

  const handleChange = (data) => {
    setRegisterData({ ...registerData, ...data });
  };
  console.log(errors);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      validate();
      if (isValid) {
        await dispatch(signUp(registerData));
        navigate("/");
      }
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.header}>Login</h1>
            <TextField
              onChange={handleChange}
              value={registerData.name}
              label="Name"
              name="name"
              error={errors.name}
            />
            <TextField
              onChange={handleChange}
              value={registerData.email}
              label="Email"
              name="email"
              error={errors.email}
            />
            <TextField
              onChange={handleChange}
              value={registerData.password}
              label="Password"
              name="password"
              error={errors.password}
            />
            <RadioField
              options={[
                { name: "Мужской", value: "male" },
                { name: "Женский", value: "female" },
              ]}
              label="Пол"
              value={registerData.sex}
              name="sex"
              error={errors.sex}
              onChange={handleChange}
            />

            <BlueButton type="submit" disabled={!isValid}>
              Зарегистрироваться
            </BlueButton>
            <NavLink to="../login">Уже есть аккаунт? Войти</NavLink>
          </form>
        </div>
      )}
    </>
  );
};

export default RegisterPage;
