import React from "react"
import {Carousel} from "react-responsive-carousel"
import { imageList } from "./data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "./CarouselEffect.module.css"

const CarouselEffect = () => {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
      >
        {imageList.map((img, i) => {
          return <img src={img} alt="" key={i} />;
        })}
      </Carousel>
      <div className={classes.hero__img}></div>
    </div>
  );
};

export default CarouselEffect;
