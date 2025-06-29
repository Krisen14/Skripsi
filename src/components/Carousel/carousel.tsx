'use client';

import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './carousel.css';

import IMAGE1 from './Carousel1 (1).jpeg';
import IMAGE2 from './Carousel1 (1).png';
import IMAGE3 from './Carousel1 (2).png';



export default function CarouselSection() {
  const slides = [
    { id: 1, content: <img src={IMAGE2.src} alt="Slide 1" />, color: '#FEFEFE' },
    { id: 2, content: <img src={IMAGE2.src} alt="Slide 1" />, color: '#FEFEFE' },
    { id: 3, content: <img src={IMAGE2.src} alt="Slide 1" />, color: '#FEFEFE' },
  ];
  return (
    <div className="carousel-wrapper">
      <Carousel
        showArrows
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={5000}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="custom-slide"
            style={{ backgroundColor: slide.color }}
          >
            <h2>{slide.content}</h2>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
