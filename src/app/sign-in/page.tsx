'use client';

import { signIn } from "@/lib/firebaseAuth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await signIn(email, password);
            alert('Login com sucesso');
            router.push('/');
        } catch (error: any) {
            alert(error.message);
        }
    }

    return (
        <div className="h-full flex justify-center items-center mt-10 p-10">
            <div className="w-full max-w-md space-y-6">
                <h2 className="text-3xl font-bold text-gray-800">Login</h2>
                <form onSubmit={handleLogin} className="mt-5">
                    <div className="mb-5">
                        <label htmlFor="email" className="block text-1xl font-medium text-gray-700">Email</label>
                        <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-4 border rounded-md mt-1"></input>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block text-1xl font-medium text-gray-700">Senha</label>
                        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-4 border rounded-md mt-1"></input>
                    </div>
                    <button className="bg-black py-4 w-full rounded-xl mt-4 text-white cursor-pointer">Entrar</button>
                    <a className="text-black underline flex justify-center pt-3 text-1xl" href="/sign-up">Criar conta</a>
                </form>
            </div>
        </div>
    )
}