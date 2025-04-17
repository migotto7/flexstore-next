import { SiInstagram, SiTiktok } from "react-icons/si";

export function Footer() {
    return (
        <footer className="bg-black p-10 text-center mt-8 flex justify-between items-center">
            <p className="text-white w-3xl truncate text-left">&copy; 2025 Elthon Migotto. Todos direitos reservados.</p>
            <div className="flex gap-4 items-center">
                <SiInstagram className="text-white text-2xl inline-block mx-2" />
                <SiTiktok className="text-white text-2xl inline-block mx-2" />
            </div>
        </footer>
    );
}