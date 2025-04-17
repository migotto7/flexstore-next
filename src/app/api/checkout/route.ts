import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-03-31.basil",
});

export async function POST(req: NextRequest) {
    try{
        const body = await req.json();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['pix', 'card'],
            mode: 'payment',
            success_url: `${req.headers}/success`,
            cancel_url: `${req.headers}/cart`,
            line_items: body.map((item: any) => ({
                price: item.priceId,
                quantity: item.quantity || 1,
            })),
        });

        return NextResponse.json({url: session.url});

    } catch(error) {
        return NextResponse.json({error: "Error creating checkout session", status: 500});
    };
}