import Carousel from "./components/Carousel";
import FooterCarousel from "./components/FooterCarousel";
import { ProductType } from "@/types/ProductType";
import CarouselProds from "./components/CarouselProds";

async function getProducts(): Promise<ProductType[]> {
  const res = await fetch('http://localhost:3000/api/products');

  if (!res.ok) throw new Error('Erro ao buscar produtos');

  return res.json();
}

export default async function Home() {
  const products = await getProducts();
  console.log(products);

  return (
    <div>
      <Carousel />
      <FooterCarousel />
      <CarouselProds products={products} />
    </div>
  );
}
