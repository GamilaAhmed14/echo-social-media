import { Button, Input, Label } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import zod from "zod";
import { ContainerContext } from "../../../Context/ContainerContext";



export default function Login() {

 const {setToken} = useContext(ContainerContext);

  let navigate = useNavigate();

  const [confrimAccess, setconfrimAccess] = useState(null);
  const [errorMessage, seterrorMessage] = useState(null);
  const [loadingForm, setloadingForm] = useState(false);

let schema = zod.object({
 email:zod.email(),
 password : zod.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character."),
})

let {register,handleSubmit,formState} = useForm({
  defaultValues:{
    email:"",
    password:"",
  },
  resolver: zodResolver(schema),
})

  function SubmitForm(values) {
    setloadingForm(true);
    axios.post("https://route-posts.routemisr.com/users/signin",values).then((res)=>{
     console.log(res.data.message);
     setconfrimAccess(res.data.message);
     seterrorMessage(null);
      setloadingForm(false);
     if (res.data.message === "signed in successfully") {

      localStorage.setItem("userToken",res.data.data.token);
      setToken(res.data.data.token);
      setTimeout(() => {
        navigate("/home");
      }, 2000);
     }
     
    }).catch((err)=>{
     console.log(err.response.data.message);
     seterrorMessage(err.response.data.message);
     setconfrimAccess(null);
      setloadingForm(false);
     
    })
    
  }
  return (
    <>
    <section className="bg-blue-950 pb-30">
    <h1 className="text-white text-2xl text-center pt-3">Echo</h1>
    <div className=" w-1/2 bg-white mx-auto mt-3 rounded-2xl ">
    <div className=" text-center font-bold text-2xl pt-2">
        <h1>Sign in To Your Account</h1>
      </div>

      <form className="px-7" onSubmit={handleSubmit(SubmitForm)}>
     
     {errorMessage !=null && <div className=" mt-4 mb-4 flex items-center space-x-2 rounded-md border border-red-200 bg-red-50 p-2 text-xs font-medium text-red-800" role="alert">
  <svg className="h-4 w-4 shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
  </svg>
  <span>incorrect email or password.</span>
</div>}
  
  {confrimAccess != null && <div className=" mt-4 mb-4 flex items-center space-x-2 rounded-md border border-green-200 bg-green-50 p-2 text-xs font-medium text-green-800" role="alert">
  <svg className="h-4 w-4 shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
</svg>
  <span>signed in successfully</span>
</div>}

      {/* email input */}
      <div className="my-3">
       <Label htmlFor="email" className="text-black mb-1.5 inline-block w-full">Your Email</Label>
        <Input id="email" {...register("email")} name="email" placeholder="jane@example.com" type="email" className =" w-full" />
        {formState.errors.email &&  <p className="mt-1 text-sm text-red-600">{formState.errors.email.message}</p>}
      </div>

      {/* password input  */}
          <div className="my-3">
       <Label htmlFor="password" className="text-black mb-1.5 inline-block w-full">Password</Label>
        <Input id="password" {...register("password")} name="password"  placeholder="••••••••" type="password" className =" w-full" />
        {formState.errors.password &&  <p className="mt-1 text-sm text-red-600">{formState.errors.password.message}</p>}
      </div>
     
     {/* remember me checkbox , forget password  */}
    <div className="my-3 flex justify-between">
    <div>
      <label className="label">
    <input type="checkbox" defaultChecked className="checkbox" />Remember me</label>
    </div>

    <div>
     <Link className="link link-hover text-sm text-blue-400 decoration-blue-400"> Forget password?</Link>
    </div>
    </div>

    {/* signin button  */}
    <Button type="submit" className="w-full rounded-sm">{loadingForm ?  <div><i className="fa-solid fa-spinner fa-spin"></i> Signing in </div> : "Sign in" }</Button>
     
     <div className="mt-3 pb-7">
      <p className="text-gray-400 inline-block">Don’t have an account yet?</p> 
      <Link to="/register" className=" ml-1.5 link link-hover text-sm text-blue-400  decoration-blue-400"> SignUp</Link>
     </div>
      </form>
    </div>
    </section>
    </>
  )
}
