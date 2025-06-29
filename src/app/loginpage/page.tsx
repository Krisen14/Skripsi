'use client';

import React from 'react';
import './page.css';
import AuthTabs from '@/components/AuthTabs/AuthTabs';
import Navbar from '@/components/Navbar/navbar';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';

import IMAGE1 from './image1.jpg';
import IMAGE2 from './image2.jpg'; 
import IMAGE3 from './image3.jpg'; 


const LoginPage = () => {
  return (
    <div>
      <Navbar />
      <div className="login-page-container">
        <div className="form-container">
          <AuthTabs />
        </div>
        <div className="image-container">
          <Carousel
            autoPlay
            interval={5000}
            infiniteLoop
            showThumbs={false}
            showArrows={false}
            showStatus={false}
            showIndicators={false}
            swipeable={false}
            stopOnHover={false}
          >
            <div>
              <Image src={IMAGE1} alt="Gambar 1" />
            </div>
            <div>
              <Image src={IMAGE2} alt="Gambar 2" />
            </div>
            <div>
              <Image src={IMAGE3} alt="Gambar 3" />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
