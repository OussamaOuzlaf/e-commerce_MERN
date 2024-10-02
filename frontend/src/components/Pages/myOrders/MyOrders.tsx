import { useEffect } from 'react'
import { useAuth } from '../../../context/Auth/Context'

export default function MyOrders() {
    const { myOrders, getMyOrders } = useAuth()
    useEffect(() => {
        getMyOrders()
    }, [])
    console.log(myOrders);
    
    return (
        <>
        <span>My Order</span>
        <div>
            {myOrders.map(({orderItems, _id, total, address}) => {
                return(
                    <div className='grid grid-cols-1 gap-2'>
                        <span>{address} </span>
                        <span>{orderItems.length}</span>
                        <span>{total}</span>
                    </div>
                )
            })}
        </div>
        </>
    )
}
