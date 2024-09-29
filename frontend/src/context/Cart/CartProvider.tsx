import { FC, PropsWithChildren, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { CartItems } from "../../types/Cart";


export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItems[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const addItemsToCart = (productId: string) => {
        console.log(productId);

    }
    return (
        <CartContext.Provider value={{ cartItems, totalAmount, addItemsToCart }}>
            {children}
        </CartContext.Provider>
    )
}