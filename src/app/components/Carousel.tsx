"use client";

import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination, Autoplay} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
    "/banner1.jpg",
    "/banner2.jpg",
    "/banner3.jpg",
];

export default function Carousel() {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={
                {clickable: false}
            }
            autoplay={{ delay: 3000}}
            className="w-full h-[550px] bg-slate-500"
            spacebetween={50}
            slidesPerView={1}
        >
            {images.map((image, index) => (
                <SwiperSlide key={index}>
                    <img
                        src={image}
                        alt={`Banner ${index + 1}`}
                        className="w-full h-full object-cover"
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}