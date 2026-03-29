'use client'

import {useReducer, useState} from "react";
import ActionButton from "@/components/cart/ActionButton";
import {id} from "zod/locales";
import {random} from "nanoid"; // Assumindo que você ainda usa seu componente de botão

export interface Item {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

type State = {
    items: Item[];
};

type Action = |
    { type: "ADD_ITEM"; payload: Omit<Item, "quantity"> }
    | { type: "REMOVE_ITEM"; payload: { id: number } }
    | { type: "SAVE_FOR_LATER"; payload: { id: number } }


function cartReducer(state: State, action: Action): State {
    switch (action.type) {
        case "ADD_ITEM":
            console.log("firing")
            const existingItem = state.items.find(item => item.id === action.payload.id)

            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(item => item.id === action.payload.id ? {
                        ...item,
                        quantity: item.quantity + 1
                    } : item)
                }
            }

            return {
                ...state,
                items: [...state.items, {...action.payload, quantity: 1}]
            }

        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id)
            }
        case "SAVE_FOR_LATER":
            console.log(`SAVED_ITEM: ${action.payload.id}`);
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.id)
            }
        default:
            throw new Error(`Ação desconhecida: ${(action as any).type}`);

    }
}

export default function Cart({items}: State) {

    const initialState: State = {
        items: items,
    };

    const [state, dispatch] = useReducer(cartReducer, initialState)

    // Calcular o subtotal
    const subtotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping: number = 0; // Exemplo de frete grátis
    const total = subtotal + shipping;

    // Ícone de Presente (SVG)
    const GiftIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
             className="w-10 h-10 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
        </svg>
    );

    // Ícone de Marcador (Save for later)
    const BookmarkIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
             className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"/>
        </svg>
    );

    // Ícone de 'X' (Remove)
    const XIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
             className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
        </svg>
    );

    return (
        // CONTÊINER CENTRALIZADOR EXTERNO
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

            {/* CARTÃO PRINCIPAL DO CARRINHO */}
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl space-y-8">

                {/* CABEÇALHO */}
                <div className="flex justify-between items-center pb-6 border-b border-gray-100">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
                        <p className="text-sm text-gray-500 font-medium">{state.items.length} Items</p>
                    </div>
                    {/* Botão de Adicionar (Usando sua lógica original, mas com estilo moderno) */}
                    <ActionButton onClick={() => dispatch(
                        {
                            type: 'ADD_ITEM',
                            payload: {id: 1774743136000, name: "Premium Leather Wallet", price: 50.00}
                        }
                    )
                    } text={"Add something that costs $50"}/>
                </div>

                {/* LISTA DE ITENS */}
                <div className="space-y-6">
                    {state.items.map((item) => (
                        // CARTÃO DE ITEM INDIVIDUAL
                        <div key={item.id}
                             className="bg-white border border-gray-100 rounded-xl p-6 flex items-center gap-6 shadow-sm hover:shadow-md transition duration-200">

                            {/* Ícone/Imagem do Item */}
                            <div
                                className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <GiftIcon/>
                            </div>

                            {/* Detalhes do Item */}
                            <div className="flex-grow">
                                <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                                <p className="text-xl font-bold text-blue-700">${item.price.toFixed(2)}</p>
                            </div>

                            {/* Ações (Save for later, Remove) */}
                            <div className="flex items-center gap-6">
                                <button
                                    onClick={() => dispatch({type: 'SAVE_FOR_LATER', payload: {id: item.id}})}
                                    className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1.5 transition"
                                >
                                    <BookmarkIcon/>
                                    <span>Save for Later</span>
                                </button>
                                <button
                                    onClick={() => dispatch({type: 'REMOVE_ITEM', payload: {id: item.id}})}
                                    className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1.5 transition"
                                >
                                    <XIcon/>
                                    <span>Remove</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* RESUMO E CHECKOUT */}
                <div className="border-t border-gray-100 pt-8 space-y-4">
                    <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>Subtotal</span>
                        <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>Shipping</span>
                        <span className="font-semibold text-gray-900">
                            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                        </span>
                    </div>
                    <div className="pt-4 flex justify-between items-center text-2xl font-bold text-gray-900">
                        <span>Estimated Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <button
                        className="w-full bg-green-600 text-white rounded-xl py-4 font-semibold text-lg text-center hover:bg-green-700 transition duration-150 shadow-md"
                    >
                        Proceed to Checkout
                    </button>
                </div>

            </div>
        </div>
    );
}