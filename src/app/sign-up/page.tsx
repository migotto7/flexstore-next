'use client'

import { signUp } from "@/lib/firebaseAuth";
import { useRouter } from "next/router";
import React, { useState } from "react"

export default function SignUp() {
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        setErrors((prev) => ({ ...prev, [name]: "" }));

        if (name === "cep" && value.length === 8) {
            searchCep(value);
        }
    };

    const searchCep = async (cep: string) => {
        try {
            const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            const data = await res.json()

            if (!data.erro) {
                setForm((prev) => ({
                    ...prev,
                    rua: data.logradouro || "",
                    bairro: data.bairro || "",
                    cidade: data.localidade || "",
                    estado: data.uf || "",
                }));
            } else {
                alert("CEP não encontrado");
            }
        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
        }
    };

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const router = useRouter();
        e.preventDefault();
        try{
            signUp(form.email, form.password);
            router.push("/profile");
        } catch (error: any) {
            alert(error.message);
        }

        console.log("dados enviados", form);
    }

    const validateFormStep1 = () => {
        const newErrors: { [key: string]: string } = {};

        if (!form.name) newErrors.name = "Nome é obrigatório.";
        if (!form.email) newErrors.email = "E-mail é obrigatório.";
        if (!form.password) newErrors.password = "Senha é obrigatória.";
    
        setErrors(newErrors);
    
        if (Object.keys(newErrors).length === 0) {
          nextStep();
        }
    }

    const validateFormStep2 = () => {
        const newErrors: { [key: string]: string } = {};

        if (!form.cep) newErrors.cep = "CEP é obrigatório.";
        if (!form.rua) newErrors.rua = "Rua é obrigatória.";
        if (!form.bairro) newErrors.bairro = "Bairro é obrigatório.";
        if (!form.cidade) newErrors.cidade = "Cidade é obrigatória.";
        if (!form.estado) newErrors.estado = "Estado é obrigatório.";
        if (!form.numero) newErrors.numero = "Número é obrigatório.";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            handleSubmit;
        }
    }

    return (
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
                                    className={`w-full px-4 py-4 border rounded-md mt-1 ${
                                        errors.name ? "border-red-500" : ""
                                    }`}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.name}
                                    </p>
                                )}
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
                                    className={`w-full px-4 py-4 border rounded-md mt-1 ${
                                        errors.email ? "border-red-500" : ""
                                    }`}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.email}
                                    </p>
                                )}
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
                                    className={`w-full px-4 py-4 border rounded-md mt-1 ${
                                        errors.password ? "border-red-500" : ""
                                    }`}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.password}
                                    </p>
                                )}
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
                                    className={`w-full px-4 py-4 border rounded-md mt-1 ${
                                        errors.cep ? "border-red-500" : ""
                                    }`}
                                />
                                {errors.cep && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.cep}
                                    </p>
                                )}
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
                                        className={`w-full px-4 py-4 border rounded-md mt-1 ${
                                            errors.rua ? "border-red-500" : ""
                                        }`}
                                    />
                                    {errors.rua && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.rua}
                                        </p>
                                    )}
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
                                        className={`w-full px-4 py-4 border rounded-md mt-1 ${
                                            errors.numero ? "border-red-500" : ""
                                        }`}
                                    />
                                    {errors.numero && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.numero}
                                        </p>
                                    )}
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
                                    className={`w-full px-4 py-4 border rounded-md mt-1 ${
                                        errors.bairro ? "border-red-500" : ""
                                    }`}
                                />
                                {errors.bairro && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.bairro}
                                    </p>
                                )}
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
                                        className={`w-full px-4 py-4 border rounded-md mt-1 ${
                                            errors.cidade ? "border-red-500" : ""
                                        }`}
                                    />
                                    {errors.cidade && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.cidade}
                                        </p>
                                    )}
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
                                        className={`w-full px-4 py-4 border rounded-md mt-1 ${
                                            errors.estado ? "border-red-500" : ""
                                        }`}
                                    />
                                    {errors.estado && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.estado}
                                        </p>
                                    )}
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
                                    onClick={validateFormStep2}
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