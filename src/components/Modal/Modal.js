import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";

const modalRoot = document.querySelector('#modal-root');

export default function Modal ({onClose, image, tags}) {
  useEffect(() => {
    const handleKeyDown = (evt) => {
      if (evt.code === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  },[onClose])


  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
      <div className={styles.overlay} onClick={handleOverlayClick}>
        <div>
          <img src={image} alt={tags} className={styles.modal} />
        </div>
      </div>,
      modalRoot,
  );
}

Modal.propTypes = {
  image: PropTypes.string,
  tags: PropTypes.string,
};