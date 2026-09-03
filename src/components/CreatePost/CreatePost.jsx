import { Button, Modal } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { toast } from 'react-toastify';
import { ContainerContext } from "../../Context/ContainerContext";


export default function CreatePost() {

const {userProfile} =  useContext(ContainerContext)
let querClinet = useQueryClient();
let body = useRef();
let image = useRef();
const [handleImage, sethandleImage] = useState(null);
let formData = new FormData();





const { mutate}= useMutation({
  mutationFn:createpost,
  onSuccess:()=>{
    querClinet.invalidateQueries({queryKey:["getposts"]});
    toast.success("post created successfully");
    sethandleImage(null);
  },
  onError: (err) => {
    // This prints the exact validation message from Route API
    console.log("Backend Error:", err.response?.data);
    toast.error("Something went wrong");
    sethandleImage(null);
  },
})



function createpost() {
  return axios.post(`https://route-posts.routemisr.com/posts`,createFormDate(),{
    headers:{
      Authorization:`Bearer ${localStorage.getItem("userToken")}`
    }
  })
}

function createFormDate() {

  if (body.current.value) {
    formData.append("body",body.current.value)
  }
    if (image.current.files[0]) {
    formData.append("image",image.current.files[0]);
  }
  return formData
}




  function previewImage(e) {
  sethandleImage(URL.createObjectURL(e.target.files[0]));
  }


  return (
    <Modal>
      {/* Feed Trigger Card */}
      <section className="my-6 mx-auto w-full max-w-xl rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src={userProfile?.photo}
            alt="User avatar"
            className="h-10 w-10 rounded-full object-cover"
          />

          <Button className="w-full flex-1 justify-start rounded-full bg-gray-100 px-4 py-2.5 text-left text-sm text-gray-500 hover:bg-gray-200 transition-colors">
            What's on your mind?
          </Button>

          {/* Modal Backdrop & Dialog */}
          <Modal.Backdrop className="bg-black/50 backdrop-blur-sm">
            <Modal.Container>
              <Modal.Dialog className="w-full max-w-lg rounded-2xl bg-white p-0 shadow-2xl overflow-hidden">
                <Modal.CloseTrigger className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors" />

                <Modal.Header className="border-b border-gray-100 px-6 py-4">
                  <Modal.Heading className="text-center text-lg font-semibold text-gray-900">
                    Create Post
                  </Modal.Heading>
                </Modal.Header>

                <Modal.Body className="space-y-4 px-6 py-4">
                  {/* User Profile */}
                  <div className="flex items-center gap-3">
                    <img
                      src={userProfile?.photo}
                      alt={userProfile?.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <span className="text-sm font-semibold text-gray-800">{userProfile?.name}</span>
                  </div>

                  {/* Post Textarea */}
                  <textarea
                  ref={body}
                    rows={4}
                    placeholder="What's on your mind?"
                    className="w-full resize-none border-none bg-transparent text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0"
                  />

                  {/* Upload Image Section */}
                  <div className="flex items-center justify-between rounded-xl border border-gray-200 p-3">
                    <span className="text-sm font-medium text-gray-700">Add to your post</span>
                    <label
                      htmlFor="imagePost"
                      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-green-600 hover:bg-green-50 transition-colors"
                      title="Upload Photo"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                      </svg>
                    </label>
                    <input ref={image} type="file" onChange={previewImage} id="imagePost" className="hidden" accept="image/*" />
                  </div>

                  {/* image preview */}
                 
                  {handleImage &&  <div className="relative">
                    <img  src={handleImage} alt="" />
                    <span onClick={()=>sethandleImage(null)} className="absolute right-0.5 top-0.5 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="red" className="size-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                   </svg>
                   </span>
                  </div>}
                </Modal.Body>

                <Modal.Footer className="border-t border-gray-100 px-6 py-4">
                  <Button
                  onClick={()=>mutate()}
                    className="w-full rounded-xl bg-blue-600 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
                    slot="close"
                  >
                    Post
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </div>
      </section>
    </Modal>
  );
}