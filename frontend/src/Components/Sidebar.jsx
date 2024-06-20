import React, { useState } from 'react'
import { MdOutlinePersonSearch } from "react-icons/md";
import OtherUser from './OtherUsers';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchUser, setSelectedUser } from '../Redux/authSlice';
import {toast} from "react-toastify"
const Sidebar = () => {
  const dispatch = useDispatch();
  const [SearchUser, SetSearchUser] = useState("");
 const { otherUser, searchUser } = useSelector((store) => store.auth);

  const SubmitHandler = async (e) => {
    e.preventDefault();
     const SearchRes = otherUser?.find((user)=>user.FullName.toLowerCase().includes(SearchUser.toLowerCase()) )
     if(SearchRes){
      dispatch(setSearchUser(SearchRes))
      
     }else{
      
      toast.error("user not found!")
      setSearchUser("")
     }
  };
   
  const handleClick = (user) => {
    dispatch(setSelectedUser(user));
    dispatch(setSearchUser(null))
    SetSearchUser("")
  };
  let { selectedUser } = useSelector((store) => store.auth);
    if(!selectedUser){
      selectedUser = {
        _id : null
      }
    }
  return (

    <div className=' border-slate-400 border-r-2 p-4 flex flex-col'>
        <form action=''  onSubmit={SubmitHandler} className='flex items-center relative '>
            <input type="text" value={SearchUser} onChange={(e) => SetSearchUser(e.target.value)} className='input input-bordered rounded-lg' placeholder='Search...' />
            <button type='submit' className='btn btn-circle absolute right-0.5 text-white bg-gray-300'><MdOutlinePersonSearch size="25px" /></button>
        </form>
        <div className="divider mt-1 "></div>
        
        { searchUser ?  (
          <div>
      
          <div
            onClick={() => handleClick(searchUser)}
            className={`flex gap-2 items-center ${selectedUser._id === searchUser._id ? 'bg-[#B0B9C4] text-black ' : "" }  cursor-pointer hover:bg-[#B0B9C4] hover:text-black font-bold text-white p-2 `}
          >
            <div className=" avatar online">
              <div className="w-10 rounded-full">
                <img src={searchUser.ProfilePhoto} alt="profile icon" />
              </div>
            </div>
            <div className="">
              <p>{searchUser.FullName}</p>
            </div>
          </div>
          
          <div className="divider my-0 py-0 h-1 "></div>
        </div>
        ):
          
         ( <OtherUser />)
        }
        
       
    </div>
  )
}

export default Sidebar