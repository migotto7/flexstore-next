import { formatPrice } from "@/lib/utils"
import { ProductType } from "@/types/ProductType"
import Link from "next/link"
import ProductImage from "./ProductImage"

type ProductProps = {
    product: ProductType
}

export default function ProductCard({ product }: ProductProps) {
    return (
        <Link href={`/product/${product.id}`} className="group">
            <div className="flex flex-col shadow-lg rounded-lg h-96 bg-gray-800 p-5 text-gray-300">
                <div className="relative max-h-72 flex-1">
                    <ProductImage product={product} fill />
                </div>
                <div className="flex justify-between font-bold my-3">
                    <p className="w-50 truncate text-white">
                        {product.name}
                    </p>
                    <p className="text-md text-teal-400">
                        {formatPrice(product.price)}
                    </p>
                </div>
            </div>
        </Link>
    )
}