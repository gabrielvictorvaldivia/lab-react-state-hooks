'use client';

import Cart, {Item} from "@/components/cart/Cart";

export default function Home() {

    const items: Item[] = [
        {id: 1, name: "Shirt", price: 12.0, quantity: 1},
        {id: 2, name: "Shorts", price: 21.99, quantity: 2},
        {id: 3, name: "Glasses", price: 9.99, quantity: 1},
    ];

    return (
        <Cart items={items}/>
    );
}
