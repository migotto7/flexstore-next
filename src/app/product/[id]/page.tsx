import ProductImage from "@/app/components/ProductImage";
import { formatPrice } from "@/lib/utils";
import Stripe from "stripe";

type ProductPageProps = {
    params: {
        id: string;
    }
}

async function getProduct(id: string) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2025-03-31.basil",
    });

    const product = await stripe.products.retrieve(id);
    const price = await stripe.prices.list({
        product: product.id,
    });

    return {
        id: product.id,
        price: price.data[0].unit_amount,
        name: product.name,
        image: product.images[0],
        description: product.description,
        currency: price.data[0].currency,
        category: product.metadata.category,
        size: product.metadata.size,
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    const product = await getProduct(id);
    
    return (
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto gap-8 p-10">
            <ProductImage product={product} />
            <div className="flex flex-col ">
                <div className="pb-4">
                    <h1 className="text-2xl font-bold text-black">{product.name}</h1>
                    <h2 className="text-xl text-teal-600 font-bold">
                        {formatPrice(product.price)}
                    </h2>
                </div>
                <div className="pb-4">
                    <p className="text-lg text-gray-800">{product.description}</p>
                </div>
                <div className="pb-4">
                    <p className="text-lg text-gray-800">Tamanho: {product.size}</p>
                </div>
                <button className="bg-slate-950 text-white rounded-lg p-4 cursor-pointer">Adicionar ao carrinho</button>
            </div>
        </div>
    )
}