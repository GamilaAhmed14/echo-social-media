import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { ContainerContext } from "../../Context/ContainerContext";


export default function ProtectedRoute(props) {

    const {Token} = useContext(ContainerContext);
    // let navigate = useNavigate();

if (Token!== null) {
    return props.children
} else {
    return <Navigate to="/login"></Navigate>
    //navigate("/login");
}
}
