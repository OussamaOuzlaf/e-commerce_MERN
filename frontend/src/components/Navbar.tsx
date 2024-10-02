import { useEffect, useRef, useState } from 'react'
import { IoLogoAndroid } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6"
import { FaShoppingCart } from "react-icons/fa";
import { useAuth } from '../context/Auth/Context';
import { Link } from 'react-router-dom';
import { useCart } from '../context/Cart/CartContext';
const Links = ["PRODUCTS", "PRICING", "BLOG"]


export const Navbar = () => {
    const { username, isAuthenticated, logOut } = useAuth();
    const { cartItems } = useCart()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const handleButtonClick = () => setIsModalOpen((prev) => !prev);
    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setIsModalOpen(false);
        }
    };
    useEffect(() => {
        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalOpen]);
    return (
        <div className='flex items-center justify-between bg-gray-800 text-white p-6 relative'>
            <div className='flex items-center gap-16'>
                <p className='flex items-center gap-2 text-xl font-semibold'>
                    <IoLogoAndroid />
                    Logo
                </p>
                <div className='grid grid-cols-3 gap-4'>
                    {Links.map((e, index) => {
                        return (
                            <span key={index} className='cursor-pointer font-semibold'>{e}</span>
                        )
                    })}
                </div>
            </div>
            <Link to="/cart">
                <div className='relative cursor-pointer'>
                    <span className='text-2xl'><FaShoppingCart /></span>
                    <span className='absolute -top-4 -right-4 w-2 h-2 rounded-full 
                        p-3 bg-red-600 text-white flex items-center justify-center'>{cartItems.length
                        }</span>
                </div>
            </Link>
            <>
                {isAuthenticated ? <div className='flex items-center gap-6'>
                    <div className="text-3xl cursor-pointer flex items-center gap-4">
                        <span className='text-base'>{username}</span>
                        <span onClick={handleButtonClick}><FaRegCircleUser /></span>
                    </div>
                    {isModalOpen ? <div className='w-30 p-4 rounded grid grid-cols-1 gap-4 
            absolute right-8 top-16 bg-white shadow-lg' ref={modalRef}>
                        <span onClick={handleButtonClick}
                            className='text-black cursor-pointer font-semibold'>Profile</span>
                        <span onClick={() => {
                            handleButtonClick();
                            logOut()
                        }}
                            className='text-black cursor-pointer font-semibold'>Logout</span>
                    </div>
                        : ''}
                </div> : <Link to="/Login">
                    <button className='text-lg bg-black text-white rounded-full p-2'>Login</button></Link>}
            </>
        </div>
    )
}