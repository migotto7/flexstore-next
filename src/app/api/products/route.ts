import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-03-31.basil",
});

export async function GET(){
    try{
        const products = await stripe.products.list();

        const formatedProducts = await Promise.all(
            products.data.map(async (product) => {
                const price = await stripe.prices.list({
                    product: product.id,
                });
                
                return {
                    id: product.id,
                    price: price.data[0].unit_amount,
                    name: product.name,
                    image: product.images[0],
                    decription: product.description,
                    currency: price.data[0].currency,
                    category: product.metadata.category,
                    size: product.metadata.size,
                };
            })
        )

        return Response.json(formatedProducts);

    } catch (error) {
        return Response.json({error: "Error fetching products"});
    }
}