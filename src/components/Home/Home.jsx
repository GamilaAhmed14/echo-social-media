import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { TailSpin } from "react-loader-spinner";
import SinglePost from "../SinglePost/SinglePost";
import CreatePost from "../CreatePost/CreatePost";


export default function Home() {

function getAllPosts() {
  return axios.get(`https://route-posts.routemisr.com/posts`,{
    headers:{
      Authorization:`Bearer ${localStorage.getItem("userToken")}`
    }
  })
}

let {data , error, isError, isLoading}=useQuery({
queryKey:['getposts'],
queryFn:getAllPosts,
select:(res)=>res.data.data.posts
})

console.log(data);


if(isError){
  return<>
  <div className="h-100 flex justify-center items-center">
     <div className="bg-red-50 p-4 border border-red-200 rounded-md text-red-700 ">
        <p className="font-bold">Failed to load data</p>
        <p>{error.message}</p>
      </div>
  </div>
  </>
}

if (isLoading) {
  return <>
  <div className="h-100 flex justify-center items-center">
    <TailSpin
visible={true}
height="80"
width="80"
color=" #162456"
ariaLabel="tail-spin-loading"
radius="1"
wrapperStyle={{}}
wrapperClass=""
/>
  </div>
  </>
}

  return (
   <>
   <CreatePost/>
   {data?.map((post)=>{
    return <SinglePost key={post.id} post={post}/>
   })}
   </>
  )
}
