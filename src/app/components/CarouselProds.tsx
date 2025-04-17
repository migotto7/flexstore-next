'use client';

import { ProductType } from "@/types/ProductType"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCard from "./ProductCard";

type CarouselProdsProps = {
    products: ProductType[]
}

export default function CarouselProds({ products }: CarouselProdsProps) {
    const categories = Array.from(new Set(products.map((p) => p.category)));

    return (
        <div className="mx-10 my-4">
            <div className="mb-10">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-black mb-5">Mais vendidos</h2>
                    <p className="border-b-1 font-medium p-1 cursor-pointer hover:bg-black hover:text-white hover:rounded">Ver mais</p>
                </div>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation
                    autoplay={{ delay: 3000 }}
                    className="w-full rounded-lg "
                    spaceBetween={30}
                    slidesPerView={4}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                    }}
                >
                    {products.map((product) => (
                        <SwiperSlide key={product.id} className="flex justify-center items-center">
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {categories.map((category) => {
                const categoryProducts = products.filter(
                    (p) => p.category === category
                );
                return(
                    <div key={category} className="my-10">
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl font-bold text-black mb-5">{category}</h2>
                            <p className="border-b-1 font-medium p-1 cursor-pointer hover:bg-black hover:text-white hover:rounded">Ver mais</p>
                        </div>
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            navigation
                            autoplay={{ delay: 3000 }}
                            className="w-full rounded-lg "
                            spaceBetween={30}
                            slidesPerView={4}
                            breakpoints={{
                                320: { slidesPerView: 1 },
                                640: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                                1280: { slidesPerView: 4 },
                            }}
                        >
                            {categoryProducts.map((product) => (
                                <SwiperSlide key={product.id} className="flex justify-center items-center">
                                    <ProductCard product={product} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )
            })}
        </div>
    )
}