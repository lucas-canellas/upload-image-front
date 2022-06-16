import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import imgdropzone from "./bg.svg";
import axios from "axios";

import "./App.css";
import { Uploaded } from "./components/Uploaded";
import Uploading from "./components/Uploading";

function App() {
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("initial");

  async function postImage({ image }) {    

    const formData = new FormData();
    formData.append("image", image);

    const result = await axios.post("https://upload-image-dd.herokuapp.com/images", formData, {
      headers: { "Content-Type": "multipart/form-data" },      
    });    
    
    return result.data;
  }

  const onDrop = useCallback(async (acceptedFiles) => {
    setStatus("loading");
    const result = await postImage({ image: acceptedFiles[0] });
    setImage(result.imagePath); 
    setStatus("loaded");
         
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
  });

  console.log(status);

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
        </div>
      )}

    {status === "loading"  && (<Uploading />)}

    {status === "loaded" && image && (<Uploaded image={image}/>)}
    </>

    
  );
}

export default App;
