import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import RadioField from "../../components/UI/Fields/RadioField";
import TextField from "../../components/UI/Fields/TextField";
import { signUp } from "../../store/slices/auth";
import styles from "./RegisterPage.module.scss";
import * as yup from "yup";
import BlueButton from "../../components/UI/Buttons/BlueButton";
import Navbar from "../../components/common/Navbar";

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
    sex: yup.string().required("Выберите пол"),
    password: yup
      .string()
      .required("Обязательно введите пароль")
      .min(8, "Пароль должен состоять минимум из 8 символов"),
    email: yup
      .string()
      .required("Поле электронной почты обязательно для заполнения")
      .email("Email введен некорректно"),
    name: yup.string().required("Введите имя"),
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
      <Navbar />
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.header}>Регистрация</h1>
            <TextField
              onChange={handleChange}
              value={registerData.name}
              name="name"
              error={errors.name}
              placeholder="Введите имя"
            />
            <TextField
              onChange={handleChange}
              value={registerData.email}
              name="email"
              error={errors.email}
              placeholder="Введите электронную почту"
            />
            <TextField
              onChange={handleChange}
              value={registerData.password}
              name="password"
              error={errors.password}
              placeholder="Введите пароль"
            />
            <div>
              <RadioField
                options={[
                  { name: "Мужской", value: "male" },
                  { name: "Женский", value: "female" },
                ]}
                label="Укажите свой пол"
                value={registerData.sex}
                name="sex"
                error={errors.sex}
                onChange={handleChange}
              />
            </div>

            <BlueButton type="submit" disabled={!isValid}>
              Зарегистрироваться
            </BlueButton>
            <div>
              <NavLink to="../login">Уже есть аккаунт? Войти</NavLink>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default RegisterPage;
