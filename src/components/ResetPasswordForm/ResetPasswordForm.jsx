import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query";
import axios from "axios"
import { useContext } from "react";
import { useForm } from "react-hook-form"
import zod from "zod"
import { ContainerContext } from "../../Context/ContainerContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function ResetPasswordForm() {

const{setToken}=useContext(ContainerContext);
let navigate = useNavigate();

let schema = zod.object({
  password:zod.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"3-30 characters. Lowercase letters, numbers, and underscores only."),
  newPassword: zod.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"3-30 characters. Lowercase letters, numbers, and underscores only."),
})

const{register,handleSubmit,formState}=useForm({
  defaultValues:{
    password:"",
    newPassword:"",
  },
  resolver:zodResolver(schema)
})


function patchPassword(values) {
  return axios.patch(`https://route-posts.routemisr.com/users/change-password`,values,{
    headers:{
      Authorization:`Bearer ${localStorage.getItem("userToken")}`
    }
  })
}




const {data, mutate}=useMutation({
  mutationFn:patchPassword,
  onSuccess:(data)=>{
   console.log(data);
   toast.success("password cahnged successufully")
    setTimeout(() => {
      navigate('/login');
    }, 2000);
   
  },
  onError:(err)=>{
    console.log(err);
    
  }
})

console.log(data);






  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50/60 via-slate-50 to-blue-100/40 p-4">
      <div className="w-full max-w-md bg-white border border-blue-100/80 rounded-3xl p-8 shadow-xl shadow-blue-950/5">
        
        {/* Header Icon */}
        <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        {/* Title & Description */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Reset Password</h2>
          <p className="text-xs text-slate-500 mt-2">Enter your current password and choose a new one.</p>
        </div>

        <form onSubmit={handleSubmit((values)=>mutate(values))} className="space-y-5">
          
          {/* Old Password Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Old Password
            </label>
            <div className="relative">
              <input
              {...register("password")}
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3.5 pl-11 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all duration-200"
              />
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
            </div>
            {formState.errors.password?.message}
          </div>

          {/* New Password Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              New Password
            </label>
            <div className="relative">
              <input
              {...register("newPassword")}
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3.5 pl-11 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all duration-200"
              />
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            {formState.errors.newPassword?.message}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all duration-200 mt-2"
          >
            Update Password
          </button>

        </form>
      </div>
    </div>
    </>
  )
}
