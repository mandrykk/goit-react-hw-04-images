import './App.css';
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import fetchApi from "./components/api";
import Modal from "./components/Modal/Modal";
import Searchbar from "./components/Searchbar/Searchbar";
import Loader from "./components/Loader/Loader";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
}

export default function App() {
  const [searchInfo, setSearchInfo] = useState("");
  const [largeImage, setLargeImage] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!searchInfo) {
      return;
    }
    setStatus(Status.PENDING);

    fetchApi(searchInfo, page).then(images => {
      if (images.totalHits !== 0) {
        setImages((prevState) => [...prevState, ...images.hits]);
        setStatus(Status.RESOLVED);
        return;
      }
      return setStatus(Status.REJECTED);
    });
  },[searchInfo,page]);
  

  const handleFormSubmit = name => {
    setSearchInfo(name);
    setPage(1);
    setImages([]);
  };
  
  const onLoadMore = () => {
    setPage(() => page + 1);

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const onCloseModal = () => {
    setLargeImage("");
  };
  
  return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />
        {status === 'idle' && ''}
        {status === 'pending' && <Loader />}
        {status === 'pending' && page > 1 && (
          <>
            <ImageGallery images={images} onModalShow={setLargeImage} />
            <Loader />
          </>
        )}
        {status === 'resolved' && (
          <>
            <ImageGallery images={images} onModalShow={setLargeImage} />

            <Button onLoadMore={onLoadMore} />
          </>
        )}

        <ToastContainer autoClose={4000} />
        
        {status === 'rejected' &&  toast.error("Please, try again")}
        {largeImage && <Modal image={largeImage} onClose={onCloseModal}></Modal>}
      </>
  );
}
