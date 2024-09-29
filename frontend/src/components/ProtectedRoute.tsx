import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/Auth/Context'


const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth()
    console.log(isAuthenticated);
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }
    return <Outlet />
}

export default ProtectedRoute;