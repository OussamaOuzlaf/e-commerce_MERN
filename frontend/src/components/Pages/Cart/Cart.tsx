import { useAuth } from '../../../context/Auth/Context';
import { useCart } from '../../../context/Cart/CartContext';

export default function Cart() {
    // const { token } = useAuth();
    const { cartItems, totalAmount } = useCart();
    // useEffect(() => {
    //     if (!token) {
    //         console.error("Token not available");
    //         return;
    //     }
    //     const fetchCart = async () => {
    //         try {
    //             const response = await fetch(`${BASE_URL}/cart`, {
    //                 headers: {
    //                     'Authorization': `Bearer ${JSON.parse(token || "")}`
    //                 }
    //             });
    //             if (!response.ok) {
    //                 setError("Failed to fetch user cart. Please try")
    //             }
    //             const data = await response.json();
    //             setCart(data);
    //         } catch (error) {
    //             console.error("Error fetching cart: ", error);
    //         }
    //     };
    //     fetchCart();
    // }, [token]);
    
    return (
        <>
            <div>
                <span>My Cart</span>
                <div>
                    {cartItems.map((item) => {
                        return(
                            <span>{item.title}</span>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
