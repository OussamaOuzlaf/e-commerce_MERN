import { createContext, useContext } from "react"
import { CartItems } from "../../types/Cart"

interface CartContextType {
    cartItems: CartItems[];
    totalAmount: number;
    addItemsToCart: (productId: string) => void;
    updateItemInCart: (productId: string, quantity: number) => void;
    removeItemInCart: (productId: string) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextType>(
    {cartItems: [], totalAmount: 0, addItemsToCart: () => {}, updateItemInCart: () => {}, 
    removeItemInCart: () => {}, clearCart: () => {} }
)

export const useCart = () => useContext(CartContext)