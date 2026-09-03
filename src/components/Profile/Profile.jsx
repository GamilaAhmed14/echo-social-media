import { useContext } from "react"
import { ContainerContext } from "../../Context/ContainerContext"
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import SinglePost from "../SinglePost/SinglePost";
import Titile from "../Titile/Titile";


export default function Profile() {

 


  const {userProfile} = useContext(ContainerContext);

function getUserPosts() {
  return axios.get(`https://route-posts.routemisr.com/users/${userProfile.id}/posts`,{
   headers:{
    Authorization:`Bearer ${localStorage.getItem("userToken")}`
   }
  })
}


const {data:userPosts}= useQuery({
  queryKey:["userPosts"],
  queryFn:getUserPosts,
  select:(res)=> res.data.data.posts
})
console.log("here is all the user posts gamila", userPosts);




  return (
    <>
     <Titile tit={"profile"} />
    <div className=" my-5 mx-auto max-w-2xl overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
      {/* Cover Banner */}
      <div className="relative h-48 w-full overflow-hidden bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15),_transparent)]" />
      </div>

      {/* Main Profile Info Section */}
      <div className="relative px-6 pb-6 pt-0">
        {/* Avatar & Action Row */}
        <div className="-mt-16 mb-4 flex flex-wrap items-end justify-between gap-4">
          <div className="relative">
            <img
              src={userProfile?.photo}
              alt={userProfile?.name}
              className="h-32 w-32 rounded-full border-4 border-white bg-white object-cover shadow-lg ring-1 ring-gray-100"
            />
            <span
              className="absolute bottom-2 right-2 h-4 w-4 rounded-full border-2 border-white bg-emerald-500"
              title="Active"
            />
          </div>

          <div className="flex gap-2.5">
            <button
              type="button"
              className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              Share Profile
            </button>
            <button
              type="button"
              className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* User Identity */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold capitalize tracking-tight text-gray-900">
             {userProfile?.name}
            </h2>
            <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-0.5 text-xs font-medium capitalize text-blue-700">
             {userProfile?.gender}
            </span>
          </div>
          <p className="text-sm font-medium text-gray-500">@{userProfile?.username}</p>
        </div>

        {/* Key Metrics Row */}
        <div className="mb-6 grid grid-cols-3 gap-3 rounded-2xl border border-gray-100 bg-gray-50/80 p-3 text-center backdrop-blur-sm">
          <div className="rounded-xl bg-white p-3 shadow-xs">
            <span className="block text-xl font-bold text-gray-900">{userProfile?.followersCount}</span>
            <span className="text-xs font-medium text-gray-500">Followers</span>
          </div>

          <div className="rounded-xl bg-white p-3 shadow-xs">
            <span className="block text-xl font-bold text-gray-900">{userProfile?.followingCount}</span>
            <span className="text-xs font-medium text-gray-500">Following</span>
          </div>

          <div className="rounded-xl bg-white p-3 shadow-xs">
            <span className="block text-xl font-bold text-gray-900">{userProfile?.bookmarksCount}</span>
            <span className="text-xs font-medium text-gray-500">Bookmarks</span>
          </div>
        </div>

        {/* Meta Details Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Email */}
          <div className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 text-sm text-gray-600 transition-colors hover:bg-gray-50">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-medium text-gray-400">Email Address</p>
              <p className="truncate font-medium text-gray-800">
                {userProfile?.email}
              </p>
            </div>
          </div>

          {/* Birthday */}
          <div className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 text-sm text-gray-600 transition-colors hover:bg-gray-50">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-50 text-pink-600">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 01-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M3 21h18M3 10h18a1 1 0 011 1v9a1 1 0 01-1 1H3a1 1 0 01-1-1v-9a1 1 0 011-1z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400">Birthday</p>
              <p className="font-medium text-gray-800">{new Date().toDateString(userProfile?.dateOfBirth)}</p>
            </div>
          </div>

          {/* Member Since */}
          <div className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 text-sm text-gray-600 transition-colors hover:bg-gray-50">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400">Joined</p>
              <p className="font-medium text-gray-800">{new Date().toDateString(userProfile?.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* user Posts */}
    {userPosts?.map((post)=>{
      return <SinglePost post={post}/>
    })}
    </>
  )
}
