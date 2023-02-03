import React from 'react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import "swiper/css/lazy";
import "swiper/css/autoplay";
import { Pagination, Navigation, Autoplay } from "swiper";
import { map } from 'lodash';
import { Swiper, SwiperSlide } from "swiper/react";
import { baseImgUrl } from '@/constants/*';

const Banner = () => {
    const bannerImages = [
        {id: 1, imgSrc: `${baseImgUrl}gi1`},
        {id: 2, imgSrc: `${baseImgUrl}6ff`},
        {id: 3, imgSrc: `${baseImgUrl}7ma`}
    ]
    
  return (
    <div className="relative">
        <div className="absolute z-10 bottom-0 bg-gradient-to-t from-gray-300 to-transparent w-full h-32" style={{direction: 'initial'}} />
            <Swiper
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className={`mySwiper w-75 h-50`}
                dir={'ltr'}
            >
            {map(bannerImages, (image) => (
                    <SwiperSlide key={image.id} className={`w-100 m-auto`}>
                        <img 
                            loading='lazy' 
                            src={image.imgSrc}
                            alt='banner'
                            className={`w-100 m-auto`}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
    </div>
  )
}

export default Banner;
