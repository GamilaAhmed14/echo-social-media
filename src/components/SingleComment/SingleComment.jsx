import { useContext } from "react";
import DropDownComment from "./DropDownComment/DropDownComment";
import { ContainerContext } from "../../Context/ContainerContext";


export default function SingleComment({topComment}) {


  const {userProfile}=useContext(ContainerContext);

  
  return (
    <>
    <div className="flex mt-4 justify-between">
    <div className="flex">
    <div className="w-14 h-14 rounded-full bg-purple-400/50 shrink-0 flex items-center justify-center">
    <img className="h-12 w-12 rounded-full object-cover" src={topComment.commentCreator.photo} alt={topComment.commentCreator.name} />
  </div>
  <div className="ml-3">
    <div className="font-medium text-purple-800">{topComment.commentCreator.name}</div>
    <div className="text-gray-600">Posted on {new Date(topComment.createdAt).toDateString("en-US", { hour: "numeric", minute: "2-digit", hour12: true, month: "short", day: "numeric", year: "numeric" })}</div>
    <div className="mt-2 text-purple-800">{topComment.content}
    </div>
  </div>
    </div>
    {/* dropdown menu */}
    {topComment.commentCreator._id === userProfile._id &&  <div>
  <DropDownComment postId={topComment.post} commentId={ topComment._id}/>
  </div>}
</div>
    </>
  )
}
