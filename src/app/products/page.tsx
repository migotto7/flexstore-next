import { ProductType } from "@/types/ProductType";
import ProductCard from "../components/ProductCard";

async function getProducts(): Promise<ProductType[]> {
    const res = await fetch('http://localhost:3000/api/products');
  
    if (!res.ok) throw new Error('Erro ao buscar produtos');
  
    return res.json();
}

export default async function ProductsPage() {
    const products = await getProducts();
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {products.map((product) => {
                return (
                    <ProductCard key={product.id} product={product} />
                )
            })}
        </div>
    )
}