import { Banknote, Box, Truck } from "lucide-react"

export default function FooterCarousel() {
    return (
        <div className="container mx-auto flex justify-around py-10 text-black">
            <div className="flex items-center">
                <Banknote size={40} />
                <div className="pl-10">
                    <p className="font-bold text-2xl">Parcelamento</p>
                    <p>No cartão em até 6x sem juros</p>
                </div>
            </div>
            <div className="flex items-center border-l-1 border-r-1 w-1/3 justify-center border-black">
                <Box size={40} />
                <div className="pl-10">
                    <p className="font-bold text-2xl">Frete Grátis</p>
                    <p>A partir de R$ 499,90</p>
                </div>
            </div>
            <div className="flex items-center">
                <Truck size={40} />
                <div className="pl-10">
                    <p className="font-bold text-2xl">Garantia de troca</p>
                    <p>Até 7 dias para entregar</p>
                </div>
            </div>
        </div>
    )
}