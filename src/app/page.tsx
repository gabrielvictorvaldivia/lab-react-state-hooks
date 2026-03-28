'use client';

import Cart, { Item} from "@/components/Cart";

export default function Home() {

    const items: Item[] = [
        {id: 1, name: "Shirt", price: 12.0},
        {id: 2, name: "Shorts", price: 21.99},
        {id: 3, name: "Glasses", price: 9.99},
    ];

    return (
        <Cart initialItems={items}/>
    );
}
