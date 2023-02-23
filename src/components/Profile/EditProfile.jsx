import React, { useEffect, useState } from "react";
import RadioField from "../UI/Fields/RadioField";
import TextField from "../UI/Fields/TextField";
import styles from "./Profile.module.scss";
import * as yup from "yup";
import BlueButton from "../UI/Buttons/BlueButton";
import { useDispatch } from "react-redux";
import { getMe, removeUser, updateUser } from "../../store/slices/auth";
import { useNavigate } from "react-router-dom";
import CheckboxField from "../UI/Fields/CheckboxField";

const EditProfile = ({ onClick, user }) => {
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    sex: user.sex,
    admin: user.admin,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateScheme = yup.object().shape({
    sex: yup.string().required("Выберите пол"),
    email: yup
      .string()
      .required("Поле электронной почты обязательно для заполнения")
      .email("Email введен некорректно"),
    name: yup.string().required("Введите имя"),
  });

  const validate = () => {
    validateScheme
      .validate(userData)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }));
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
  }, [userData]);

  const handleChange = (data) => {
    setUserData((prevState) => ({ ...prevState, ...data }));
  };

  const handleSubmit = async () => {
    try {
      validate();
      await dispatch(updateUser(userData));
      await dispatch(getMe());
      navigate("/myBookings");
      onClick();
    } catch (error) {
      setErrors(error);
    }
  };

  const handleCancel = () => {
    onClick();
  };

  const handleDelete = async () => {
    await dispatch(removeUser());
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <h1>Мои данные</h1>{" "}
      <>
        <div className={styles.header}>
          <TextField
            onChange={handleChange}
            value={userData.name}
            name="name"
            error={errors.name}
            placeholder="Введите имя"
          />
        </div>
        <div className={styles?.inf}>
          <TextField
            onChange={handleChange}
            value={userData.email}
            name="email"
            error={errors.email}
            placeholder="Введите электронную почту"
          />
          <RadioField
            options={[
              { name: "Мужской", value: "male" },
              { name: "Женский", value: "female" },
            ]}
            label="Укажите свой пол"
            value={userData.sex}
            name="sex"
            error={errors.sex}
            onChange={handleChange}
          />
          <CheckboxField
            label="Получить права администратора"
            checked={userData.admin}
            value={userData.admin}
            onChange={handleChange}
            name="admin"
          />

          <div className={styles.buttons}>
            <div className={styles.buttonsLeft}>
              <BlueButton
                onClick={handleSubmit}
                type="submit"
                disabled={!isValid}
              >
                Сохранить
              </BlueButton>
              <button className={styles.editBtn} onClick={handleCancel}>
                {" "}
                Назад
              </button>
            </div>
            <button className={styles.deleteBtn} onClick={handleDelete}>
              Удалить аккаунт
            </button>
          </div>
        </div>
      </>
    </div>
  );
};

export default EditProfile;
