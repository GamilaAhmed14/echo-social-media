import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';


export default function CreateComment({id}) {

  let formdata = new FormData();
  let query = useQueryClient();
  

const {register,handleSubmit} =  useForm({
    defaultValues:{
        content:"",
        image:"",
    }
})



function addComment(){
    return axios.post(`https://route-posts.routemisr.com/posts/${id}/comments`, formdata,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })
}



let {mutate} = useMutation({
    mutationFn:addComment,
    onSuccess:()=>{
        console.log("correct");
        toast.success("the comment run successfully ")
        query.invalidateQueries({queryKey:['getposts']});
        query.invalidateQueries({queryKey:["userPosts"]});

    },
    onError:()=>{
      toast.error("error has occured")
    }
})





function createComment(values) {
    console.log(values);
    
    if (values.content != "") {
        formdata.append("content",values.content);
    }
      if (values.image[0]) {
        formdata.append("image",values.image[0])
    }
   mutate()
}




  return (
   <>
 <form  onSubmit={handleSubmit(createComment)} className="w-full max-w-2xl mx-auto">
  <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white p-2 my-7 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
    
    {/* Input Image Button */}
    <div className="flex items-center">
      <label 
        htmlFor="commentImage" 
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
        title="Attach image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      </label>
      <input {...register("image")} type="file"  id="commentImage" className="hidden" />
    </div>

    {/* Text Input */}
    <div className="flex-1">
      <input 
      {...register("content")}
        type="text" 
        placeholder="Write a comment..." 
        className="w-full border-none bg-transparent px-2 py-1 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0" 
      />
    </div>

    {/* Submit Comment Button */}
    <button 
      type="submit" 
      className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      title="Post comment"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
      </svg>
    </button>

  </div>
</form>
   </>
  )
}
