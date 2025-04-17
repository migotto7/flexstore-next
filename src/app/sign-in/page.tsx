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
        } catch(error:any) {
            alert(error.message);
        }
    }

    return(
        <div className="container mx-auto w-96 border-black rounded-2xl border-2 mt-10 p-10">
            <p className="text-2xl text-center">Login</p>
            <form onSubmit={handleLogin} className="mt-5">
                <div className="mb-5">
                    <label htmlFor="email" className="block text-1xl font-medium text-gray-700">Email</label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full h-12 rounded-md border-gray-500 pl-3 shadow-sm focus:border-indigo-500 focus:ring-indigo"></input>
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block text-1xl font-medium text-gray-700">Senha</label>
                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full h-12 rounded-md border-gray-500 pl-3 shadow-sm focus:border-indigo-500 focus:ring-indigo"></input>
                </div>
                <button className="bg-blue-700 p-3 w-full rounded-md mt-4 text-white cursor-pointer">Entrar</button>
            </form>
        </div>
    )
}