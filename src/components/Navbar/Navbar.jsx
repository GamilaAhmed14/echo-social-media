import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContainerContext } from "../../Context/ContainerContext";



export default function Navbar() {

  let navigate = useNavigate()
   const {Token,setToken, userProfile} = useContext(ContainerContext);

function logOut() {
  localStorage.removeItem("userToken");
  setToken(null);
  navigate("/login");

}

  return (
    <>
  <div className="navbar bg-base-100 shadow-sm p-4">
  <div className="flex-1">
    <Link to="home" className="btn btn-ghost text-xl">Home</Link>
    <Link to="profile" className="btn btn-ghost text-xl">Profile</Link>
  </div>
  <div className="flex gap-2">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={userProfile?.photo} />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        
        {Token !== null ? <div><li><span onClick={()=>{logOut()}}  className="text-lg cursor-pointer">Logout</span></li> <li><Link to="resetpassword" className="text-lg">Reset Password</Link></li></div> : <>
        <li><Link to="register" className="text-lg">Register</Link></li>
        <li><Link to="login" className="text-lg">Login</Link></li>
        </>}
      </ul>
    </div>
  </div>
</div>
    </>

  )
}
