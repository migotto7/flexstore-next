'use client'

import { signUp } from "@/lib/firebaseAuth";
import React, { useState, useEffect } from "react"

export default function SignUp() {
    const [step, setStep] = useState(1);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        cep: "",
        rua: "",
        bairro: "",
        cidade: "",
        estado: "",
        numero: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}));

        if(name === "cep" && value.length === 8) {
            searchCep(value);
        }
    };

    const searchCep = async (cep: string) => {
        try {
            const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            const data = await res.json()

            if(!data.erro) {
                setForm((prev) => ({
                    ...prev,
                    rua: data.logradouro || "",
                    bairro: data.bairro || "",
                    cidade: data.localidade || "",
                    estado: data.uf || "",
                }));
            }else {
                alert("CEP não encontrado");
            }
        } catch(error) {
            console.error("Erro ao buscar CEP:", error);
        }
    };

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);    

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        signUp(form.email, form.password)
        console.log("dados enviados", form);
    }

    const validateFormStep1 = () => {
        const {name, email, password} = form;
        if(!name || !email || !password) {
            alert("Preencha todos os campos obrigatórios");
            return false;
        }
        nextStep();
    }

    return(
        <div className="h-full bg-white flex px-8 py-6 justify-center items-center">
            <div className="w-full max-w-md space-y-6">
                <h2 className="text-3xl font-bold text-gray-800">
                    Criar Conta
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {step === 1 && (
                        <div>
                            <div className="mb-4">
                                <label className="block text-1xl font-medium text-gray-700">
                                    Nome completo
                                </label>
                                <input 
                                    type="text"
                                    name="name"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-4 border rounded-md mt-1"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-1xl font-medium text-gray-700">
                                    Email
                                </label>
                                <input 
                                    type="email"
                                    name="email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-4 border rounded-md mt-1"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-1xl font-medium text-gray-700">
                                    Senha
                                </label>
                                <input 
                                    type="password"
                                    name="password"
                                    required
                                    value={form.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-4 border rounded-md mt-1"
                                />
                            </div>
                            <button 
                                type="button"
                                onClick={validateFormStep1}
                                className="w-full bg-black text-white py-4 rounded-xl cursor-pointer hover:bg-gray-800 mt-4"
                            >
                                Avançar
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            <div className="mb-4">
                                <label className="block text-1xl font-medium text-gray-700">
                                    CEP
                                </label>
                                <input 
                                    type="text"
                                    name="cep"
                                    required
                                    maxLength={8}
                                    value={form.cep}
                                    onChange={handleChange}
                                    className="w-full px-4 py-4 border rounded-md mt-1"
                                />
                            </div>
                            <div className="mb-4 flex gap-4">
                                <div className="w-2/3">
                                    <label className="block text-1xl font-medium text-gray-700">
                                        Rua
                                    </label>
                                    <input 
                                        type="text"
                                        name="rua"
                                        required
                                        value={form.rua}
                                        onChange={handleChange}
                                        className="w-full px-4 py-4 border rounded-md mt-1"
                                    />
                                </div>
                                <div className="w-1/3">
                                    <label className="block text-1xl font-medium text-gray-700">
                                        Número
                                    </label>
                                    <input 
                                        type="text"
                                        name="numero"
                                        required
                                        maxLength={5}
                                        value={form.numero}
                                        onChange={handleChange}
                                        className="w-full px-4 py-4 border rounded-md mt-1"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-1xl font-medium text-gray-700">
                                    Bairro
                                </label>
                                <input 
                                    type="text"
                                    name="bairro"
                                    required
                                    value={form.bairro}
                                    onChange={handleChange}
                                    className="w-full px-4 py-4 border rounded-md mt-1"
                                />
                            </div>
                            <div className="mb-4 flex gap-4">
                                <div className="w-2/3">
                                    <label className="block text-1xl font-medium text-gray-700">
                                        Cidade
                                    </label>
                                    <input 
                                        type="text"
                                        name="cidade"
                                        required
                                        value={form.cidade}
                                        onChange={handleChange}
                                        className="w-full px-4 py-4 border rounded-md mt-1"
                                    />
                                </div>
                                <div className="w-1/3">
                                    <label className="block text-1xl font-medium text-gray-700">
                                        Estado
                                    </label>
                                    <input 
                                        type="text"
                                        name="estado"
                                        required
                                        value={form.estado}
                                        onChange={handleChange}
                                        className="w-full px-4 py-4 border rounded-md mt-1"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between mt-8">
                                <button 
                                    type="button"
                                    onClick={prevStep}
                                    className="text-sm text-gray-500 hover:underline cursor-pointer"
                                >
                                    Voltar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-black text-white px-4 py-3 rounded-xl w-2/3 cursor-pointer hover:bg-gray-800"
                                >
                                    Criar conta
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}