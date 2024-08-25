import { Navigate } from "react-router-dom"

export const ProtectedrRoutes = ({children, user}) => {
    return user ? children : <Navigate to='/'></Navigate>
}
