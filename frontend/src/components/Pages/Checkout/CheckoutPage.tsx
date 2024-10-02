import { useEffect, useState } from 'react'
import { useAuth } from '../../../context/Auth/Context';
import { useCart } from '../../../context/Cart/CartContext';

export default function CheckoutPage() {
    const { token } = useAuth();
    const { cartItems, totalAmount } = useCart();
    return (
        <>
            <div className='p-4 grid grid-cols-1 gap-4'>
                <span className='text-4xl font-semibold text-white'>Checkout</span>
                <input type="text" placeholder='Delivery Address' className='rounded p-2 text-black outline-none' />
                <div className='py-8 grid grid-cols-1 gap-4'>
                    {cartItems.map(({ title, quantity, unitPrice, image, productId }) => {
                        return (
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-4'>
                                    <img src={image} alt={title} className='w-10 h-10 bg-center' />
                                    <span>{title}</span>
                                </div>
                                <span>{quantity} * {unitPrice}DH</span>
                            </div>
                        )
                    })}
                </div>
                <div className='flex items-center gap-4'>
                    <span className='text-lg font-semibold'>Total Cart: {totalAmount.toFixed(2)}DH</span>
                </div>
                <button className='text-white bg-blue-600 rounded p-2 w-full'>Pay Now</button>
            </div>
        </>
    )
}
