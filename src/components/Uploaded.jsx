import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

export const Uploaded = ({ image }) => {
  const copyText = (e) => {
    navigator.clipboard.writeText(e.target.value);
    notify();
  };

  const notify = () =>
    toast.success("successfully copied text", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <>
      <div className="App">
        <BsFillCheckCircleFill fill="#219653" size={"35px"} />
        <h1 className="title">Uploaded Successfully!</h1>

        <div className="box-image">
          <img src={`https://upload-image-dd.herokuapp.com${image}`} />
        </div>
        <div className="input-wrapper">
          <p>{`https://upload-image-dd.herokuapp.com/${image}`.substr(0, 50)}...</p>
          <button onClick={copyText} value={`https://upload-image-dd.herokuapp.com${image}`}>
            Copy link{" "}
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
