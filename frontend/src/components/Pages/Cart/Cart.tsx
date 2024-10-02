import { useEffect, useState } from 'react'
import { useAuth } from '../../../context/Auth/Context';
import { BASE_URL } from '../../../constant/baseURL';
import { useCart } from '../../../context/Cart/CartContext';

export default function Cart() {
    const { token } = useAuth();
    const { cartItems, totalAmount } = useCart();
    return (
        <>
            <div className='p-4'>
                <span className='text-4xl font-semibold text-white'>My Cart</span>
                <div className='py-8 grid grid-cols-1 gap-4'>
                    {cartItems.map((item) => {
                        return (
                            <div className='flex items-center justify-between'>
                                <img src={item.image} alt={item.title} className='w-32 h-32 bg-center' />
                                <span>{item.title}</span>
                                <span>{item.quantity} * {item.unitPrice}DH</span>
                                <div className='flex items-center gap-4'>
                                    <button className='text-lg rounded w-10 h-10 p-2 bg-blue-600'>+</button>
                                    <button className='text-lg rounded w-10 h-10 p-2 bg-blue-600'>-</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <span className='text-lg font-semibold'>Total Cart: {totalAmount.toFixed(2)}DH</span>
            </div>
        </>
    )
}
