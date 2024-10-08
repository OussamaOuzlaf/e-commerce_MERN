import { useEffect, useState } from 'react'
import { Product } from '../../../types/Product'
import { BASE_URL } from '../../../constant/baseURL'
import { ProductCart } from '../../ProductCart'

export const HomePage = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [ error, setError ] = useState<boolean>(false)
    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await fetch(`${BASE_URL}/product`);
                const data = await response.json();
                setProducts(data)
            }
            fetchData();
        } catch {
            setError(true)
        }
    }, [])
    if (error) {
        return <span>Something is wrong please try again!!</span>
    }
    return (
        <div className='p-4 grid grid-cols-3 gap-4'>
            {products.map((p, index) => {
                return (
                    <ProductCart {...p} />
                )
            })}
        </div>
    )
}