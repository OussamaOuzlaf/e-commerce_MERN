import { createContext, useContext } from "react"
import { CartItems } from "../../types/Cart"

interface CartContextType {
    cartItems: CartItems[];
    totalAmount: number;
    addItemsToCart: (productId: string) => void;
}

export const CartContext = createContext<CartContextType>(
    {cartItems: [], totalAmount: 0, addItemsToCart: () => {}}
)

export const useCart = () => useContext(CartContext)