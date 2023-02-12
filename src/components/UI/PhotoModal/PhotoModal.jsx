import React from "react";
import CloseButton from "../Buttons/CloseButton";
import "./PhotoModal.scss";

const PhotoModal = ({ photoUrl, onClose }) => {
  return (
    <div className="photo-modal">
      <div className="photo-modal__overlay" onClick={onClose} />
      <div className="photo-modal__content">
        <img src={photoUrl} alt="Photo" />
        <CloseButton className="photo-modal__close-button" onClick={onClose}>
          Закрыть
        </CloseButton>
      </div>
    </div>
  );
};

export default PhotoModal;
