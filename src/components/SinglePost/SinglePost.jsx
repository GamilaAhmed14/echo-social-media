import { Link } from "react-router-dom";
import SingleComment from "../SingleComment/SingleComment";
import CreateComment from "../CreateComment/CreateComment";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import DropDownPost from "../DropDownPost/DropDownPost";
import { useContext } from "react";
import { ContainerContext } from "../../Context/ContainerContext";



export default function SinglePost({post}) {


console.log("here is the post detailsss", post);
let query = useQueryClient();
const{userProfile} = useContext(ContainerContext);





function handlelikedPost() {
  return axios.put(`https://route-posts.routemisr.com/posts/${post.id}/like`,{},{
    headers:{
      Authorization:`Bearer ${localStorage.getItem("userToken")}`
    }
  })
}


const {data, mutate}= useMutation({
  mutationFn:handlelikedPost,
  onSuccess:()=>{
   query.invalidateQueries({queryKey:["getposts"]});
   query.invalidateQueries({queryKey:["userPosts"]});
   toast.success("liked")
  }
})

console.log(data?.data.data.liked);




  return (
    <>

     <div className="max-w-lg w-full bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 mx-auto my-3.5">
            {/* Header */}
          <div className="flex justify-between">
             <Link to={`postdetails/${post.id}`}>
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                   <div className="shrink-0">
                     <img src={post.user.photo} alt="" className="w-12 h-12 rounded-full object-cover border border-gray-200" />
                   </div>
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-1">
                            <div className="font-bold text-gray-900 hover:underline truncate">
                             {post.user.name}
                            </div>
                            <svg className="w-4 h-4 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                            </svg>
                        </div>
                     <div className="text-gray-500 text-sm hover:underline">
                      @{post.user.username}
                     </div>
                    </div>
                </div>
                 </div>
                 </Link>
             <div>
               <div className="shrink-0 text-blue-400 hover:text-blue-600 transition-colors ml-4">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                 
              </div>
               {/* start of dropdown */}
                   {post.user._id === userProfile._id &&  <div>
                      <DropDownPost postId={post.id} />
                    </div> }
                    {/* end of dropdown */}
          </div>
              
             </div>
           
          
           
            {/* Content */}
            <div className="mb-3">
                <p className="text-gray-900 text-sm leading-relaxed whitespace-pre-wrap">
                    {post.body}
                </p>
            </div>

            {/* Image */}
           {post.image &&  <div className="mb-3">
                <div className="rounded-xl overflow-hidden border border-gray-200">
                    <img src={post.image} alt="" className="w-full h-64 object-cover"
                    />
                </div>
            </div>}

            {/* Timestamp */}
            <div className="text-gray-500 text-xs my-1.5">{new Date(post.createdAt).toLocaleString("en-US", { hour: "numeric", minute: "2-digit", hour12: true, month: "short", day: "numeric", year: "numeric" })}</div>

            {/* social interactions */}
             <div className="flex justify-between text-gray-600 text-sm font-semibold">
          <button onClick={ mutate} className={`flex items-center space-x-1 hover:text-blue-600 ${data?.data.data.liked ? `text-blue-600`: ""}`}>
            <span>{post.likesCount}</span>
            <i className="fas fa-thumbs-up"></i><span>Like</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-600">
            <span>{post.commentsCount}</span>
            <i className="fas fa-comment"></i><span>Comment</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-600">
            <span>{post.sharesCount}</span>
            <i className="fas fa-share"></i><span>Share</span>
          </button>
        </div>

      {/* create comments */}
      <CreateComment  id={post.id}/>

      {/* end of create comment  */}

        {/* top comment */}
        
       {post.topComment && <SingleComment topComment={post.topComment} />}





        </div>



    </>
  )
}
