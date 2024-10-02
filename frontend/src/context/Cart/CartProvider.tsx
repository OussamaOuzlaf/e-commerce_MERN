import { FC, PropsWithChildren, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { CartItems } from "../../types/Cart";
import { BASE_URL } from "../../constant/baseURL";
import { useAuth } from "../Auth/Context";


export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
    const { token } = useAuth()
    const [cartItems, setCartItems] = useState<CartItems[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [error, setError] = useState("");
    useEffect(() => {
        if (!token) {
            console.error("Token not available");
            return;
        }
        const fetchCart = async () => {
            try {
                const response = await fetch(`${BASE_URL}/cart`, {
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(token || "")}`
                    }
                });
                if (!response.ok) {
                    setError("Failed to fetch user cart. Please try")
                }
                const cart = await response.json();
                const cartItemsMapped = cart.items.map(({ product, quantity }: { product: any, quantity: number }) => ({
                    productId: product._id, title: product.title, image: product.image, quantity, unitPrice: product.unitPrice
                }))
                setCartItems(cartItemsMapped);
            } catch (error) {
                console.error("Error fetching cart: ", error);
            }
        };
        fetchCart();
    }, [token]);
    const addItemsToCart = async (productId: string) => {
        try {
            const response = await fetch(`${BASE_URL}/cart/items`, {
                method: "POST",
                body: JSON.stringify({ productId, quantity: 1 }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(token || "")}`,
                }
            });
            if (!response.ok) {
                setError("Failed to add to cart!!")
            }
            const cart = await response.json();
            if (!cart) {
                setError("Failed to parse cart data")
            }
            const cartItemsMapped = cart.items.map(({ product, quantity, unitPrice }: 
                { product: any; quantity: number; unitPrice: number }) => ({
                productId: product._id, title: product.title, image: product.image, quantity, unitPrice: unitPrice || product.price
            }))
            setCartItems([...cartItemsMapped])
            setTotalAmount(cart.totalAmount)
        } catch (error) {
            console.log(error);
        }
    }
    const updateItemInCart = async (productId: string, quantity: number) => {
        try {
            const response = await fetch(`${BASE_URL}/cart/items`, {
                method: "PUT",
                body: JSON.stringify({ productId, quantity }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(token || "")}`,
                }
            });
            if (!response.ok) {
                setError("Failed to update to cart!!")
            }
            const cart = await response.json();
            if (!cart) {
                setError("Failed to parse cart data")
            }
            const cartItemsMapped = cart.items.map(({ product, quantity, unitPrice }: 
                { product: any; quantity: number; unitPrice: number }) => ({
                productId: product._id, title: product.title, image: product.image, quantity, unitPrice: unitPrice || product.price
            }))
            setCartItems([...cartItemsMapped])
            setTotalAmount(cart.totalAmount)
        } catch (error) {
            console.log(error);
        }
    }
    const removeItemInCart = async (productId: string) => {
        try {
            const response = await fetch(`${BASE_URL}/cart/items/${productId}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${JSON.parse(token || "")}`,
                }
            });
            if (!response.ok) {
                setError("Failed to remove to cart!!")
            }
            const cart = await response.json();
            if (!cart) {
                setError("Failed to parse cart data")
            }
            const cartItemsMapped = cart.items.map(({ product, quantity, unitPrice }: 
                { product: any; quantity: number; unitPrice: number }) => ({
                productId: product._id, title: product.title, image: product.image, quantity, unitPrice: unitPrice || product.price
            }))
            setCartItems([...cartItemsMapped])
            setTotalAmount(cart.totalAmount)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <CartContext.Provider value={{ cartItems, totalAmount, addItemsToCart, updateItemInCart, removeItemInCart }}>
            {children}
        </CartContext.Provider>
    )
}