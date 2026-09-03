import { Button, Description, Input, Label } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
// used this packadge for handle inputs and form submit 
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// used for validation 
import zod from "zod";


export default function Register() {

  let navigate = useNavigate();

  const [errorMessage, seterrorMessage] = useState(null);
  const [confirmMessage, setconfirmMessage] = useState(null);
  const [loadingForm, setloadingForm] = useState(false);



  let schema = zod.object({
    name:zod.string().min(2,"Full name must be at least 2 characters.").max(20,"Full name must be 20 characters or less"),
    username:zod.string().regex(/^[a-z0-9_]{3,30}$/,"3-30 characters. Lowercase letters, numbers, and underscores only."),
    email: zod.email(),
    dateOfBirth: zod.string().regex(/^\d{4}-\d{2}-\d{2}$/,"choose your date of birth").refine((date)=>{
      let todayDate = new Date();
      todayDate.setHours(0,0,0,0);
      let userDate = new Date(date);
      return userDate < todayDate;
    }, "Date of birth cannot be in the future."),
    gender: zod.enum(["male","female"],"choose gender"),
    password: zod.string().regex( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character."),
    rePassword : zod.string(),
  }).refine((inputValues)=>{
   return   inputValues.rePassword === inputValues.password 
  },{
    error:"repassword must match the repassword",
    path:['rePassword'],
  });



 function submitForm(values) {
  setloadingForm(true);
 axios.post("https://route-posts.routemisr.com/users/signup",values).then((res)=>{
   console.log(res.data.message);
   setconfirmMessage(res.data.message);
   seterrorMessage(null);
   setloadingForm(false);
   if (res.data.message === "account created") {
    setTimeout(() => {
      navigate('/login');
    }, 2000);
   }
   
 }).catch((err)=>{
  console.log(err.response.data.message);
  seterrorMessage(err.response.data.message);
  setconfirmMessage(null);
  setloadingForm(false);
  
 })
};

let {register, handleSubmit, formState } = useForm({
  defaultValues:{
    name:"",
    username:"",
    email:"",
    dateOfBirth:"",
    password:"",
    rePassword:"",
    gender:""
  },
  resolver: zodResolver(schema),
})
  
  return (
   <>
   <section className="bg-blue-950 pb-44 ">
    <h1 className="text-white text-2xl text-center pt-3">Echo</h1>
    {/* form section */}
     <div className=" w-1/2 bg-white mx-auto mt-3 rounded-2xl ">
      <div className=" text-center font-bold text-2xl pt-2">
        <h1>Create Your Free Account </h1>
      </div>
      
    <form onSubmit={handleSubmit(submitForm)} className="px-7">

      {errorMessage !=null && <div className="mb-4 flex items-center space-x-2 rounded-md border border-red-200 bg-red-50 p-2 text-xs font-medium text-red-800" role="alert">
  <svg className="h-4 w-4 shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
  </svg>
  <span>User account already exists.</span>
</div>
}

   {confirmMessage !=null  && <div className="mb-4 flex items-center space-x-2 rounded-md border border-green-200 bg-green-50 p-2 text-xs font-medium text-green-800" role="alert">
  <svg className="h-4 w-4 shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
</svg>
  <span>User account created</span>
</div>
}

      {/* name Input */}
        <div className=" my-3">
        <Label htmlFor="name" className="text-black mb-1.5 inline-block">Your Full Name</Label>
        <Input {...register("name")} id="name"  name="name" className="w-full" placeholder="John" />
        <Description>We'll never share this with anyone else</Description>
        {formState.errors.name &&  <p className="mt-1 text-sm text-red-600">{formState.errors.name.message}</p> }
      </div>

        {/* userName Input */}
        <div className=" my-3">
        <Label htmlFor="username" className="text-black mb-1.5 inline-block">Your UserName</Label>
        <Input {...register("username")} id="username"  name="username" className="w-full" placeholder="John_ahmed12" />
        {formState.errors.username &&  <p className="mt-1 text-sm text-red-600">{formState.errors.username.message}</p>}
      </div>

      

      {/* Email input */}
       <div className=" my-3">
        <Label htmlFor="email" className="text-black mb-1.5 inline-block">Your Email</Label>
        <Input {...register("email")} id="email" name="email" className="w-full" placeholder="john@example.com" />
        {formState.errors.email &&  <p className="mt-1 text-sm text-red-600">{formState.errors.email.message}</p>}
      </div>

      
      {/* date of birth input */}
        <div className=" my-3">
        <Label htmlFor="dateOfBirth" className="text-black mb-1.5 inline-block">Enter Your Birthday</Label>
        <Input {...register("dateOfBirth")} type="date" id="dateOfBirth" name="dateOfBirth" className="w-full" />
        {formState.errors.dateOfBirth &&  <p className="mt-1 text-sm text-red-600">{formState.errors.dateOfBirth.message}</p>}
      </div>



       {/* password input */}
          <div className=" my-3">
        <Label htmlFor="password" className="text-black mb-1.5 inline-block">  Enter Your Password</Label>
        <Input {...register("password")} type="password"  id="password" name="password" className="w-full" placeholder="••••••••"/>
        {formState.errors.password &&  <p className="mt-1 text-sm text-red-600">{formState.errors.password.message}</p>}
      </div>


       {/* Repassword input */}
          <div className=" my-3">
        <Label htmlFor="rePassword" className="text-black mb-1.5 inline-block"> Password Confirmation</Label>
        <Input {...register("rePassword")} type="password"   id="rePassword" name="rePassword" className="w-full" placeholder="••••••••"/>
        {formState.errors.rePassword &&  <p className="mt-1 text-sm text-red-600">{formState.errors.rePassword.message}</p>}
      </div>
        

      {/* gender input  */}
     <div className=" my-3">
      {/* male */}
     <input {...register("gender")} type="radio" id="male" name="gender" value="male" className="radio radio-xs mx-1.5"  />
     <Label htmlFor="male" className="text-black mb-1.5 inline-block"> Male</Label>
     
     {/* female */}
     <div className="ml-2 inline-block">
       <input {...register("gender")} type="radio" id="female" name="gender" value="female" className="radio radio-xs mx-1.5"  />
     <Label htmlFor="female" className="text-black mb-1.5 inline-block"> Female</Label>
     </div>
     {formState.errors.gender &&  <p className="mt-1 text-sm text-red-600">{formState.errors.gender.message}</p>}
      </div>

   


      <Button type="submit"className="mb-6  inline-block w-full"> {loadingForm === true ? <div><i className="fa-solid fa-spinner fa-spin"></i> Account creating</div> : "Register" }</Button>

      

    </form>
    </div>
   </section>
   </>
  )
}
