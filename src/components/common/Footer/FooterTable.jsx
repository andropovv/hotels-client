import React from "react";
import styles from "./Footer.module.scss";

const FooterTable = () => {
  return (
    <div>
      <table>
        <thead className={styles.tableHeader}>
          <tr>
            <th>Компания</th>
            <th>Сообщество</th>
            <th>Условия использования</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          <tr>
            <th>О нас</th>
            <th>FAQ: вопросы и ответы</th>
            <th>Политика Конфиденциальности </th>
          </tr>
          <tr>
            <th>Вакансии</th>
            <th>Личный кабинет</th>
            <th>Пользовательское соглашение</th>
          </tr>
          <tr>
            <th>Стать партенером</th>
            <th>Служба поддержки</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FooterTable;
