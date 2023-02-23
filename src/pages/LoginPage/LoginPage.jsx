import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import TextField from "../../components/UI/Fields/TextField";
import * as yup from "yup";
import { signIn } from "../../store/slices/auth";
import styles from "./LoginPage.module.scss";
import BlueButton from "../../components/UI/Buttons/BlueButton";
import Navbar from "../../components/common/Navbar";

import googleIcon from "../../assets/svg/forLogin/google.svg";
import odnoklassnikiIcon from "../../assets/svg/forLogin/odnoklassniki.svg";
import telegramIcon from "../../assets/svg/forLogin/telegram.svg";
import vkIcon from "../../assets/svg/forLogin/vk.svg";
import yandexIcon from "../../assets/svg/forLogin/yandex.svg";
import Loader from "../../components/UI/Loader/Loader";
import useDebounce from "../../hooks/useDebounce";

const iconsSocial = [
  googleIcon,
  odnoklassnikiIcon,
  telegramIcon,
  vkIcon,
  yandexIcon,
];

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateScheme = yup.object().shape({
    password: yup
      .string()
      .required("Обязательно введите пароль")
      .min(8, "Пароль должен состоять минимум из 8 символов"),
    email: yup
      .string()
      .required("Поле электронной почты обязательно для заполнения")
      .email("Email введен некорректно"),
  });

  const validate = () => {
    validateScheme
      .validate(loginData)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }));
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const debouncedValidate = useDebounce(validate, 500);

  useEffect(() => {
    debouncedValidate();
  }, [loginData]);

  const handleChange = (data) => {
    setLoginData({ ...loginData, ...data });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      validate();
      if (isValid) {
        await dispatch(signIn(loginData));
        navigate("/");
      }
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <>
      <Navbar />
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.header}>
              <h1>Вход</h1>
            </div>

            <TextField
              onChange={handleChange}
              value={loginData.email}
              name="email"
              placeholder="Введите элекронную почту"
              error={errors.email}
            />

            <TextField
              onChange={handleChange}
              value={loginData.password}
              // label="Password"
              name="password"
              error={errors.password}
              placeholder="Введите пароль"
            />
            <div className={styles.entrance}>
              <BlueButton type="submit" disabled={!isValid}>
                Войти
              </BlueButton>
              <NavLink>Забыли пароль?</NavLink>
            </div>
            <div className={styles.other}>
              <div>
                <p>Или войдите с помощью</p>
                <div className={styles.icons}>
                  {iconsSocial.map((icon, i) => (
                    <img key={i} src={icon} alt="" />
                  ))}
                </div>
              </div>
              <NavLink to="../register">Регистрация</NavLink>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default LoginPage;
