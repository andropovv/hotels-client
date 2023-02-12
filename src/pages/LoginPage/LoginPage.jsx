import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import TextField from "../../components/UI/Fields/TextField";
import * as yup from "yup";
import { signIn } from "../../store/slices/auth";
import styles from "./LoginPage.module.css";
import BlueButton from "../../components/UI/Buttons/BlueButton";

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
    email: yup
      .string()
      .required("Поле электронной почты обязательно для заполнения")
      .email("Email введен некорректно"),
    password: yup
      .string()
      .required("Обязательно введите пароль")
      .min(8, "Пароль должен состоять минимум из 8 символов"),
  });

  const validate = () => {
    validateScheme
      .validate(loginData)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }));
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
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
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.header}>Login</h1>
            <TextField
              onChange={handleChange}
              value={loginData.email}
              label="Email"
              name="email"
              error={errors.email}
            />
            <TextField
              onChange={handleChange}
              value={loginData.password}
              label="Password"
              name="password"
              error={errors.password}
            />

            <BlueButton type="submit" disabled={!isValid}>
              Войти
            </BlueButton>
            <NavLink to="../register">Зарегистрироваться</NavLink>
          </form>
        </div>
      ) }
    </>
  );
};

export default LoginPage;
