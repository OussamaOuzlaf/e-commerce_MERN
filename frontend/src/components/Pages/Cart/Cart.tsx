import { useEffect, useState } from 'react'
import { useAuth } from '../../../context/Auth/Context';
import { useCart } from '../../../context/Cart/CartContext';

export default function Cart() {
    const { token } = useAuth();
    const { cartItems, totalAmount, updateItemInCart, removeItemInCart, clearCart } = useCart();
    const handleQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            return;
        }
        updateItemInCart(productId, quantity)
    }
    const handleRemoveItem = (productId: string) => {
        removeItemInCart(productId)
    }
    return (
        <>
            <div className='p-4'>
                <span className='text-4xl font-semibold text-white'>My Cart</span>
                <div className='py-8 grid grid-cols-1 gap-4'>
                    {cartItems.map(({ title, quantity, unitPrice, image, productId }) => {
                        return (
                            <div className='flex items-center justify-between'>
                                <img src={image} alt={title} className='w-32 h-32 bg-center' />
                                <span>{title}</span>
                                <span>{quantity} * {unitPrice}DH</span>
                                <div className='flex items-center gap-4'>
                                    <button className='text-lg rounded w-10 h-10 p-2 bg-blue-600'
                                        onClick={() => handleQuantity(productId, quantity + 1)}>+</button>
                                    <button className='text-lg rounded w-10 h-10 p-2 bg-blue-600'
                                        onClick={() => handleQuantity(productId, quantity - 1)}>-</button>
                                    <button className='text-lg font-semibold bg-blue-600 rounded p-2'
                                        onClick={() => handleRemoveItem(productId)}>Remove Item</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='flex items-center gap-4'>
                    <span className='text-lg font-semibold'>Total Cart: {totalAmount.toFixed(2)}DH</span>
                    <button className='text-lg font-semibold bg-blue-600 rounded p-2' 
                    onClick={clearCart}>Clear All Item</button>
                </div>
            </div>
        </>
    )
}
