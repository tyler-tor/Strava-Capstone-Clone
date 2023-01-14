import React, { useState } from "react";
import "./ImageUploadComponent.css";

const ImageUploadComponent = ({ setUrl }) => {
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [uploadedImg, setUploadImg] = useState(false);
  const [prevImgUrl, setPrevImgUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    setImageLoading(true);

    formData.append("image", image);
    const res = await fetch("/api/img/upload", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const img_url = await res.json();
      setImageLoading(false);
      setUrl(img_url.url);
      setUploadImg(true);
      setPrevImgUrl(img_url.url);
    } else {
      setImageLoading(false);
    }
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <>
      <form onSubmit={handleSubmit}
      className='upload-form-container'>
        <div className="upload-photo-container">
          <input type="file" accept="image/*"
          className='uli-input' onChange={updateImage} />
          <button type="submit" className="upload-img-btn">Upload</button>
        </div>
        {imageLoading && <p>Loading...</p>}
      </form>
      {uploadedImg && (
        <img src={prevImgUrl} alt="yours" className="prev_img" />
      )}
    </>
  );
};

export default ImageUploadComponent;
