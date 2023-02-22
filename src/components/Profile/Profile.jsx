import React, { useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoading, getMe, getUser } from "../../store/slices/auth";
import Loader from "../UI/Loader/Loader";
import EditProfile from "./EditProfile";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser());
  const isLoading = useSelector(getIsLoading());
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  const sex = user?.sex === "male" ? "Мужской" : "Женский";
  useEffect(() => {}, [isLoading]);

  useEffect(() => {
    dispatch(getMe());
  }, []);

  const handleEdit = () => {
    setIsEdit((prevState) => !prevState);
  };

  if (isEdit) return <EditProfile onClick={handleEdit} user={user} />;

  return (
    <div className={styles.container}>
      <h1>Мои данные</h1>
      {isLoading && !user ? (
        <Loader />
      ) : (
        <>
          <div className={styles.header}>
            <div className={styles.name}>{user?.name}</div>
            <div>
              <div className={styles.rightSide}>
                <button className={styles.editBtn} onClick={handleEdit}>
                  Редактировать
                </button>
                {user?.admin && (
                  <button
                    className={styles.editBtn}
                    onClick={() => navigate("/adminPanel")}
                  >
                    Админ. панель
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className={styles?.inf}>
            <div>
              Электронная почта: <p>{user?.email}</p>{" "}
            </div>
            <div>
              Пол: <p>{sex}</p>{" "}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
