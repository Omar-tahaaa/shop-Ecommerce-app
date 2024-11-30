import Container from "react-bootstrap/Container";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Slider.scss'

import image1 from "../../assets/Image1.jpg";
import image2 from "../../assets/Image2.jpg";


export default function SimpleSlider() {
  let settings = {
    autoplay: true,
    autoplayspeed: 3000,
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Container>
      <Slider {...settings}>

        <div className="sliderDiv">
            <img src={image1} alt="image1"/>
        </div>
        <div className="sliderDiv">
          <img src={image2} alt="image2" />
        </div>

      </Slider>
    </Container>
  );
}
