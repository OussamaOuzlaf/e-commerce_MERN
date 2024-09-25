"use client"
import { Navbar } from '@/components/Navbar'
import { BASE_URL } from '@/constant/baseURL';
import { useAuth } from '@/context/Auth/Context';
import Link from 'next/link';
import React, { useRef, useState } from 'react'

const classInput = 'p-2 rounded border-gray-600 border-solid border-2'

export default function Login() {
    const { login } = useAuth()
    const [error, setError] = useState("")
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const onSubmit = async () => {
        const email = emailRef.current?.value;
        const pass = passRef.current?.value;
        if (!email || !pass) {
            setError("Check submit Data")
            return;
        }
        const response = await fetch(`${BASE_URL}/user/login`, {
            method: "POST",
            body: JSON.stringify({ email, pass }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            setError("Unable to Login user, please try different credientials")
        }
        const token = await response.json();
        if (!token) {
            setError("Incorrect Token");
            return;
        }
        login(email, token)
    }
    return (
        <>
            <Navbar />
            <div className='container py-6'>
                <h1 className='text-center text-2xl font-semibold mb-2'>Login new Account</h1>
                <div className='flex flex-col gap-4 justify-center items-center'>
                    <input type="email" placeholder='Email' className={classInput} ref={emailRef} />
                    <input type="password" placeholder='Password' className={classInput} ref={passRef} />
                    <Link href='/'><button className='bg-blue-600 rounded p-2 text-white' onClick={onSubmit}>Login</button></Link>
                    <Link href="/Register">You Don't Have a Account?<span className='text-red-600'>Register Now</span></Link>
                    {error && <span className='text-red-600 text-lg font-semibold'>{error}</span>}
                </div>
            </div>
        </>
    )
}