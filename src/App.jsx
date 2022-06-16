import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import imgdropzone from "./bg.svg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import { Uploaded } from "./components/Uploaded";
import Uploading from "./components/Uploading";

function App() {
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("initial");
  const MAX_SIZE = 5242880

  const notify = (message) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  async function postImage({ image }) {
    const formData = new FormData();
    formData.append("image", image);

    const result = await axios.post("https://upload-image-front.vercel.app/images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return result.data;
  }

  async function uploadImage(acceptedFiles) {
    setStatus("loading");
    const result = await postImage({ image: acceptedFiles[0] });
    setImage(result.imagePath);
    setStatus("loaded");
  }

  const onDrop = useCallback(async (acceptedFiles, fileRejections) => {
    
    fileRejections.forEach((file) => {
      file.errors.forEach((err) => {        
        if (err.code === "file-invalid-type") {
          notify(`Error: ${err.message}`);
        } 

        if (err.code === "file-too-large") {
          notify(`Error: ${err.message}`);
        }
      });
    });

    if(fileRejections.length == 0) {
      uploadImage(acceptedFiles)
    }
   
    

  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    maxSize : {MAX_SIZE}
  });

  return (
    <>
      {status === "initial" && (
        <div className="App">
          <h1 className="title">Upload your image</h1>
          <p className="subtitle">File should be Jpeg, Png,...</p>
          <div className="area-dropzone" {...getRootProps()}>
            <img src={imgdropzone} className="img-dropzone" alt="logo" />
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="area-dropzone-p text-into-dd">
                Drop the files here ...
              </p>
            ) : (
              <p className="area-dropzone-p text-into-dd">
                Drag & Drop your image here
              </p>
            )}
          </div>
          <p className="area-dropzone-p or">or</p>
          <button type="button" onClick={open}>
            Open
          </button>
          <ToastContainer />
        </div>
      )}

      {status === "loading" && <Uploading />}

      {status === "loaded" && image && <Uploaded image={image} />}
    </>
  );
}

export default App;
