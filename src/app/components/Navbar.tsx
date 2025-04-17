import { ShoppingCart, User } from "lucide-react"
import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="bg-black shadow-md p-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white border-t-3">
                <Link href={"/"}>
                    Flex
                </Link>
            </h1>
            <ul className="flex gap-4 text-white items-center">
                <li><Link href={"/products"}>Produtos</Link></li>
                <li>
                    <Link href={"/cart"}>
                        <ShoppingCart size={30} />
                    </Link>
                </li>
                <li>
                    <Link href={"/profile"}>
                        <User size={30} />
                    </Link>
                </li>
            </ul>
        </nav>
    )
}