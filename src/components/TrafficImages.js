import React from "react";
import style from "./TrafficImages.module.css";

const TrafficImages = ({ images, location }) => (
  <>
    {images ? (
      images.map((image) => (
        <img
          className={style.trafficImage}
          key={image.id}
          alt={location}
          src={image.imageUrl}
        />
      ))
    ) : (
      <h2>There is no traffic images at the selected timing.</h2>
    )}
  </>
);

export default TrafficImages;
