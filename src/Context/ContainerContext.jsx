import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useState } from "react";


export let ContainerContext = createContext();

export function ContainerContextProvider(props) {


  function getUserProfile() {
    return axios.get(`https://route-posts.routemisr.com/users/profile-data`,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('userToken')}`
      }
    })
  }

  let {data:userProfile} = useQuery({
    queryKey:["userProfile"],
    queryFn:getUserProfile,
    select:(res)=> res.data.data.user 
  })


  console.log("here is the user profile data",userProfile);
  
    
    const [Token, setToken] = useState(localStorage.getItem("userToken"));


    return <ContainerContext.Provider value={{Token,setToken,userProfile}}>
      {props.children}
    </ContainerContext.Provider>
}